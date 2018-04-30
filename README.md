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

### Software Development
`ganache-cli testrpc`  
`node script-v0.2.js`
`var deployed = decypher.deployContract("MasterContract")`
