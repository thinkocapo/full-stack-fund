contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;

    address[] public activePlayers;

    function Lottery (uint _etherContribution, uint _maxPlayers) public payable {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        activePlayers.push(msg.sender);
    }

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

    function MasterContract () public payable {
        owner = msg.sender;
    }


    function createLottery(uint _etherContribution, uint _maxPlayers) public payable {
        Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers);
        newLotteryAddress = address(newLottery);
        lotteries.push(newLottery);
    }

    function getLotteries() public view returns (Lottery[]) {
        return lotteries; // returns array of addresses [ '0xa48bd859d59d451c700c19dda6c36e3e9e0d1dec' ]
    }
    function getNewLotteryAddress() public view returns (address) {
        return newLotteryAddress;
    }
    function getLottery() public view returns (Lottery) { // pass by arg? functionality
        return Lottery(newLotteryAddress); // returns an address, not the obj....why? solidity seems to not like returning entire objects...
    }
    function getData() public view returns (uint) {
        Lottery lottery = Lottery(newLotteryAddress); 
        return lottery.getMaxPlayers(); // returns { [String: '5'] s: 1, e: 0, c: [ 5 ] }
    }
    
}