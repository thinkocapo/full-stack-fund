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
    address owner;
    Lottery[] lotteries;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }

    function MasterContract () public {
        owner = msg.sender;
    }

    function createLottery(uint _etherContribution, uint _maxPlayers) payable {
        Lottery newLottery = new Lottery(_etherContribution, _maxPlayers);
        address(newLottery).send(msg.value);
        lotteries.push(newLottery);
    }
    
}