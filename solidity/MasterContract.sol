contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    
    address[] public players;
    uint public playerCount;

    // struct Lottery inside of MasterContract? https://ethereum.stackexchange.com/questions/9893/how-does-mapping-in-solidity-work?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

    function Lottery (uint _etherContribution, uint _maxPlayers) {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        playerCount = 1;
    }

    function addPlayer() {
        if (msg.value != etherContribution) throw;
        if (players.length == maxPlayers) throw;
        players.push(msg.sender);
        playerCount = playerCount + 1;

        if (players.length == maxPlayers && playerCount == maxPlayers) selectWinner();
    }

    function selectWinner() {
        // generate random number n from 1...maxPlayers
        // select the address at this index n in players[]
        address winner = players[n];

        // take 1% and send to the house/king
        // ...

        // send remaining 99% of award to the winner
        winner.send(this.balance);

        kill();
        selfdestruct(); // selfdestruct(owner) ?
    }
}

contract MasterContract {
    address king;
    mapping(address => Lottery) lotteries;
    Lottery[] lotteries;
    modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }

    function MasterContract () public {
        king = msg.sender()// _king
    }
    function changeKing (address _king) private {
        if (msg.sender == king) {
            king = _king;
        }
    }

    function createLottery(uint _etherContribution, uint _maxPlayers) {
        Lottery newLottery = new Lottery(_etherContribution, _maxPlayers);
        lotteries[newLottery.address] = newLottery;
    }
    // OR
    function addLottery(address lottery) public {
        lotteries[lottery] = true // bool representing open/false...
        lotteries[lottery] = lottery // address representing contract address of the lottery
        lotteries[lottery] = Lottery // Lottery representing the lottery contract
    }

    function placeBet (uint _etherContribution, uint _maxPlayers) {
        // Search lotteries for a lottery that has same etherContribution and maxPlayers
        Lottery lottery = 
    }

    function readLotteries () {
        // return an object or json string or all objects
    }

    
}