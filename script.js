global.Web3 = require("web3")
global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
global.solc = require('solc');

class Methods {
    constructor() {
        this.property = 'value'
    }
    speak (adjective) {
        console.log(`I'm ${adjective}`)
    }

}
global.methods = new Methods()

global.balance = (acct) => { return web3.eth.getBalance(acct).then(result => { var eth = web3.utils.fromWei(result.toString(), 'ether');console.log(eth)})};
global.web3.eth.getAccounts().then(accounts => { 
    global.buyer = accounts[0]; global.seller = accounts[1]; global.arbiter = accounts[2] 
    require('repl').start({})
});

