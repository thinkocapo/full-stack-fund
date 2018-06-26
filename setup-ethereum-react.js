/*
  INSTRUCTIONS (TODO move to README)
  1. Run 'ganache-cli testrpc' in a new terminal
  2. node setup-ethereum-react.js
  3. npm start
  4. open Chrome Browser and go to localhost:3000
  5. Read open lotteries, button (these call methods that were called in cli-app/main.js) like...
  masterContract.createLottery(
  the Checks 1,2
  lotteryContract.addActivePlayer
  6. Place Ether Bet...
*/

const Helpers = require('./cli-app/helpers')

global.config = {
  rpc: {
    host: "localhost",
    port: "8545"
  }
}
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

global.acct1 = web3.eth.accounts[0]
global.acct2 = web3.eth.accounts[1]
global.acct3 = web3.eth.accounts[2]
global.acct4 = web3.eth.accounts[3]
global.acct5 = web3.eth.accounts[4]

const helpers = new Helpers()

global.masterContract = helpers.compileContractsAndDeployMasterContract1File()


global.balance = helpers.balance
global.getContract = helpers.getContract.bind(helpers) 
global.toWei = helpers.toWei

console.log(`....MasterContract was deployed and is available as 'masterContract' global object....\n`)

require('repl').start({})