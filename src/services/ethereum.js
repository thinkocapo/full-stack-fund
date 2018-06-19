// move all config to a .env file
// Import web3 object in all React javascript files that need it?
// try module.exports = class Ethereum {  
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

    // web3, Master Contract - same things as setup.js did. note - pasted the helper methods into this Class so no need for new Helpers()
    // const helpers = new Helpers()
    // let masterContract = helpers.compileContractsAndDeployMasterContract1File()
    // use componentWillMount type functions?
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
            // value: web3.toWei(1, 'ether')
        }, options), (error, masterContract) => {}) // masterContract.address
        return deployed
    }

    // if 2 separate .sol files use abi from compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
    compileContractsAndDeployMasterContract1File (source, options={}) {
        var source = this.loadContract('Master')

        let compiled, bytecode
        let compiledContract
        try {
            compiled = solc.compile(source);
            compiledContract = compiled["contracts"][`:Master`]
            // console.log('....compiled MasterContract.sol 1File....', compiledContract)
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
            // value: web3.toWei(1, 'ether')
        }, options), (error, masterContract) => {}) // masterContract.address
        return deployed
    }

    // TODO get abi from the MasterContract(?) that has all, {source: input} ?
    // Contract.at(address) because multiple lottery contracts will get made, meaning multiple addresses with same abi code
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

    compileAndDeployCoinFlipOracleContract (options = {}) {
        var input = {
            'CoinFlipOracle.sol': this.loadContract('CoinFlipOracle'),
            'oraclizeAPI.sol': this.loadContract('oraclizeAPI')
        };
        
        let compiled, contractName, bytecode
        try {
            compiled = solc.compile({sources: input}, 1);
            contractName = 'CoinFlipOracle'
            bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
        } catch (err) { console.log('ERROR in compilation....')}
        
        var abi = JSON.parse(compiled["contracts"][`${contractName}.sol:${contractName}`]["interface"])
        var contract = global.web3.eth.contract(abi)
        var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

        var deployed = contract.new(Object.assign({
            from: global.web3.eth.accounts[0],
            data: bytecode,
            gas: gasEstimate,
            gasPrice: 5
            // value: web3.toWei(1, 'ether')
        }, options), (error, masterContract) => {})
        return deployed
    }

    compileAndDeployCoinFlipOracleContract1File (options ={}) {
        var source = this.loadContract('CoinFlipOracle')

        let compiled, contractName, bytecode
        let compiledContract
        try {
            compiled = solc.compile(source);
            console.log('....compiled compileAndDeployCoinFlipOracleContract1File....compiled\n', compiled)
            
            contractName = 'CoinFlipOracle'
            compiledContract = compiled["contracts"][`:${contractName}`]
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
            // value: web3.toWei(1, 'ether')
        }, options), (error, masterContract) => {}) // masterContract.address
        return deployed
    }
}