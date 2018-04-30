contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    
    address[] public players;
    uint public playerCount;

    uint public pot;

    // struct Lottery inside of MasterContract? https://ethereum.stackexchange.com/questions/9893/how-does-mapping-in-solidity-work?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
    // but with struct, could not selfdestruct?
    // could delete the struct from the mapping afterwards?

    function Lottery (uint _etherContribution, uint _maxPlayers) {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        playerCount = 1;
        pot = 0;
    }

    function addPlayer() payable {
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

    function createLottery(uint _etherContribution, uint _maxPlayers) payable {
        Lottery newLottery = new Lottery(_etherContribution, _maxPlayers);
        lotteries[newLottery.address] = newLottery;
    }
    // OR
    // function addLottery(address lottery) public {
    //     lotteries[lottery] = true // bool representing open/false...
    //     lotteries[lottery] = lottery // address representing contract address of the lottery
    //     lotteries[lottery] = Lottery // Lottery representing the lottery contract
    // }

    // Search lotteries for a lottery that has same etherContribution and maxPlayers
    function addPlayer (address lotteryAddress, uint _etherContribution, uint _maxPlayers) payable {
        Lottery lottery = lotteries[lotteryAddress];
        lottery.players.push(msg.sender)
    }
    // OR
    // Must provide the specific address
    function addPlayer (address lotteryAddress, uint _etherContribution, uint _maxPlayers) payable {
        Lottery lottery = lotteries[lotteryAddress];
        if (msg.value != lottery.etherContribution) throw;
        if (lottery.players.length == lottery.maxPlayers) throw;
        lottery.players.push(msg.sender);
        lottery.pot += msg.value;
        lottery.address.send(msg.value); // arrive at MasterContract, then immediately leaves... WORKS
        //or
        lotteryAddress.send(msg.value);
    }

    function readLotteries () {
        // return an object or json string or all objects
    }

    
}