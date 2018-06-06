// import Helpers from './helpers'
  
// Config
global.config = {
  rpc: {
    host: "localhost",
    port: "8545"
  }
}

// Load Libraries
global.solc = require("solc")
global.fs = require("fs")
global.Web3 = require("web3")

// Connect Web3 Instance
global.web3 = new Web3(new Web3.providers.HttpProvider(`http://${global.config.rpc.host}:${global.config.rpc.port}`))

// Global Account Accessors
global.acct1 = web3.eth.accounts[0]
global.acct2 = web3.eth.accounts[1]
global.acct3 = web3.eth.accounts[2]
global.acct4 = web3.eth.accounts[3]
global.acct5 = web3.eth.accounts[4]
  
/******************* START HELP CLASS *********************/  
class Helpers {

  balance(contract) {
    switch(typeof(contract)) {
      case "object":
        if(contract.address) {
          return global.web3.fromWei(global.web3.eth.getBalance(contract.address), 'ether').toNumber()
        } else {
          return new Error("cannot call getEtherBalance on an object that does not have a property 'address'")
        }
        break
      case "string":
        return global.web3.fromWei(global.web3.eth.getBalance(contract), 'ether').toNumber()
        break
    }
  }

  /**
   * Multiple contracts referencing each other...So must compile them together
   * Compile both, but deploy once (Master)
   * compiled.contracts['MasterContract.sol:MasterContract'.bytecode]
   * compiled.contracts['Lottery.sol:Lottery'.bytecode]
   * creates all .sol abi/bytecodes and deploy contracts['MasterContract.sol:MasterContract']
   */
  createAndDeployContracts(source, options={}) {
    // create input object by reading from directory
    var input = {
      'Lottery.sol': this.loadContract('Lottery'),
      'MasterContract.sol': this.loadContract('MasterContract')
    };
    
    let compiled, contractName, bytecode
    try {
      compiled = solc.compile({sources: input}, 1);
      contractName = 'MasterContract'
      bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
      console.log('....compiled Lottery.sol MasterContract.sol together successfully....')
    } catch (err) { console.log('ERROR in compilation, no bytecode available')}
    
    var abi = JSON.parse(compiled["contracts"][`${contractName}.sol:${contractName}`]["interface"])
    var contract = global.web3.eth.contract(abi)
    var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

    var deployed = contract.new(Object.assign({
      from: global.web3.eth.accounts[0],
      data: bytecode,
      gas: gasEstimate,
      gasPrice: 5
      // value: web3.toWei(1, 'ether')
    }, options), (error, masterContract) => {}) // masterContract.address
    return deployed

  }

  // TODO get abi from the MasterContract(?) that has all, {source: input} ?
  getContract(contractName, address) {
    var source = this.loadContract(contractName)
    var compiled = solc.compile(source)
    var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
    var Contract = global.web3.eth.contract(abi)
    var contract = Contract.at(address)
    return contract
  }

  loadContract(name) {
    var path = `./solidity/${name}.sol`
    return fs.readFileSync(path, 'utf8')
  }  
}
/******************* END HELP CLASS *********************/
// does abi/bytecodes and deploys MasterContract - Master Contract now available as a global variable
// const { balance, createAndDeployContracts } = new Helpers() // loses 'this' context if don't call it off of helpers - 'cannot read property loadContract of undefined'

const helpers = new Helpers()
global.masterContract = helpers.createAndDeployContracts()
global.balance = helpers.balance
global.getContract = helpers.getContract.bind(helpers)
global.toWei = function (E) { return web3.toWei(E, 'ether') }

console.log(`....MasterContract was deployed and is available as 'masterContract' global object....\n`)

// Start repl
require('repl').start({})