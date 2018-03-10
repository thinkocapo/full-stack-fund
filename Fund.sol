pragma 1.0.4;
contract Fund {
    // if declare it public, this auto-creates an accessor method* otherwise must declare the func like function getBuyerAddress() constant returns (address) { return buyer; }
    address public buyer;
    address seller;
    address arbiter;

    // constructor is called once. must be same name as Fund
    function Fund(address _seller, address _arbiter) payable {
        //msg - contains info about the transaction that is CALLING INTO the current contract
        // when in the msg object, its the  actual tx that's creating the function
        buyer = msg.sender;
        seller = _seller;
        arbiter = _arbiter;
    }

    function payoutToSeller() {
        // only buyer and arbiter can send balance to the Seller
        if (msg.sender === buyer || msg.sender === arbiter) {
            seller.send(this.balance) // balance of the contract (what's been sent there)

        }
    }
    function refundToBuyer () {
        if (msg.sender === buyer || msg.sender === arbiter) {
            buyer.send(this.balance)
        }
    }

   function getBalance() constant returns (uint) {
       return this.balance
   }


}

// contracts can have state that they store INSIDE the contract and store on the blockchain
// we want to store address of buyer, seller, arbiter