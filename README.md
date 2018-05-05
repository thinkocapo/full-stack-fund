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
```
git clone https://github.com/thinkocapo/full-stack-fund.git
npm install
ganache-cli testrpc
node script-v0.2.js // deploys the contract for you, using decypher.deployContract("MasterContract")  
> deployed.createLottery(web3.toWei(1, 'ether'), 5, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })
> decypher.balance(deployed.getNewLotteryAddress.call())
1
> decypher.balance(deployed)
0
> const lotteryAddress = deployed.getNewLotteryAddress.call()
> const lotteryContract = decypher.getContract('MasterContract', 'Lottery', lotteryAddress)
> lotteryContract.addActivePlayer({from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })
> lotteryContract.getActivePlayers()
[ '0x13e07e8da9d42304eacddc410590e6288a51e84b', '0xcd6f76e660a8d940ecc7d1f8b568468826a1f9d8' ]
> decypher.balance(acct2)
98.99999999999989
> decypher.balance(lotteryAddress)
2
```
^^ 1 user deployed a new lottery, which added 1 ether to the Lottery contract. Then a 2nd user called `addActivePlayer`, which added 1 more ether. So now the Lottery has 2 active players and 2 ether. It needs 3 more players before payout is made, and house collects its fee.

### Solidity Gotchas
- If sending ether to a new contract, and you're creating that contract via Solidity constructor invocation, syntax:
`Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers, msg.sender);`
- Solidity doesn't like returning Objects or Arrays of Objects. If you return an Object (e.g. Lottery instance) it gives you the address of the object. Examples:
```
function getLottery() public view returns (Lottery) {
     return Lottery(newLotteryAddress); // returns an address, not the Lottery instance object
}
// and
return Lottery[] // returns array of addresses [ '0xa48bd859d59d451c700c19dda6c36e3e9e0d1dec' ]
```
- can use `.createLottery.call(...)`  above and it works the same. https://github.com/ethereum/wiki/wiki/JavaScript-API#contract-methods
- The following doesn't work, because `msg.sender` is the address of MasterContract, which is the contract calling this Lottery Constructor via `createContract` (a Master Contract method)
MasterContract...
```
function Lottery (uint _etherContribution, uint _maxPlayers) public payable {
        etherContribution = _etherContribution; // etherPerPlayer
        maxPlayers = _maxPlayers;
        activePlayers.push(msg.sender); // is address of MasterContract, because MasterContract called this Constructor
}
```
so need to parameterize
```
function Lottery (uint _etherContribution, uint _maxPlayers, address sender) public payable {
        etherContribution = _etherContribution; // etherPerPlayer
        maxPlayers = _maxPlayers;
        activePlayers.push(sender); // is address of msg.sender in MasterContract.createLottery function
}
```

