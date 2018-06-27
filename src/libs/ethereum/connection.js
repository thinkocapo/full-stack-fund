// try module.exports = class Ethereum {  
import web3 from 'web3'
import MasterContract from './MasterContract.json'
console.log('MASTERCONTRACT INTERFACE ABI...', MasterContract.abi)

let web3js
// The browser must run ethereum.js because the browser is connected to Metamask
// If Node runs ethereum.js then it won't find Metamask you run it as a node.js script then .currentProvider won't find the browser
export default class Ethereum {
    constructor() {
        const self = this
        this.state = {
            masterContractAddress: '0xb92c3bb14d63c5c7240c9ce87caf1c85d91a90cd'
        }
        window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') {
                console.log('CONNECTING TO METAMASK via window.web3.currentProvider...', window.web3.currentProvider)
                web3js = new web3(window.web3.currentProvider);
                self.setMasterContract()
            } else {
              console.log('constructor web3js no metamask...fallback', web3js)
              web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545"));
              // Prompt User telling them to get Metamask - modal or set something in redux, have it display from a Component // None of mastercontract/lottery invocations will work, because this geth node doesn't ahve user's private keys innported
              // this.setMasterContract()...
            }
            return web3js
        }) 
    }

    /*
        Serve the MasterContract's ABI (Application Binary Interface) interface to user in the front-end,
        So user can use it with web3 to get the MasterContract and call methods on it
        var source = this.loadContract(contractName) // NO, because end user can't load .sol off their local filesystem.
        var compiled = solc.compile(source) // NO, we don't want them to have to compile on their system
        var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"]) // NO, rather, import it from .json file
    */
    setMasterContract () {
        console.log('state masterContract address......', this.state)
        let Contract = web3js.eth.contract(MasterContract.abi)
        var contract = Contract.at(this.state.MasterContractAddress) 
        
        console.log('MASTERCONTRACT retrieved and set and it is...', contract) // contract.address NULL
        // maybe the ABI being passed in is incorrect?

        // contract.createLottery(1, 10, { gas: 4612388, gasPrice: 5, value: 100000000000 }) // errors, "invalid address"
        // set it on state???
        return contract
    }
    
    // TODO Response from a Back-end will have a Master Contract Address e.g. 0xf9249d8e68d571a97d107320e0ccce38c048d0d0
    // No JSX rendering, so don't use React Components (neither Dumb nor Smart Components)
    
    // TODO move to user-methods.js
    placeBet ({ etherBet, numPlayers }) {
        console.log('placeBet...param', {etherBet, numPlayers})
        console.log('masterContractAaddress...', this.state.masterContractAddress) // or entire contract provided in response? NO, should only give address, and to a CALL to get it...
        if (this.validInput(etherBet, numPlayers)) {
            console.log('call web3...', web3)
            // ignore the params for now...
            // MasterContract on state, call it?
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

    // toWei (E) { return global.web3.toWei(E, 'ether') }

    validInput (etherBet, numPlayers) {
        return typeof etherBet === 'number' && typeof numPlayers === 'number' && etherBet > 0 && numPlayers > 0 && numPlayers % 1 === 0
    }    
}