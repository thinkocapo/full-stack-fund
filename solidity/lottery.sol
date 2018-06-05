pragma solidity ^0.4.0;

// etherContribution is in wei
// activePlayers.push(sender); // or should use addActivePlayer() (would need to update it)
// owner receives fee when reward payout is made
contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    address owner;
    address[] public activePlayers;

    function Lottery (uint _etherContribution, uint _maxPlayers, address _owner) public payable { // address sender
        etherContribution = _etherContribution; // * msg.value
        maxPlayers = _maxPlayers;
        // activePlayers.push(sender); DEPRECATED, because call setter method during createLottery invocation in MasterContract
        owner = _owner; // *TODO* should be sender? not owner of Master. maybe lottery creator isn't owner of MasterContract
    }

    event Logger (
        address indexed _from,
        string _value
    );

    /* DEPRECATED because msg.value and/or msg.sender weren't available when this method was called from MasterContract.sol, however they were accessible when called from web3
    function addActivePlayer() public payable {
         if (msg.value == etherContribution) {
             activePlayers.push(msg.sender);
         }
    }
    *TODO* is there a way to pass msg.value if this method is called from Master Contract?
    */
    function addActivePlayer(address player, uint etherAmount) public payable {
        if (etherAmount == etherContribution) {
            emit Logger(msg.sender, "value equals ether contribution, add player");            
            activePlayers.push(player);
        }
        if (activePlayers.length == maxPlayers) {
            emit Logger(msg.sender, "the lottery was filled");
            // 1 - Winner should receive money successfully before the House takes a Fee
            // address winner = this.randomWinner();
            // winner.transfer(this.balance); // remaining balance...
            
            // 2
            //uint numerator = 1;
            //uint denominator = 100;
            //uint fee = (this.balance * numerator) / denominator;
            //owner.transfer(fee); // does this substract it from this.balance??? 
            
            // 3
            // kill(); // selfdestruct(); remove from MasterContract.lotteries[]
        } else {
            emit Logger(msg.sender, "the lottery was not filled yet");
        }
    }

    function randomWinner() public view returns (address) {
        // 2
        // Oracle to generate random number
        uint index = 1;
        return activePlayers[index];
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


// owner.transfer(this.balance); // wrong program flow but worked
