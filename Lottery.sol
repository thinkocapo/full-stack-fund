contract Lottery {
    enum LotteryState { open, closed }
    LotteryState public currentState;
    
    // .createLottery(numContestants, amtContribution)
    function Lottery () {
        // Example. 5 contestants, 1.0 eth contribution
        // state regarding how full it is, 1/5, 2/5, 3/5, 4/5, 5/5

        // check a 'mappings' object to see if there's a (5, 1.0) available...
        // increment it...
        // check if its full 5/5 and if so then pickWinner(), payout() and transitionLotteryState()
    }

    // change state to closed
    function transitionLotteryState(bytes32 state) {

    }

    // generates random # and assigns a winnter
    function pickWinnter () {

    }
    // method for paying out
    function payout () {
        // winner
    }

}