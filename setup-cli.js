const Helpers = require('./helpers')

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

// global.masterContract = helpers.compileContractsAndDeployMasterContract() OLD attempt

global.masterContract = helpers.compileContractsAndDeployMasterContract1File()

global.balance = helpers.balance
global.getContract = helpers.getContract.bind(helpers) // TODO getContract1File....
global.toWei = helpers.toWei

console.log(`....MasterContract was deployed and is available as 'masterContract' global object....\n`)

// Don't need this repl if only deploying master contract... and rest is done from Web App...
require('repl').start({})