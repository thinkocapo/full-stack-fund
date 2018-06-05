master.createLottery(web3.toWei(1, 'ether'), 2, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })
var lotteryAddress = master.getNewLotteryAddress.call();
var lotteryContract = decypher.getContract('Lottery', lotteryAddress);      
      
lotteryContract.addActivePlayer({from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') });
      
      
// EVENT EMITTING - version of web3?
var abi = lotteryContract.abi // available from above commands being run, same for 'lotteryAddress' below
var Lottery = web3.eth.contract(abi)
var lottery = Lottery.at(lotteryAddress); // BUT there's not lottery deployed yet... and NOT masterContract.address
var event = lottery.LotteryFilled();
// watch for changes
// result will contain various information
// including the argumets given to the `Lottery Filled` call
event.watch(function (error, result) { if (!error) { console.log('...... event.watch ....... result\n', result);} })

