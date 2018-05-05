// etherContribution is in wei
// activePlayers.push(sender); // or should use addActivePlayer() (would need to update it)
// owner receives fee when reward payout is made
contract Lottery {
    uint public etherContribution;
    uint public maxPlayers;
    address owner;

    address[] public activePlayers;

    function Lottery (uint _etherContribution, uint _maxPlayers, address sender, address _owner) public payable {
        etherContribution = _etherContribution;
        maxPlayers = _maxPlayers;
        activePlayers.push(sender);
        owner = _owner;
    }

    function addActivePlayer() public payable {
        if (msg.value == etherContribution) {
            activePlayers.push(msg.sender);
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