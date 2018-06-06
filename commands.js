// E.G.
//masterContract.createLottery(web3.toWei(wei, 'ether'), 2, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(wei, 'ether') })

/***********************************
lotteryContract.addActivePlayer(acct2, {from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') }); DEPRECATED to support addActivePlayer() refactor
Emit Event logging - 1st logs the Function definition 2nd logs the event? looks like double-loggin // https://github.com/ether-camp/ethereum-sandbox/issues/74
************************************/

// 1
const wei = toWei(5)
const emitText = 'emit event.watch\n'

masterContract.createLottery(
    wei, 2,
    {from: acct1, gas: 4612388, gasPrice: 5, value: wei }
)
var lotteryAddress = masterContract.getNewLotteryAddress.call();
var lotteryContract = getContract('Lottery', lotteryAddress);     

var abi = lotteryContract.abi
var Lottery = web3.eth.contract(abi)
var lottery = Lottery.at(lotteryAddress);
var event = lottery.eLog();
event.watch(function (error, result) { 
    if (!error) { console.log(emitText, result.args);} else {console.log(error)}
})
// errors if use 'emitText' variable defined above, so the .watch must have a different scope, or 'this' context

// 1 OPTIONAL CHECK
lotteryContract.getActivePlayers()[0];
acct1
balance(lotteryAddress);
balance(acct1);
balance(acct2);

// 2
lotteryContract.addActivePlayer(
    acct2, wei, 
    {from: acct2, gas: 4612388, gasPrice: 5, value: wei }
);

// 2 OPTIONAL CHECK
// lotteryContract.getActivePlayers(); // doesn't work anymore, because lottery contract was selfdestructed. comment out the selfdestruct in lottery.sol if you want this to work
// balance(lotteryAddress); // logs 0 even if the address was selfdestructed. if you comment out the selfdestruct in lottery.sol, it should still log 0, because balance was transferred to the Winner
balance(acct1);
balance(acct2);
web3.eth.getCode(lotteryAddress)
// logs '0x0' if it was selfdestructed
