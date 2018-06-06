/*
/$$             /$$     /$$                                                   /$$       /$$          
| $$            | $$    | $/                                                  | $$      | $$          
| $$  /$$$$$$  /$$$$$$  |_/   /$$$$$$$        /$$$$$$   /$$$$$$  /$$$$$$/$$$$ | $$$$$$$ | $$  /$$$$$$ 
| $$ /$$__  $$|_  $$_/       /$$_____/       /$$__  $$ |____  $$| $$_  $$_  $$| $$__  $$| $$ /$$__  $$
| $$| $$$$$$$$  | $$        |  $$$$$$       | $$  \ $$  /$$$$$$$| $$ \ $$ \ $$| $$  \ $$| $$| $$$$$$$$
| $$| $$_____/  | $$ /$$     \____  $$      | $$  | $$ /$$__  $$| $$ | $$ | $$| $$  | $$| $$| $$_____/
| $$|  $$$$$$$  |  $$$$/     /$$$$$$$/      |  $$$$$$$|  $$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$$
|__/ \_______/   \___/      |_______/        \____  $$ \_______/|__/ |__/ |__/|_______/ |__/ \_______/
                                             /$$  \ $$                                                
                                            |  $$$$$$/                                                
                                             \______/       
*/
// INSTRUCTIONS
// First run a local ethereum blockchain (ganache-cli testrpc), and Run setup.js
// Paste these into node.js console, after running setup.js, which starts the node.js repl for you
// Master Contract was already deployed via setup.js
// Now we are creating lotteries!

// 1 - Deploy the Master Contract
const wei = toWei(5)
const emitText = 'emit event.watch\n'
function setEventEmitLog() { // abi, lotteryAddress
    var abi = lotteryContract.abi
    var Lottery = web3.eth.contract(abi)
    var lottery = Lottery.at(lotteryAddress);
    var event = lottery.eLog();
    event.watch(function (error, result) { 
        if (!error) { console.log(emitText, result.args);} else {console.log(error)}
    })
}

masterContract.createLottery(
    wei, 2,
    {from: acct1, gas: 4612388, gasPrice: 5, value: wei }
)
var lotteryAddress = masterContract.getNewLotteryAddress.call();
var lotteryContract = getContract('Lottery', lotteryAddress);     

setEventEmitLog()

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
balance(acct1);
balance(acct2);
web3.eth.getCode(lotteryAddress)
// logs '0x0' if it was selfdestructed


// lotteryContract.getActivePlayers(); // doesn't work anymore, because lottery contract was selfdestructed. comment out the selfdestruct in lottery.sol if you want this to work
// balance(lotteryAddress); // logs 0 even if the address was selfdestructed. if you comment out the selfdestruct in lottery.sol, it should still log 0, because balance was transferred to the Winner