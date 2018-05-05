// etherContribution is in wei
// activePlayers.push(sender); // or should use addActivePlayer() (would need to update it)
// owner receives fee when reward payout is made
// contract Lottery {
//     uint public etherContribution;
//     uint public maxPlayers;
//     address owner;

//     address[] public activePlayers;

//     function Lottery (uint _etherContribution, uint _maxPlayers, address sender, address _owner) public payable {
//         etherContribution = _etherContribution;
//         maxPlayers = _maxPlayers;
//         activePlayers.push(sender);
//         owner = _owner;
//     }

//     function addActivePlayer() public payable {
//         if (msg.value == etherContribution) {
//             activePlayers.push(msg.sender);
//         }
//     }
//     function getActivePlayers() public view returns (address[]) {
//         return activePlayers;
//     }
//     function getEtherContribution() public view returns (uint) {
//         return etherContribution;
//     }
//     function getMaxPlayers() public view returns (uint) {
//         return maxPlayers;
//     }
//     function getOwner() public view returns (address) {
//         return owner;
//     }
// }
pragma solidity ^0.4.0;
import "./Lottery.sol";
// need function for updating owner to new owner, only callable by the current owner
// getMaxPlayers returns { [String: '5'] s: 1, e: 0, c: [ 5 ] }
contract MasterContract {
    address public owner;
    Lottery[] public lotteries;
    address public newLotteryAddress;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }
    
    function MasterContract () public payable {
        owner = msg.sender;
    }

    function createLottery(uint _etherContribution, uint _maxPlayers) public payable {
        // If openlottery with same etherContribution, maxPlayers, then call addActivePlayer on that lottery
        // otherwise, continue below...
        Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers, msg.sender, owner);
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