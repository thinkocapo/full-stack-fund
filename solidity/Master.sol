pragma solidity ^0.4.0;

contract Master {
    address public owner;
    Lottery[] public lotteries;
    address public newLotteryAddress;
    
    event eLog (
        address indexed _from,
        string value
    );

    function Master () public payable {
        owner = msg.sender;
    }

    // don't need _etherContribution, use msg.value instead? but what they're declaring should match what they're sending...Design choice...
    // msg.value goes to the new lottery contract because of .value(msg.value), and user's invocation had {value: web3.toWei(1, 'ether')}
    // .addActivePlayer takes in msg.value as a arbitrary number
    function createLottery(uint _etherContribution, uint _maxPlayers) public payable {
        Lottery newLottery = (new Lottery).value(msg.value)(_etherContribution, _maxPlayers, owner);
        newLottery.addActivePlayer(owner, msg.value); // delegate call to set msg.sender in Lottery as same addr as msg.sender in MasterContract
        newLotteryAddress = address(newLottery);
        lotteries.push(newLottery);
    }

    modifier onlyBy {
        uint256 numLotteries = lotteries.length;
        for (uint i = 0; i < numLotteries; i++) {
            Lottery lottery = lotteries[i];
            if (lottery == msg.sender) {
                emit eLog(msg.sender, "modifier - REMOVE the lottery, it was called by right contract, itself");
                _;
            }
        }
        // TODO - revert() won't work, but worked in Lottery.sol. 'throw;' is supposedly deprecated
    }


    // can use a better keyword than public? what if make private? set exclusive access
    // function removeLottery(address _lotteryAddress) onlyBy public payable { // DON'T NEED arg, can use msg.sender instead
    // delete lotteries[i]; changes lotteries[] from ['0x1234'] to ['0x0000]    
    // need payable ot else "Function state mutability can be restricted to pure function removeLottery() public { ^ (Relevant source part starts here and spans across multiple lines)."
    function removeLottery() onlyBy public payable { 
        emit eLog(msg.sender, "removeLottery()");                    
        address lotteryToRemove = msg.sender;
        uint256 numLotteries = lotteries.length;
        for (uint i = 0; i < numLotteries; i++) {
            Lottery lottery = lotteries[i];
            if (lottery == lotteryToRemove) {
                emit eLog(msg.sender, "removing.....delete");
                for (uint index = i; index < numLotteries-1; i++){
                    lotteries[index] = lotteries[index+1];
                }
                lotteries.length--;
                emit eLog(msg.sender, "removing.....deleted, re-check lotteries[]");
            }
        }
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

contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    address owner;
    address[] public activePlayers;
    address masterContractAddress;
    Master master;
    
    // ORACLIZE
    string public result;
    bytes32 public oraclizeID;
    function __callback(bytes32 _oraclizeID, string _result) {
        if(msg.sender != oraclize_cbAddress()) throw;
        result = _result;
    }
    
    
    event eLog (
        address indexed _from,
        address indexed player,
        string value
    );

    function Lottery (uint _etherContribution, uint _maxPlayers, address _owner) public payable { // address sender
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        owner = _owner; // TODO - should be sender? not owner of Master. maybe lottery creator isn't owner of MasterContract
        master = Master(msg.sender);
        masterContractAddress = msg.sender;
    }

    function addActivePlayer(address player, uint etherAmount) public payable {
        if (etherAmount == etherContribution) {
            emit eLog(msg.sender, player, "value equals ether contribution, add player");
            activePlayers.push(player);
        } else {
            emit eLog(msg.sender, player, "etherAmount sent was not the same as minEther"); // METP, minEther ToPlayWith
        }
        if (activePlayers.length == maxPlayers) {
            // ORACLIZE
            oraclizeID = oraclize_query("WolframAlpha", "flip a coin");

            // 1 - randomWinner() Winner should receive money successfully before the House takes a Fee
            uint randomNumber = 1;
            address winner = activePlayers[randomNumber];
            winner.transfer(address(this).balance);
            
            // 2 - payouts()
            //uint numerator = 1;
            //uint denominator = 100;
            //uint fee = (this.balance * numerator) / denominator;
            //owner.transfer(fee); // does this substract it from this.balance??? 
            
            // 3 - remove from MasterContract lotteries[] and selfdestruct() https://en.wikiquote.org/wiki/Inspector_Gadget
            emit eLog(msg.sender, player, "the lottery was filled. payout made...self-destructing"); // this wont run if you call it after selfdestruct, for obvious reason
            master.removeLottery();
            selfdestruct(address(this)); // doesnt remove the lottery from MasterContract.sol's Lottery[]
            //
        } else {
            emit eLog(msg.sender, player, "the lottery was not filled yet");
        }
    }

    function getActivePlayers() public view returns (address[]) {
        return activePlayers;
    }
    function getEtherContribution() public view returns (uint) {
        return etherContribution;
    }
    function getMaxPlayers() public view returns (uint) {
        return maxPlayers;
    }
    function getOwner() public view returns (address) {
        return owner;
    }
}