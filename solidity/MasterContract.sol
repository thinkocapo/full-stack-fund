contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;

    address[] public players;

    function Lottery (uint _etherContribution, uint _maxPlayers) public payable {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
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
        return lotteries;
        // > deployed.getLotteries()
        //[ '0xa48bd859d59d451c700c19dda6c36e3e9e0d1dec' ]
    }
    function getNewLotteryAddress() public view returns (address) {
        return newLotteryAddress;
    }
    
}