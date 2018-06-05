// E.G.
//master.createLottery(web3.toWei(etherAmount, 'ether'), 2, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(etherAmount, 'ether') })
// TODO
function toWei(E) {
    return web3.toWei(E, 'ether')
}
const etherAmount = toWei(5)
const emitText = '...... emit event .watch ....... \n'
/***********************************
lotteryContract.addActivePlayer(acct2, {from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') }); DEPRECATED to support addActivePlayer() refactor
Emit Event logging - 1st logs the Function definition 2nd logs the event? looks like double-loggin // https://github.com/ether-camp/ethereum-sandbox/issues/74
************************************/

// 1
master.createLottery(web3.toWei(5, 'ether'), 2, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(5, 'ether') })
var lotteryAddress = master.getNewLotteryAddress.call();
var lotteryContract = decypher.getContract('Lottery', lotteryAddress);      
var abi = lotteryContract.abi
var Lottery = web3.eth.contract(abi)
var lottery = Lottery.at(lotteryAddress);
var event = lottery.eLog();
event.watch(function (error, result) { if (!error) { 
    console.log(emitText, result.args);} 
})

// 1 OPTIONAL CHECK
lotteryContract.getActivePlayers();
acct1
decypher.balance(lotteryAddress);
decypher.balance(acct1);
decypher.balance(acct2);


// 2
lotteryContract.addActivePlayer(acct2, web3.toWei(5, 'ether'), {from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(5, 'ether') });

// OPTIONAL CHECK
lotteryContract.getActivePlayers();
acct2
decypher.balance(lotteryAddress);
decypher.balance(acct1);
decypher.balance(acct2);

web3.eth.getCode(lotteryAddress) // '0x0'
