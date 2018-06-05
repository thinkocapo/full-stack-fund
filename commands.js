// 1
master.createLottery(web3.toWei(1, 'ether'), 2, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })
var lotteryAddress = master.getNewLotteryAddress.call();
var lotteryContract = decypher.getContract('Lottery', lotteryAddress);      

// OPTIONAL
lotteryContract.getActivePlayers();
acct1
decypher.balance(lotteryAddress);
decypher.balance(acct1);
decypher.balance(acct2);

// 2
// lotteryContract.addActivePlayer(acct2, {from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') });
lotteryContract.addActivePlayer(acct2, web3.toWei(1, 'ether'), {from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') });
// OPTIONAL
lotteryContract.getActivePlayers();
acct2
decypher.balance(lotteryAddress);
decypher.balance(acct1);
decypher.balance(acct2);

// 3 EVENT EMITTING    
// TODO - get this to deploy via script-v0.2.js, consider re-writing that altogether
var abi = lotteryContract.abi
var Lottery = web3.eth.contract(abi)
var lottery = Lottery.at(lotteryAddress);
var event = lottery.Logger();
// watch for changes
// result will contain various information
// including the argumets given to the `Lottery Filled` call
event.watch(function (error, result) { if (!error) { console.log('...... event.watch ....... result\n', result);} })



