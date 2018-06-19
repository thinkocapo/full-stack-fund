// move all config to a .env file
// Import web3 object in all React javascript files that need it?
// module.exports = class Ethereum {

// import solc from 'solc' // Module not found: Can't resolve 'module' in '/Users/WillsHome/Projects/full-stack-fund/node_modules/require-from-string'
// const Helpers = require('../../helpers')
// no render() method - DUMB REACT COMPONENT not SMART REACT COMPONENT
import web3 from 'web3'
const config = {
 rpc: {
        host: "localhost",
        port: "8545"
    }
}


// OLD...from running solidity test (main.js) from command-line, using accounts on a local geth node, whose privateKeys were imported (i.e. we control them)
// const web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))
// NEW... for working with Metamask. This file must be loaded by a browser? Because if you run it as a node.js script then .currentProvider won't find the browser!!! This is why it error'd when I tried.

// https://github.com/MetaMask/metamask-extension/issues/1158
// * but if you type web3.currentProvider into Chrome console, its there * still works even if comment out everything above...can open a new tab and still find web3...
// startApp()? Have all this precede any React rendering?
export default class Ethereum {

    // web3, Helpers, Master Contract
    // const helpers = new Helpers()
    // let masterContract = helpers.compileContractsAndDeployMasterContract1File()
    constructor() {
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check
        window.addEventListener('load', function() {
            console.log('constructor web3...', web3)

            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            let web3js
            if (typeof web3 !== 'undefined') {
              console.log('web3.currentProvider...', web3.currentProvider) // undefined
              // Use Mist/MetaMask's provider
              console.log('constructor web3js metamask...', web3js)
              web3js = new web3(web3.currentProvider);
            } else {
              // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail) * but localnode/hosted node won't have user's private keys, so this line is only for dev testing?
              console.log('constructor web3js no metamask...', web3js)
              web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
            }

        })
    }

    mymethod () {
        console.log('mymethod was called!')
    }
}