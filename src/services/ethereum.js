// Import web3 object in all React javascript files that need it?
// try module.exports = class Ethereum {  
// import solc from 'solc' // Module not found: Can't resolve 'module' in '/Users/WillsHome/Projects/full-stack-fund/node_modules/require-from-string'
import web3 from 'web3'
const config = {
 rpc: {
        host: "localhost",
        port: "8545"
    }
}
let web3js
// The browser must run ethereum.js because the browser is connected to Metamask
// If Node runs ethereum.js then it won't find Metamask you run it as a node.js script then .currentProvider won't find the browser
// startApp()? Have all this precede any React rendering? // use componentWillMount type functions?
export default class Ethereum {
    // web3, Master Contract - same things as setup.js did. note - pasted the helper methods into this Class so no need for new Helpers()
    // const helpers = new Helpers()
    // let masterContract = helpers.compileContractsAndDeployMasterContract1File()
    constructor() {
        window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') {
                console.log('CONNECTING TO METAMASK via window.web3.currentProvider...', window.web3.currentProvider)
                web3js = new web3(window.web3.currentProvider);
            } else {
              // fallback() - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail) * but localnode/hosted node won't have user's private keys, so this line is only for dev testing?
              console.log('constructor web3js no metamask...', web3js)
              web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
              // Prompt User telling them to get Metamask - modal or set something in redux, have it display from a Component
              // Non of mastercontract/lottery invocations will work, because this geth node doesn't ahve user's private keys innported
            }
        })
    }

    placeBet ({ etherBet, numPlayers }) {
        console.log('placeBet...param', {etherBet, numPlayers})
        if (this.validInput(etherBet, numPlayers)) {
            console.log('call web3...', web3)
            // ignore the params for now...
            // web3...
        } else { return }
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

    validInput (etherBet, numPlayers) {
        return typeof etherBet === 'number' && typeof numPlayers === 'number' && etherBet > 0 && numPlayers > 0 && numPlayers % 1 === 0
    }
    
    /**
     * Multiple contracts referencing each other...So must compile them together
     * Compile both, but deploy once (Master)
     * compiled.contracts['MasterContract.sol:MasterContract'.bytecode]
     * compiled.contracts['Lottery.sol:Lottery'.bytecode]
     * creates all .sol abi/bytecodes and deploy contracts['MasterContract.sol:MasterContract']
     */
    // compileContractsAndDeployMasterContract (source, options={}) {
    //     var input = {
    //         'Lottery.sol': this.loadContract('Lottery'),
    //         'MasterContract.sol': this.loadContract('MasterContract')
    //     };
        
    //     let compiled, contractName, bytecode
    //     try {
    //         compiled = solc.compile({sources: input}, 1);
    //         contractName = 'MasterContract'
    //         bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
    //         console.log('....compiled Lottery.sol MasterContract.sol together successfully....')
    //     } catch (err) { console.log('ERROR in compilation, no bytecode available')}
        
    //     var abi = JSON.parse(compiled["contracts"][`${contractName}.sol:${contractName}`]["interface"])
    //     var contract = global.web3.eth.contract(abi)
    //     var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

    //     var deployed = contract.new(Object.assign({
    //         from: global.web3.eth.accounts[0],
    //         data: bytecode,
    //         gas: gasEstimate,
    //         gasPrice: 5
    //         // value: web3.toWei(1, 'ether')
    //     }, options), (error, masterContract) => {}) // masterContract.address
    //     return deployed
    // }

    // if 2 separate .sol files use abi from compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
    // compileContractsAndDeployMasterContract1File (source, options={}) {
    //     var source = this.loadContract('Master')

    //     let compiled, bytecode
    //     let compiledContract
    //     try {
    //         compiled = solc.compile(source);
    //         compiledContract = compiled["contracts"][`:Master`]
    //         // console.log('....compiled MasterContract.sol 1File....', compiledContract)
    //         bytecode = compiledContract["bytecode"]
    //     } catch (err) { console.log('ERROR in compilation, no bytecode available')}

    //     var abi = JSON.parse(compiledContract["interface"])
    //     var contract = global.web3.eth.contract(abi)
    //     var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

    //     var deployed = contract.new(Object.assign({
    //         from: global.web3.eth.accounts[0],
    //         data: bytecode,
    //         gas: gasEstimate,
    //         gasPrice: 5
    //         // value: web3.toWei(1, 'ether')
    //     }, options), (error, masterContract) => {}) // masterContract.address
    //     return deployed
    // }

    // TODO get abi from the MasterContract(?) that has all, {source: input} ?
    // Contract.at(address) because multiple lottery contracts will get made, meaning multiple addresses with same abi code
    // getContract (contractName, address) {
    //     var source = this.loadContract(contractName)
    //     var compiled = solc.compile(source)
    //     var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])
    //     var Contract = global.web3.eth.contract(abi)
    //     var contract = Contract.at(address)
    //     return contract
    //     }

    //     getContract1File (contractName, address) {
    //     var source = this.loadContract("Master")
    //     var compiled = solc.compile(source)
        
    //     compiledContract = compiled["contracts"][`:${contractName}`]
    //     var abi = JSON.parse(compiledContract["interface"])
    //     var Contract = global.web3.eth.contract(abi)
    //     var contract = Contract.at(address)
    //     return contract
    //     }

    //     loadContract (name) {
    //     var path = `./solidity/${name}.sol`
    //     return fs.readFileSync(path, 'utf8')
    // }  

    // toWei (E) { return global.web3.toWei(E, 'ether') }

    // compileAndDeployCoinFlipOracleContract (options = {}) {
    //     var input = {
    //         'CoinFlipOracle.sol': this.loadContract('CoinFlipOracle'),
    //         'oraclizeAPI.sol': this.loadContract('oraclizeAPI')
    //     };
        
    //     let compiled, contractName, bytecode
    //     try {
    //         compiled = solc.compile({sources: input}, 1);
    //         contractName = 'CoinFlipOracle'
    //         bytecode = compiled["contracts"][`${contractName}.sol:${contractName}`]["bytecode"]
    //     } catch (err) { console.log('ERROR in compilation....')}
        
    //     var abi = JSON.parse(compiled["contracts"][`${contractName}.sol:${contractName}`]["interface"])
    //     var contract = global.web3.eth.contract(abi)
    //     var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

    //     var deployed = contract.new(Object.assign({
    //         from: global.web3.eth.accounts[0],
    //         data: bytecode,
    //         gas: gasEstimate,
    //         gasPrice: 5
    //         // value: web3.toWei(1, 'ether')
    //     }, options), (error, masterContract) => {})
    //     return deployed
    // }

    // compileAndDeployCoinFlipOracleContract1File (options ={}) {
    //     var source = this.loadContract('CoinFlipOracle')

    //     let compiled, contractName, bytecode
    //     let compiledContract
    //     try {
    //         compiled = solc.compile(source);
    //         console.log('....compiled compileAndDeployCoinFlipOracleContract1File....compiled\n', compiled)
            
    //         contractName = 'CoinFlipOracle'
    //         compiledContract = compiled["contracts"][`:${contractName}`]
    //         bytecode = compiledContract["bytecode"]
    //     } catch (err) { console.log('ERROR in compilation, no bytecode available')}

    //     var abi = JSON.parse(compiledContract["interface"])
    //     var contract = global.web3.eth.contract(abi)
    //     var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })

    //     var deployed = contract.new(Object.assign({
    //         from: global.web3.eth.accounts[0],
    //         data: bytecode,
    //         gas: gasEstimate,
    //         gasPrice: 5
    //         // value: web3.toWei(1, 'ether')
    //     }, options), (error, masterContract) => {}) // masterContract.address
    //     return deployed
    // }

// no render() method - DUMB REACT COMPONENT not SMART REACT COMPONENT
}


// https://www.moesif.com/blog/blockchain/ethereum/Tutorial-for-building-Ethereum-Dapp-with-Integrated-Error-Monitoring/
//  Web3 first checks to see if there is a Web3 object injected already in the browser window and uses that. But if no Web3 instance was injected, Web3 tries to connect to the http://127.0.0.1/9545 a

// https://github.com/MetaMask/metamask-extension/issues/1158

// https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#partly_sunny-web3---ethereum-browser-environment-check