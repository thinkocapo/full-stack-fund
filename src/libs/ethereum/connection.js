import web3 from 'web3'
import MasterContract from './MasterContract.json'

// let web3jsX = new web3(new web3.providers.HttpProvider("http://localhost:8545"));

let web3js

/*
    The browser must run ethereum.js because the browser is connected to Metamask
    If Node runs ethereum.js then it won't find Metamask you run it as a node.js script then .currentProvider won't find the browser
    Response from a Back-end will have a Master Contract Address e.g. 0xf9249d8e68d571a97d107320e0ccce38c048d0d0
    consider re-factoring w/ module.exports = class Ethereum {  
    TODO Move placeBet to user-methods.js
*/
export default class Ethereum {
    constructor() {
        const self = this
        this.state = {
            masterContractAddress: '0x545a001dc66ecd175aa26f124b89881849e1e181'
        }
        window.addEventListener('load', function() {
            if (typeof web3 !== 'undefined') {
                console.log('CONNECTING TO METAMASK via window.web3.currentProvider...', window.web3.currentProvider)
                web3js = new web3(window.web3.currentProvider);
                self.setMasterContract()
            } else {
              console.log('constructor web3js no metamask...fallback', web3js)
              web3js = new web3(new web3.providers.HttpProvider("http://localhost:8545")); // TODO Prompt User telling them to get Metamask - modal or set something in redux, have it display from a Component // None of mastercontract/lottery invocations will work, because this geth node doesn't ahve user's private keys innported
            }
            // 07/07/2018 video does...
            // web3js = new web3(web3js)// * ??????

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
        console.log('masterContract address......', this.state.masterContractAddress)
        console.log('masterContract abi......', MasterContract.abi)

        console.log('WEB3 JS ', web3js)

        // 07/07/2018 TuffleContract()...
        let Contract = web3js.eth.contract(MasterContract.abi)
        var contract = Contract.at(this.state.MasterContractAddress) 
        // 07/07/2018 Set somewhere globally.... this.state.masterContract = contract
        // contract.deployed().then((instance) => {
        // Contract.deployed().then((instance) => {
            // console.log('contract instance...', instance)
        // })

        console.log('MASTERCONTRACT retrieved and set and it is...address', contract.address)
        
        // 07/07/2018 from Module-9 video...

        // it does web3 setup, gets contract at 1:43, uses a TruffleContract method... https://courses.consensys.net/courses/course-v1:ConsenSysAcademy+2018DP+1/courseware/4a6d952ddf7e4b14ba1245f58704b388/5fb859602a6147329d5d6c9ac65b622b/?activate_block_id=block-v1%3AConsenSysAcademy%2B2018DP%2B1%2Btype%40sequential%2Bblock%405fb859602a6147329d5d6c9ac65b622b
        // maybe only call contract.createLottery differently (signed vs unsigned raw tx) and metamask will open and handle it?


        // WEB3 TEST
        // web3js.eth.getAccounts(function (err, res) {
        //     console.log('....RES', res) // gets address account from Metamask
        // })

        // TODO
        // contract.createLottery(1, 10, { gas: 4612388, gasPrice: 5, value: 100000000000 }) // errors, "invalid address"
        // return contract
    }
    
    placeBet ({ etherBet, numPlayers }) {
        console.log('placeBet...param', {etherBet, numPlayers})
        console.log('masterContractAaddress...', this.state.masterContractAddress)
        if (this.validInput(etherBet, numPlayers)) {
            console.log('call web3...', web3)
            // Call MasterContract and/or Lottery Contract methods from here
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
}