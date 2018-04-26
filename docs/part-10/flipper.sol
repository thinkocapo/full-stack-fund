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

    function accepteWager() onlyState(GameState.wagerMade) returns (bool) {

        currentState = GameState.wagerAccepted;
        return true;
    }

    function resolveBet() onlyState(GameState.wagerAccepted) returns (bool) {

        currentState = GameState.noWager;
        return true;
    }
}