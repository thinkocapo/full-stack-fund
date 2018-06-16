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
// const config = {
//  rpc: {
//         host: "localhost",
//         port: "8545"
//     }
// }
// const solc = require("solc")
// const fs = require("fs")
// const Web3 = require("web3")

// OLD...from running solidity test (main.js) from command-line, using accounts on a local geth node, whose privateKeys were imported (i.e. we control them)
// const web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

// NEW... for working with Metamask. This file must be loaded by a browser? Because if you run it as a node.js script then .currentProvider won't find the browser!!! This is why it error'd when I tried.
// const web3 = new Web3(Web3.currentProvider) // must be loaded by a browser? *

export default class Ethereum {
    constructor() {
        console.log('- - - - - - - I AM CONSTRUCTOR - - - - - -  -')
        // const Helpers = require('../../helpers')

        
        // global.web3 = new Web3(Web3.currentProvider)) // must be loaded by a browser? *

        // const helpers = new Helpers()
        // let masterContract = helpers.compileContractsAndDeployMasterContract1File()

        // const balance = helpers.balance
        // const getContract = helpers.getContract.bind(helpers) // TODO getContract1File....
        // const toWei = helpers.toWei
    }
    mymethod () {
        console.log('dis method bein cALLLED')
    }
    // no render() method
}