/*  
    INSTRUCTIONS
    First run a local ethereum blockchain (ganache-cli testrpc), and Run setup.js, which starts a Node REPL for you
    Then paste the below commands into node.js console, after running setup.js
    These commands will find things like the 'masterContract' variable because setup.js made them available as globals for the REPL
*/

// 1 - Deploy the Lottery Contract using masterContract.createLottery(...)
masterContract.address
const etherBetAmount = 50
const wei = toWei(etherBetAmount)
const emitText = 'emit event.watch\n'
function setEventEmitLogL() {
    var abi = lotteryContract.abi
    var Lottery = web3.eth.contract(abi)
    var lotteryInstance = Lottery.at(lotteryAddress);
    var event1 = lotteryInstance.eLog();
    event1.watch(function (error, result) { 
        if (!error) { console.log(emitText, result.args);} else {console.log(error)}
    })
}
function setEventEmitLogM() {
    var abi = masterContract.abi
    var MasterContract = web3.eth.contract(abi)
    var masterContractInstance = MasterContract.at(masterContract.address);
    var event2 = masterContractInstance.eLog();
    event2.watch(function (error, result) { 
        if (!error) { return console.log(emitText, result.args);} else { return console.log(error)}
    })
}

const maxPlayers = 2

masterContract.createLottery(wei, maxPlayers, {from: acct1, gas: 4612388, gasPrice: 5, value: wei })

var lotteryAddress = masterContract.getNewLotteryAddress.call();
var lotteryContract = getContract('Lottery', lotteryAddress);

setEventEmitLogL()
setEventEmitLogM()

// 1st CHECK - only 1 player entered lottery so far, so that player lost ether, and second player still has starting amount of ether
lotteryContract.getActivePlayers()[0];
acct1
balance(lotteryAddress);
balance(acct1);
balance(acct2);

// 2 - second player enters lottery, whose max was 2 players, so this ends the lottery and pays out a winner
lotteryContract.addActivePlayer(
    acct2, wei, 
    {from: acct2, gas: 4612388, gasPrice: 5, value: wei }
);

// 2nd CHECK - one player lost ether, and the other now has more than they started with
// Player 1 is hardcoded as the MasterOwner so he'll receive a fee that the contestants pay, for entering the lottery
balance(acct1);
balance(acct2);
'account starting balance: 100'
'ethereBetAmount: ' + etherBetAmount
'maxPlayers: ' + maxPlayers

web3.eth.getCode(lotteryAddress) // logs '0x0' if it was selfdestructed
masterContract.getLotteries.call(); // should log empty [], meaning lotteryContract no longer exists, its 0x00000