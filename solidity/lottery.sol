pragma solidity ^0.4.0;


// reward payout is made, owner receives fee
contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    address owner;
    address[] public activePlayers;

    // no need to capture a 'balance' member variable because ether send to Contract Address, which has a native balance
    // activePlayers.push(sender); DEPRECATED, because call setter method during createLottery invocation in MasterContract
    // TODO - check that msg.value the user is sending, is equal to the _etherContribution the user is defining
    function Lottery (uint _etherContribution, uint _maxPlayers, address _owner) public payable { // address sender
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        owner = _owner; // TODO - should be sender? not owner of Master. maybe lottery creator isn't owner of MasterContract
    }

    event Logger (
        address indexed _from,
        string _value
    );

    // there was a  param {value: web3.toWei(1, 'ether') } sent when web3 invocated this method...thats how the Lottery Contract gets the eth.
    function addActivePlayer(address player, uint etherAmount) public payable {
        if (etherAmount == etherContribution) {
            emit Logger(msg.sender, "value equals ether contribution, add player");
            // TODO - pass no arg 'player' to below line, and instead use msg.sender
            activePlayers.push(player);
        }
        if (activePlayers.length == maxPlayers) {
            emit Logger(msg.sender, "the lottery was filled. now making payout...");
            // 1 - Winner should receive money successfully before the House takes a Fee
            // address winner = this.randomWinner();
            address winner = player; // HARD-CODED;
            // TODO - WAY TO LOOKUP THE ACTIVE PLAYERS? how to call 'getActivePlayers'. will need this for Prod
            winner.transfer(address(this).balance); // remaining balance...
            
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
