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
// import solc from 'solc' // Module not found: Can't resolve 'module' in '/Users/WillsHome/Projects/full-stack-fund/node_modules/require-from-string'
// import fs from 'fs' // Module not found: Can't resolve 'module' in '/Users/WillsHome/Projects/full-stack-fund/node_modules/require-from-string'

// TODO - Move all of this to a .env file?
import web3 from 'web3'

const config = {
 rpc: {
        host: "localhost",
        port: "8545"
    }
}
// const Helpers = require('../../helpers')
// console.log('1config',config)
// console.log('2web3',web3)


// OLD...from running solidity test (main.js) from command-line, using accounts on a local geth node, whose privateKeys were imported (i.e. we control them)
// const web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))
// NEW... for working with Metamask. This file must be loaded by a browser? Because if you run it as a node.js script then .currentProvider won't find the browser!!! This is why it error'd when I tried.
// const web3 = new Web3(Web3.currentProvider) // must be loaded by a browser? *

// module.exports = class Ethereum {

// https://github.com/MetaMask/metamask-extension/issues/1158
export default class Ethereum {
    constructor() {
        // console.log('Web3.currentProvider...', web3.currentProvider) // undefined *
        // this.web3 = new web3(web3.currentProvider)
        // console.log('this.web3...', this.web3)


        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check
        window.addEventListener('load', function() {

            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            let web3js
            if (typeof web3 !== 'undefined') {
              console.log('web3 !== undefined')
              console.log('web3.currentProvider...', web3.currentProvider)
              // Use Mist/MetaMask's provider
              web3js = new web3(web3.currentProvider);
            } else {
              console.log('No web3? You should consider trying MetaMask!')
              // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
              web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
            }

            console.log('web3...', web3)
            console.log('web3js...', web3js)
            console.log('web3js.currentProvider ...', web3js.currentProvider) // undefined *
          
            // but if you type web3.currentProvider into Chrome console, its there *

            // Now you can start your app & access web3 freely:
            // startApp()
          
          })


        
        // const helpers = new Helpers()
        // let masterContract = helpers.compileContractsAndDeployMasterContract1File()
    }
    mymethod () {
        console.log('mymethod was called!')
    }
    // const balance = helpers.balance
    // const getContract = helpers.getContract.bind(helpers) // TODO getContract1File....
    // const toWei = helpers.toWei
    
    // no render() method - DUMB REACT COMPONENT not SMART REACT COMPONENT
}