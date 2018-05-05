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
  
  // Helper Functions
  class Helpers {
  
    contractName(source) {
      var re1 = /contract.*{/g
      var re2 = /\s\w+\s/
      return source.match(re1).pop().match(re2)[0].trim()
    }
  
    createContract(source, options={}) {
      var compiled = solc.compile(source)
      var contractName = this.contractName(source)
      var bytecode = compiled["contracts"][`:${contractName}`]["bytecode"]
      var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
      var contract = global.web3.eth.contract(abi)
      var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })
  
      var deployed = contract.new(Object.assign({
        from: global.web3.eth.accounts[0],
        data: bytecode,
        gas: gasEstimate,
        gasPrice: 5
        // value: web3.toWei(1, 'ether')
      }, options), (error, result) => { })
  
      return deployed
    }
  
    loadContract(name) {
      var path = `./solidity/${name}.sol`
      console.log('PATH', path)
      return fs.readFileSync(path, 'utf8')
    }

    // TODO - need get the Lottery.sol Lottery Contract and not Lottery+Master in MasterContract.sol
    // [`:${contractName}`] should ensure you get the Lottery one
    getContract(contractFileName, contractName, address) { // contractFileName:'MasterContract' contractName:'Lottery'
      var source = this.loadContract(contractFileName)
      var compiled = solc.compile(source)
      var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
      var Contract = global.web3.eth.contract(abi)
      var contract = Contract.at(address)
      return contract
    }
  
    deployContract(name, options={}) {
      var source = this.loadContract(name)
      return this.createContract(source, options)
    }
  
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
  
  }
  
  // Load Helpers into Decypher namespace
  global.decypher = new Helpers()
  global.deployed = decypher.deployContract("MasterContract")
  console.log(`* Contract was deployed and is available as 'deployed' object. Run these commands *`)
  console.log(`deployed.createLottery(web3.toWei(1, 'ether'), 5, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })`)
  console.log(`const lotteryAddress = deployed.getNewLotteryAddress.call();`)
  console.log(`const lotteryContract = decypher.getContract('MasterContract', 'Lottery', lotteryAddress);`)
  console.log(`lotteryContract.addActivePlayer({from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') });`)
  console.log('* CHECK EVERYTHING WORKED *')
  console.log(`lotteryContract.getActivePlayers();`)
  console.log(`decypher.balance(lotteryAddress);`)
  // Start repl
  require('repl').start({})