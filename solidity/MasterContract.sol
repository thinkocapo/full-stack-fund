pragma solidity ^0.4.0;
import "./Lottery.sol";

// Need function for updating owner to new owner, only callable by the current owner
// modifier onlyOwner() {
//     if (msg.sender == owner) {
//         _;
//     }
// }
// getMaxPlayers returns { [String: '5'] s: 1, e: 0, c: [ 5 ] }
contract MasterContract {
    address public owner;
    Lottery[] public lotteries;
    address public newLotteryAddress;
    
    function MasterContract () public payable {
        owner = msg.sender;
    }

    function createLottery(uint _etherContribution, uint _maxPlayers) public payable {
        // If openlottery with same etherContribution, maxPlayers, then call addActivePlayer on that lottery, otherwise, continue below...
        // don't need _etherContribution, use msg.value instead? but what they're declaring should match what they're sending...Design choice...
        Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers, owner);
        newLottery.addActivePlayer(owner, msg.value);
        newLotteryAddress = address(newLottery);
        lotteries.push(newLottery);
    }

    function getLotteries() public view returns (Lottery[]) {
        return lotteries;
    }
    function getNewLotteryAddress() public view returns (address) {
        return newLotteryAddress;
    }
    function getLotteryMaxPlayers() public view returns (uint) {
        Lottery lottery = Lottery(newLotteryAddress); 
        return lottery.getMaxPlayers();
    }
    function getOwner() public view returns (address){
        return owner;
    }
}

// DEV OBSERVATIONS
// 1 Master getLottery 2 addPlayer() <-- would have to pay gas twice? because two transactions?
// 1 Master addPlayer(lotteryAddress) and Contract addPlayer(msg.sender)

// HOWEVER this would allow for 1 smart contract call, instead of 2.
// * dont need this because If you already have lottery address, then don't bother going through Master Contract *
// function addPlayer(address lotteryAddress) public payable {
    // lotteryAddress.activePlayers.push(msg.sender) // won't send ether to it
    // lotteryAddress.addPlayer(msg.sender);
    // lotteryAddress.send(msg.value);
    // or
    // Lottery lottery = Lottery(lotteryAddress)
    //lottery.addActivePlayer(msg.sender);        
    // repeat...
// }