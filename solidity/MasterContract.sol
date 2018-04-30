contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;

    address[] public players;


    function Lottery (uint _etherContribution, uint _maxPlayers) {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
    }
}

contract MasterContract {
    address public owner;
    Lottery[] public lotteries;
    address public firstAddress;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }

    function MasterContract () payable public {
        owner = msg.sender;
    }

    function createLottery(uint _etherContribution, uint _maxPlayers) payable public {
        Lottery newLottery = new Lottery(_etherContribution, _maxPlayers);
        firstAddress = address(newLottery);

        // address(newLottery).send(msg.value);
        // lotteries.push(newLottery);
    }

    function getLotteries() public view returns (Lottery[]) {
        return lotteries;
    }

    function getFirstAddress() public view returns (address) {
        return firstAddress;
    }
    
}