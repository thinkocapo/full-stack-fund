contract MasterContract {
    mapping(address => address) lotteries;
    address king;

    function MasterContract (address _king) public {
        king = _king
    }

    function changeKing (address _king) {
        if (msg.sender == king) {
            king = _king;
        }
    }
}