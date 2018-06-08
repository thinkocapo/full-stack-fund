pragma solidity ^0.4.0;
//import oraclizeAPI_pre0.4.sol when solidity < 0.4.0
// import "./OraclizeAPI.sol";
// June 8 2018
// import "https://github.com/oraclize/ethereum-api/oraclizeAPI.sol"; // NOT FOUND, URL 
// import "http://github.com/oraclize/ethereum-api/blob/master/oraclizeAPI.sol";
// import "github.com/oraclize/ethereum-api/blob/master/oraclizeAPI_0.4.sol";
import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract CoinFlipOracle is usingOraclize {

    string public result;
    bytes32 public oraclizeID;
    // added 'public' to both of these
    function flipCoin() payable public {
        oraclizeID = oraclize_query("WolframAlpha", "flip a coin");
    }    

    function __callback(bytes32 _oraclizeID, string _result) public {
        if(msg.sender != oraclize_cbAddress()) revert(); // throw;
        result = _result;
    }

}