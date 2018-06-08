// ethereum.sh can run this file for you and set up your REPL and Blockchain nicely into  terminal panes, if you have tmux https://github.com/tmux/tmux
// Before running setup.js, initialize a local blockchain, which loads test accounts and MasterContract into your locally running blockchain on localhost:8545.
// The command to initialize your blockchain is ganache-cli testrpc
// The last line of setup.js starts a Node.js repl console, and main.js has commands we'll paste into the repl console
// Or you can send the commands directly to the repl (like piping or stdin) using tmux, I need to setup a tmux plugin for that still.
// const { balance, compileContractsAndDeployMasterContract } = new Helpers() // loses 'this' context if don't call it off of helpers - 'cannot read property loadContract of undefined'

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

// global.coinFlipOracleContract = helpers.compileAndDeployCoinFlipOracleContract1File()
global.coinFlipOracleContract = helpers.compileAndDeployCoinFlipOracleContract()

global.balance = helpers.balance
global.getContract = helpers.getContract.bind(helpers) // TODO getContract1File....
global.toWei = helpers.toWei

console.log(`....MasterContract was deployed and is available as 'masterContract' global object....\n`)

require('repl').start({})