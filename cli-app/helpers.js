module.exports = class Helpers {

    balance (contract) {
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
    compileContractsAndDeployMasterContract (source, options={}) {
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
      }, options), (error, masterContract) => {})
      return deployed
  
    }

    /* 
      if 2 separate .sol files use abi from compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
    */
    compileContractsAndDeployMasterContract1File (source, options={}) {
      var source = this.loadContract('Master')

      let compiled, bytecode
      let compiledContract
      try {
        compiled = solc.compile(source);
        compiledContract = compiled["contracts"][`:Master`]
        bytecode = compiledContract["bytecode"]
      } catch (err) { console.log('ERROR in compilation, no bytecode available')}
      
      var abi = JSON.parse(compiledContract["interface"])

      var contract = global.web3.eth.contract(abi)
      var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

      var deployed = contract.new(Object.assign({
        from: global.web3.eth.accounts[0],
        data: bytecode,
        gas: gasEstimate,
        gasPrice: 5
      }, options), (error, masterContract) => {
        console.log('\nMaster Contract was deployed to testrpc and its ETHEREUM Address:\n', masterContract.address)
      })
      return deployed
    }
  
    getContract (contractName, address) {
      var source = this.loadContract(contractName)
      var compiled = solc.compile(source)
      var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
      var Contract = global.web3.eth.contract(abi)
      var contract = Contract.at(address)
      return contract
    }

    getContract1File (contractName, address) {
      var source = this.loadContract("Master")
      var compiled = solc.compile(source)
      
      compiledContract = compiled["contracts"][`:${contractName}`]
      var abi = JSON.parse(compiledContract["interface"])
      var Contract = global.web3.eth.contract(abi)
      var contract = Contract.at(address)
      return contract
    }
  
    loadContract (name) {
      var path = `./solidity/${name}.sol`
      return fs.readFileSync(path, 'utf8')
    }  

    toWei (E) { return global.web3.toWei(E, 'ether') }
  }