# full-stack-fund
### How Full Stack Fund Works
<img src="/img/diagram-gameplay.png" width="550px" height="450px" />
<img src="/img/app-homescreen.png" width="450px" height="350px" />
`fullStackFund.createLottery(5, 1.0)`  
- Means that user is creating a lottery for 5 people where you have to contribute 1.0 ether to be part of it.  
- If another user tries to .createLottery(5, 1.0) then they will be simply added to the existing (5, 1.0) lottery which is open, so it will become 2/5 full.  
- Once it reaches 5/5, then a user will be be randoly selected 1 - 5 and the 5.0 ether will be send to that user's account address.
- There can be multiple different lotteries open at any given time
- Needs getter methods for viewing what lotteries are currently open
- Needs to remove the Lottery from the MasterContract's lottery list, once the lottery is filled and selfdestructs

### Instructions
```
git clone https://github.com/thinkocapo/full-stack-fund.git
npm install
```
1. ganache-cli testrpc
2. open a new terminal...
2. node setup.js
3. copy the sets of commands from main.js and paste into the Node repl from setup.js
4. Verify each set is giving you the expected output

### What's Happening & Example gameplay
1. ganache-cli testrpc - starts a ethereum blockchain running locally on localhost:8545
2. node setup.js - deploys MasterContract.sol and loads test accounts into the blockchain, starts a Node REPL, and sets some helper functions
3. these these commands interact with the MasterContract, create a lottery and add players to the lottery

MasterContract gets deployed, then 1 user deployed a new lottery, which added 1 ether to the Lottery contract. Then a 2nd user called `addActivePlayer`, which added 1 more ether. So now the Lottery has 2 active players and 2 ether. This is the max so it pays out, and house collects its fee.

### Example of Emit Event
```
// appears in Node console, does not show in your local running blockchain's log
 { logIndex: 0,
  transactionIndex: 0,
  transactionHash: '0x63dd197bc47e8020622e17359c518546353489cec9eb1c6e9cfbcd0ccfd26a7e',
  blockHash: '0x5ccd2ef930117cf328676236b5536121857b93ed337c2e60eda860b161c126c2',
  blockNumber: 3,
  address: '0x68f40cf3149e96c6db08908a326af12da8e26322',
  type: 'mined',
  event: 'eLog',
  args:
   { _from: '0x4dc586b4a3cf013e9a09340541bda5f5b509e19d',
     _value: 'value equals ether contribution, add player' } }
```

### Some Solidity Gotchas
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
- difference between
[Gist - Compile Multiple Contracts for abi/bytecode](https://gist.github.com/inovizz/1fdc2af0182584b90008e0cf2895554c) so 1 contract can `import` the other
```
var bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
// .contracts has multiple contracts
```
and
For when contracts are all in the same .sol file.
```
var bytecode = compiled["contracts"][`:${contractName}`]["bytecode"]
// .contracts has 1 contract in it
```

this error
```
winner.transfer(this.balance);
Warning: Using contract member "balance" inherited from the address type is deprecated. Convert the contract to "address" type to access the member.
```
can be fixed with:
```
winner.transfer(address(this).balance);
```


msg.sender may be different, depending on the calling context of the smart contract method.
Was the MasterContract.sol calling addActivePlayer and using from:addr from MasterContract.sol?
OR
Was web3 contract obj calling addActivePlayer and using from:addr from that web3.js invocation?
activePlayers.push(msg.sender); // might get wrong address

emit event
shows _from:addr for whatever you pass into eLog(addr) --> 
so implement both into the eLog emit event:
```
emit eLog(msg.sender, player, "the lottery was not filled yet");
```

emit event - note
must apply it after the contract is created. node.js displays it and needs to know that deployed contract's address.
code from solidity alone won't cause any emit event

lotteries[] array of lotteries. want to search it for address. high gas cost that increases with n lotteries
use mapping or other workaround
https://ethereum.stackexchange.com/questions/12537/how-to-search-string-in-array?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

cyclic imports - supposedley fixed. Lotter and MasterContract can't import each other


changes lotteries[] from ['0x1234'] to ['0x0000]    
```
delete lotteries[i]; 
```
so instead use:
```
        for (uint i = 0; i < numLotteries; i++) {
            Lottery lottery = lotteries[i];
            if (lottery == lotteryToRemove) {
                emit eLog(msg.sender, "removing.....delete");
                for (uint index = i; index < numLotteries-1; i++){
                    // RE-SHIFTING ALL the elements 1 index to the left, starting from the element we don't want anymore
                    lotteries[index] = lotteries[index+1];
                }
                lotteries.length--;
                emit eLog(msg.sender, "removing.....deleted, re-check lotteries[]");
            }
        }
```


`var lotteryMade = masterContract.createLottery(` doesn't return a new lottery? however it still deploys and can access it via...


// balance(lotteryAddress); // logs 0 even if the address was selfdestructed. if you comment out the selfdestruct in lottery.sol, it should still log 0, because balance was transferred to the Winner


getMaxPlayers returns `{ [String: '5'] s: 1, e: 0, c: [ 5 ] }`


Because need Remix compiler, or to provide mapping: https://ethereum.stackexchange.com/questions/13067/importing-contracts-files-to-ethereum-wallet?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
```
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";
Source "github.com/oraclize/ethereum-api/oraclizeAPI.sol" not found
```


https://github.com/oraclize/ethereum-studio-examples/blob/master/contracts/lib/oraclizeAPI.sol
