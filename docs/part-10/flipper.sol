contract Flipper {
    enum GameState {noWager, wagerMade, wagerAccepted}
    GameState public currentState;
    uint public wager;
    address public player1;
    address public player2;
    
    modifier onlyState(GameState expectedState) { if(expectedState == currentState) { _; } else { throw; } }

    function Flipper(bytes32 targetState) {
        currentState = GameState.noWager;
    }

    function makeWager() onlyState(GameState.noWager) payable returns (bool) {
        wager = msg.value;
        player1 = msg.sender;
        currentState = GameState.wagerMade;
        return true;
    }

    function acceptWager() onlyState(GameState.wagerMade) payable returns (bool) {
        if (msg.value == wager) {
            player2 = msg.sender;
            currentState = GameState.wagerAccepted;
            return true;
        } else {
            throw;
        }
    }

    function resolveBet() onlyState(GameState.wagerAccepted) returns (bool) {

        currentState = GameState.noWager;
        return true;
    }
}