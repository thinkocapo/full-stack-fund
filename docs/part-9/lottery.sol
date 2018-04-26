contract Lottery {
    enum LotteryState {noContributions, fillingContributions, fullContributions}
    LotteryState public currentState;
    
    // **TODO**
    // initialize with numContestants, contributionAmount
    // hard because want to check what's open, don't want to initialize new one every time...
    function Lottery(number numContestants, contributionAmount) {
        currentState = LotteryState.noContributions;
    }

    function transitionGameState() {

    }
}