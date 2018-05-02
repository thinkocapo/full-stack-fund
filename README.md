# full-stack-fund
## Goal
Users can use a web app GUI to call:  
`fullStackFund.createLottery(numContestants, amtContribution)`  
### Variables:
**numContestants** - the number of people (contestants) in the lottery  
**amtContribution** - the buy-in to the lottery, the amount of ether they are waging.

### Example Gameplay:
`fullStackFund.createLottery(5, 1.0)`  
- Means that user is creating a lottery for 5 people where you have to contribute 1.0 ether to be part of it.  
- If another user tries to .createLottery(5, 1.0) then they will be simply added to the existing (5, 1.0) lottery which is open, so it will become 2/5 full.  
- Once it reaches 5/5, then a user will be be randoly selected 1 - 5 and the 5.0 ether will be send to that user's account address.

### More
- There can be multiple different lotteries open at any given time
- Getter methods for viewing what lotteries are currently open

## Software Development

#### How to run this app
`https://github.com/thinkocapo/full-stack-fund.git`  
`npm install`  
`ganache-cli testrpc`  
`node script-v0.2.js` , deploys the contract for you, using `decypher.deployContract("MasterContract")`  
`deployed.createLottery(1, 5, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })`  
`decypher.balance(deployed.getNewLotteryAddress.call())`  
`> 1`
1 user deployed a new lottery, which now has a balance of 1, and is waiting for 4 more players. Use the getData() method to confirm its 5 maxPlayers

#### Software Observations
- Solidity really doesn't like returning Objects or Arrays of Objects. If you return an Object (e.g. Lottery instance) it gives you the address of the object
- can use `.createLottery.call(...)`  above and it works the same. https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods

