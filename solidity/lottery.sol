// If each contract instance represents a separate lottery,
// maybe have another contract that points to all these others,
// contracts...returning contracts
// contracts...pointing to contracts

contract Lottery {
    enum LotteryState {noContributions, fillingContributions, fullContributions}
    LotteryState public currentState;

    uint public numContestants;
    uint public contributionAmount;
    uint public seedBlockNumber; // but need new one per each lottery...
    

    mapping(address => uint) public lotteries;
    // once closed, remove it from array? leave it as closed?
    // or have openLotteries, closedLotteries. need move between them?
    /*
    function kill() onlyOwner() {
        selfdestruct(owner);
    }
    */

    // initialize with numContestants, contributionAmount
    // hard because want to check what's open, don't want to initialize new one every time...
    function Lottery(uint _numContestants, uint _contributionAmount) {
        currentState = LotteryState.noContributions;
        numContestants = _numContestants;
        contributionAmount = _contributionAmount;
    }

    function createLottery (uint _numContestants, uint _contributionAmount) {
        // msg.sender, msg.value
        wager = msg.value;
        player1 = msg.sender;
        seedBlockNumber = block.number;


        // If no open lottery  for _numContestants, _contributionAmount
            // create lottery ...
            // mapping of lotteries?

        // Else
            // update open lottery instance with +1 contestants and +1 unit of contribution amount
            // i.e. contributeAmount() / wagerContribution() / addEther()

        // throw (dont save any state transitions)
    }

    function wagerContribution () {
        // ...
    }


    function awardWinner (uint numberOfContestants) {
        uint256 blockValue = uint256(block.blockhash(seedBlockNumber));
        uint256 FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
        uint256 coinFlip = uint256(uint256(blockValue) / FACTOR);
        
        
        winner.send(this.balance)
        // change lottery's state to closed...
    }

    function kill() onlyOwner() {
        // 1%
        selfdestruct(owner);
    }


}