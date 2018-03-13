global.Web3 = require("web3")
global.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
global.solc = require('solc');
global.fs = require("fs");

// var deployed = methods.deployContract("flipper")
// console.log('RESULTS\n', {
    // compiled: compiled,
    // contractNae: contractName,
    // bytecode: bytecode,
    // abi: abi,
    // contract: contract
// })

class Methods {
    constructor() {
        this.property = 'value'
    }
    
    contractName(source) {
        var re1 = /contract.*{/g
        var re2 = /\s\w+\s/
        return source.match(re1).pop().match(re2)[0].trim()
    }
    createContract(source, options={}) {
        var compiled = solc.compile(source)
        var contractName = this.contractName(source)
        var bytecode = compiled["contracts"][`:${contractName}`]["bytecode"] // needs uppercase?
        var abi = JSON.parse(compiled["contracts"][`:${contractName}`]["interface"])

        var contract = new global.web3.eth.Contract(abi)
        
        // var gasEstimate = global.web3.eth.estimateGas({ data: bytecode })
        var gasEstimate = await web3.eth.estimateGas({
            to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
            data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
        })
        // .then(result => { return result });
        console.log('gasEstimate', gasEstimate)


        return
        // var deployed = contract.new(Object.assign({
        //   from: global.web3.eth.accounts[0],
        //   data: bytecode,
        //   gas: gasEstimate,
        //   gasPrice: 5
        // }, options), (error, result) => { })

        var deployed
        var five = 5
        return contract.deploy({
            data: bytecode
        }).send({
            from: buyer, // doesnt matter?
            gas: 4700000,
            gasPrice: 5
        }, function(error, transactionHash){ console.log('transactionHash:', transactionHash) }).on('error', function(error){  }).on('transactionHash', function(transactionHash){ console.log('transactionHash', transactionHash) }).on('receipt', function(receipt){
            console.log('receipt.contractAddress', receipt.contractAddress)
        }).on('confirmation', function(confirmationNumber, receipt){ }).then(function(newContractInstance){
            deployed = newContractInstance
            console.log('=== newContractInstance address ===', newContractInstance.options.address)
            return deployed
        })
      }
      deployContract(name, options={}) {
        var source = this.loadContract(name)
        return this.createContract(source, options)
      }
      loadContract(name) {
        var path = `./${name.toLowerCase()}.sol`
        return fs.readFileSync(path, 'utf8')
      }

}
global.methods = new Methods()

global.balance = (acct) => { return web3.eth.getBalance(acct).then(result => { var eth = web3.utils.fromWei(result.toString(), 'ether');console.log(eth)})};
global.web3.eth.getAccounts().then(accounts => { 
    global.buyer = accounts[0]; global.seller = accounts[1]; global.arbiter = accounts[2] 
    require('repl').start({})
});

