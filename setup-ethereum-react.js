/*
  INSTRUCTIONS (TODO move to README)
  1. Run 'ganache-cli testrpc' in a new terminal
  2. node setup-ethereum-react.js
  2. Ethereum address of the deployed Master Contract is logged as output, you'll need this value... TODO
  3. npm start
  4. open Chrome Browser and go to localhost:3000
  5. Read open lotteries, button (these call methods that were called in cli-app/main.js) like...
  masterContract.createLottery(
  the Checks 1,2
  lotteryContract.addActivePlayer
  6. Place Ether Bet...
*/

const Helpers = require('./cli-app/helpers')

const config = {
  rpc: {
    host: "localhost",
    port: "8545"
  }
}
// these need be 'global' so helpers.js can use them
// TODO or just put all this into helpers.js so its 1 scope? no longer using the REPL...
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.rpc.host}:${config.rpc.port}`))

// not using accounts whose privateKeys controlled by our geth node...
// will use account whose privateKey is controlled by Metamask...
// acct1 = web3.eth.accounts[0]
// acct2 = web3.eth.accounts[1]
// acct3 = web3.eth.accounts[2]
// acct4 = web3.eth.accounts[3]
// acct5 = web3.eth.accounts[4]

const helpers = new Helpers()

global.masterContract = helpers.compileContractsAndDeployMasterContract1File()
// will log undefined, but there's a console.log in callback helpers.js that will log it...
// console.log(`MasterContract was deployed to ganache-cli testrpc....`, global.masterContract.address) // undefined
console.log(`Run the command 'npm start' to start react-app and create lotteries, place bets....`)

// global.balance = helpers.balance
// global.getContract = helpers.getContract.bind(helpers) 
// global.toWei = helpers.toWei

// REPL
// require('repl').start({})