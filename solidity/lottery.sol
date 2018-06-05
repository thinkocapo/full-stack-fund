pragma solidity ^0.4.0;

// EMIT EXAMPLE
// logs in node.js, not in your local running blockchain log
//  { logIndex: 0,
//   transactionIndex: 0,
//   transactionHash: '0x63dd197bc47e8020622e17359c518546353489cec9eb1c6e9cfbcd0ccfd26a7e',
//   blockHash: '0x5ccd2ef930117cf328676236b5536121857b93ed337c2e60eda860b161c126c2',
//   blockNumber: 3,
//   address: '0x68f40cf3149e96c6db08908a326af12da8e26322',
//   type: 'mined',
//   event: 'eLog',
//   args:
//    { _from: '0x4dc586b4a3cf013e9a09340541bda5f5b509e19d',
//      _value: 'value equals ether contribution, add player' } }

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

    event eLog (
        address indexed _from,
        address indexed player,
        string value
    );

    // there was a  param {value: web3.toWei(1, 'ether') } sent when web3 invocated this method...thats how the Lottery Contract gets the eth.
    function addActivePlayer(address player, uint etherAmount) public payable {
        if (etherAmount == etherContribution) {
            // **** msg.sender here is MasterContract if that's where it was invoked from...
            // **** msg.sender here is from {from: address} if method is being invoked directly on lotteryContract (as in adding the 2nd player)
            // emit eLog(msg.sender, "value equals ether contribution, add player"); // works 06/05/18 2:04p
            // TODO - pass no arg 'player' to below line, and instead use msg.sender
            activePlayers.push(player); // **** '0x52bc3e8bf8e259472c4cb5d6b5dc0fea40e17207' IS ADDRESS OF MASTER CONTRACT??****
        } else {
            // **** appears as '_from' in the emit event
            emit eLog(msg.sender, player, "etherAmount sent was not the same as minEther"); // METP, minEther ToPlayWith
        }
        if (activePlayers.length == maxPlayers) {
            // 1 - Winner should receive money successfully before the House takes a Fee
            // address winner = this.randomWinner();
            
            uint randomNumber = 1;
            address winner = activePlayers[randomNumber];
            winner.transfer(address(this).balance); // remaining balance...
            emit eLog(msg.sender, player, "the lottery was filled. payout made...");
            
            // 2
            //uint numerator = 1;
            //uint denominator = 100;
            //uint fee = (this.balance * numerator) / denominator;
            //owner.transfer(fee); // does this substract it from this.balance??? 
            
            // 3
            // kill(); // selfdestruct(); remove from MasterContract.lotteries[]
        } else {
            emit eLog(msg.sender, player, "the lottery was not filled yet");
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
