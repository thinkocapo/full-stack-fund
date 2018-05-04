contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;

    address[] public activePlayers;

    function Lottery (uint _etherContribution, uint _maxPlayers) public payable {
        etherContribution = _etherContribution; // etherPerPlayer
        maxPlayers = _maxPlayers;
        activePlayers.push(msg.sender);
    }

    // Must use node.js to get this contract...
    function addActivePlayer() public payable {
        if (msg.value == etherContribution) {
            activePlayers.push(msg.sender);
        } else {
            // throw;
        }
        // TODO check d.balance(lotteryAddress), the ether should be there
    }
    // OR
    // function addActivePlayer(address playerAddress) public payable {
    //     activePlayers.push(playerAddress);
    // }
    ///

    function getMaxPlayers() public view returns (uint) {
        return maxPlayers;
    }
}

contract MasterContract {
    address public owner;
    Lottery[] public lotteries;
    address public newLotteryAddress;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }
    // DELEGATECALL
    function MasterContract () public payable {
        owner = msg.sender;
    }

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

    function createLottery(uint _etherContribution, uint _maxPlayers) public payable {
        Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers);
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
        return lottery.getMaxPlayers(); // returns { [String: '5'] s: 1, e: 0, c: [ 5 ] }
    }
    
}

// DEV OBSERVATIONS
// function getLottery() public view returns (Lottery) {
//     return Lottery(newLotteryAddress); // returns an address, not the obj....why? solidity seems to not like returning entire objects...
// }

// returns Lottery[]... return lotteries; // returns array of addresses [ '0xa48bd859d59d451c700c19dda6c36e3e9e0d1dec' ]

// 1 Master getLottery 2 addPlayer() <-- would have to pay gas twice? because two transactions?
// 1 Master addPlayer(lotteryAddress) and Contract addPlayer(msg.sender)