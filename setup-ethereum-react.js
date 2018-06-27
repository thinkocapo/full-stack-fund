/*
  INSTRUCTIONS (TODO move to README)
  1. Run 'ganache-cli testrpc' in a new terminal
  2. node setup-ethereum-react.js
  2. Master Contract is deployed and its ethereum address is logged as output
  3. npm start
  4. open Chrome Browser and go to localhost:3000
  5. Read open lotteries, button (these call methods that were called in cli-app/main.js) like...
  masterContract.createLottery(
  the Checks 1,2
  lotteryContract.addActivePlayer
  6. Place Ether Bet...
  
  not using accounts whose privateKeys controlled by our geth node...
  will use account whose privateKey is controlled by Metamask...
*/

const Helpers = require('./cli-app/helpers')

const config = {
  rpc: {
    host: "localhost",
    port: "8545"
  }
}
// can put all this into helpers.js so its 1 scope? no longer using the REPL...
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.rpc.host}:${config.rpc.port}`))

const helpers = new Helpers()

global.masterContract = helpers.compileContractsAndDeployMasterContract1File()
console.log(`Run the command 'npm start' to start react-app and create lotteries, place bets....`)