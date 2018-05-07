pragma solidity ^0.4.0;

// etherContribution is in wei
// activePlayers.push(sender); // or should use addActivePlayer() (would need to update it)
// owner receives fee when reward payout is made
contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    address owner;

    address[] public activePlayers;

    function Lottery (uint _etherContribution, uint _maxPlayers, address sender, address _owner) public payable {
        etherContribution = _etherContribution; // * msg.value
        maxPlayers = _maxPlayers;
        activePlayers.push(sender);
        owner = _owner;
    }

    function addActivePlayer() public payable {
        if (msg.value == etherContribution) {
            activePlayers.push(msg.sender);
        }
        if (activePlayers.length == maxPlayers) {
            // uint fee = 1 % of balance
            // owner.transfer(fee)
            // address winner = randomWinner()
            // winner.transfer(this.balance)
            
            // owner.transfer(this.balance); // wrong program flow but worked
        }
        // kill(); // selfdestruct();
    }

    function randomWinner() public view returns (address) {
        // Oracle to generate random number
        return;
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