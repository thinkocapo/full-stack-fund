contract Lottery {
    enum LotteryState {noContributions, fillingContributions, fullContributions}
    LotteryState public currentState;

    uint public numContestants;
    uint public contributionAmount;


    // initialize with numContestants, contributionAmount
    // hard because want to check what's open, don't want to initialize new one every time...
    function Lottery(uint _numContestants, uint _contributionAmount) {
        currentState = LotteryState.noContributions;
        numContestants = _numContestants;
        contributionAmount = _contributionAmount;
    }

    function createLottery (uint _numContestants, uint _contributionAmount) {
        // msg.sender, msg.value
        
        // If no open lottery  for _numContestants, _contributionAmount
            // create lottery ...
            // mapping of lotteries?

        // Else
            // update open lottery instance with +1 contestants and +1 unit of contribution amount
            // i.e. contributeAmount() / wagerContribution() / addEther()

        // throw (dont save any state transitions)
    }

    function wagerContribution () {

    }


}