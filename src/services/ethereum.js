/*

/$$             /$$     /$$                                                   /$$       /$$          
| $$            | $$    | $/                                                  | $$      | $$          
| $$  /$$$$$$  /$$$$$$  |_/   /$$$$$$$        /$$$$$$   /$$$$$$  /$$$$$$/$$$$ | $$$$$$$ | $$  /$$$$$$ 
| $$ /$$__  $$|_  $$_/       /$$_____/       /$$__  $$ |____  $$| $$_  $$_  $$| $$__  $$| $$ /$$__  $$
| $$| $$$$$$$$  | $$        |  $$$$$$       | $$  \ $$  /$$$$$$$| $$ \ $$ \ $$| $$  \ $$| $$| $$$$$$$$
| $$| $$_____/  | $$ /$$     \____  $$      | $$  | $$ /$$__  $$| $$ | $$ | $$| $$  | $$| $$| $$_____/
| $$|  $$$$$$$  |  $$$$/     /$$$$$$$/      |  $$$$$$$|  $$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$$
|__/ \_______/   \___/      |_______/        \____  $$ \_______/|__/ |__/ |__/|_______/ |__/ \_______/
                                             /$$  \ $$                                                
                                            |  $$$$$$/                                                
                                             \______/       
*/

// TODO - Move all of this to a .env file
const config = {
 rpc: {
        host: "localhost",
        port: "8545"
    }
}
const solc = require("solc")
const fs = require("fs")
const Web3 = require("web3")
const web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

class Ethereum {
    constructor() {
        console.log('I AM CONSTRUCTOR')
        const Helpers = require('./helpers')

        
        // global.web3 = new Web3(Web3.currentProvider)) // must be loaded by a browser? *

        const acct1 = web3.eth.accounts[0]
        const acct2 = web3.eth.accounts[1]
        const acct3 = web3.eth.accounts[2]
        const acct4 = web3.eth.accounts[3]
        const acct5 = web3.eth.accounts[4]

        const helpers = new Helpers()
        // global.masterContract = helpers.compileContractsAndDeployMasterContract() OLD attempt
        let masterContract = helpers.compileContractsAndDeployMasterContract1File() // *

        // global.coinFlipOracleContract = helpers.compileAndDeployCoinFlipOracleContract1File()
        // global.coinFlipOracleContract = helpers.compileAndDeployCoinFlipOracleContract()

        const balance = helpers.balance
        const getContract = helpers.getContract.bind(helpers) // TODO getContract1File....
        const toWei = helpers.toWei

        console.log(`....MasterContract was deployed and is available as 'masterContract' global object....\n`)

        require('repl').start({})
    }
    // componentWillMount(){} functions?
    mymethod: function () {
        console.log('MY METHOD YO')
    }
}