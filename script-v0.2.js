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
  
    // 1 Contract
    createContractOLD(source, options={}) {
      var compiled = solc.compile(source)
      console.log('compiled', compiled)      
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

    // Multiple contracts
    // console.log('\n==== compiled.contracts =====\n', compiled.contracts) // shows 2 contracts
    // compiled.contracts['MasterContract.sol:MasterContract'.bytecode]
    // compiled.contracts['Lottery.sol:Lottery'.bytecode]
    createContract(source, options={}) {
      // create input object by reading from directory
      var input = {
        'Lottery.sol': this.loadContract('Lottery'),
        'MasterContract.sol': this.loadContract('MasterContract')
      };
      let compiled = solc.compile({sources: input}, 1);
      var contractName = 'MasterContract'
      var bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
      var abi = JSON.parse(compiled["contracts"][`${contractName}.sol:${contractName}`]["interface"])
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
    getContractOLD(contractFileName, contractName, address) { // contractFileName:'MasterContract' contractName:'Lottery'
      var source = this.loadContract(contractFileName)
      var compiled = solc.compile(source)
      var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
      var Contract = global.web3.eth.contract(abi)
      var contract = Contract.at(address)
      return contract
    }

    getContract(contractName, address) {
      var source = this.loadContract(contractName)
      var compiled = solc.compile(source)
      // TODO get from the MasterContract(?) that has all, {source: input}
      var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
      var Contract = global.web3.eth.contract(abi)
      var contract = Contract.at(address)
      return contract
    }
  
    deployContractOLD(name, options={}) {
      var source = this.loadContract(name)
      return this.createContract(source, options)
    }

    // this.createContract will create all .sol abi/bytecodes and deploy contracts['MasterContract.sol:MasterContract']
    deployContracts() {
      // var source = this.loadContract(name)
      return this.createContract()
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
  // global.master = decypher.deployContractOLD("MasterContract")
  global.master = decypher.deployContracts() // does abi/bytecodes and deploys MasterContract
  
  console.log(`* Contract was deployed and is available as 'master' object. Run these commands *\n`)
  
  console.log(`master.createLottery(web3.toWei(1, 'ether'), 5, {from: acct1, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') })`)
  console.log(`const lotteryAddress = master.getNewLotteryAddress.call();`)
  console.log(`const lotteryContract = decypher.getContract('Lottery', lotteryAddress);`)

  console.log('\n* CHECK EVERYTHING WORKED - run this before/after adding active player  *')
  
  console.log(`lotteryContract.getActivePlayers();`)
  console.log(`decypher.balance(lotteryAddress);`)

  console.log(`lotteryContract.addActivePlayer({from: acct2, gas: 4612388, gasPrice: 5, value: web3.toWei(1, 'ether') });`)
  
  // Start repl
  require('repl').start({})