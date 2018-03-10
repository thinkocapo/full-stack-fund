pragma solidity ^0.4.4;
contract HelloWorld {
    function displayMessage() constant returns (string) {
        return "Hello from a smart contract";
    }
}

// paste in var source = `contract HelloWorld {...}`

/**
1. compile to bytcode
var compiled = solc.compile(source)

> for (var key in compiled) { console.log(key) }
contracts
errors
sourceList
sources

compiled.contracts.HelloWorld vs compiled.contracts[':HelloWorld']

compiled.contracts[':HelloWorld'].bytecode works

bytecode is what we're actually deploying

compiled.contracts[':HelloWorld'].opcodes <-- 1-to-1 mapping to the ^^ bytcode. e.g. 56 bytcode, is JUMP opcode

ABI
> compiled.contracts.HelloWorld.interface

var abi = JSON.parse(compiled.contracts.HelloWorld.interface)

(web3.eth and web3.eth.Contract in web3js.readthedocs.io)

The thing you'll use to deploy:
var helloWorldContract = web3.eth.contract(abi) // DEPRECATED? https://github.com/ethereum/wiki/wiki/JavaScript-API
var helloWorldContract = new web3.eth.Contract(abi) // WORKS http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html

var deployed = helloWorldContract.new({
    from: web3.eth.accounts[0], // *
    data: compiled.contracts.HelloWorld.bytecode,
    gas: // use remix to get estimated gas price
})
but...
Remix giving error when I paste the HelloWorld.sol there:
browser/ballot.sol:3:5: Warning: No visibility specified. Defaulting to "public".
    function displayMessage() constant returns (string) {
    ^ (Relevant source part starts here and spans across multiple lines).

var deployed = helloWorldContract.new({
    from: web3.eth.accounts[0], // *
    data: compiled.contracts.HelloWorld.bytecode,
    gas: 4700000,
    gasPrice: 5
}, (error, contract) => {

})


9:51p
ITS .DEPLOY NOT .NEW
var deployed = helloWorldContract.deploy({
    from: '0x16640C7481ee9e5F5f3FDD5b5ec1E7CBc5c8CD7C',
    data: compiled.contracts.HelloWorld.bytecode,
    gas: 4700000,
    gasPrice: 5
}, (error, contract) => { 
    if (error) {
        console.log('ERROR\n', error)
    } else {
        console.log('CONTRACT DEPLOYED\n', contract)
    }
})
^^ can't do deployed.address so try:

// web3.readthedocs.io
// WORKS, node.js console was very picking about pasting in text, indentations etc.
// adding var d = .... didn't make this available as a reference to the deployed contract
helloWorldContract.deploy({
    data: compiled.contracts.HelloWorld.bytecode,
}).send({
    from: '0x16640C7481ee9e5F5f3FDD5b5ec1E7CBc5c8CD7C',
    gas: 4700000,
    gasPrice: 5
}, function(error, transactionHash){ console.log('transactionHash:', transactionHash) }).on('error', function(error){  }).on('transactionHash', function(transactionHash){ console.log('transactionHash', transactionHash) }).on('receipt', function(receipt){
   console.log('receipt.contractAddress', receipt.contractAddress)
}).on('confirmation', function(confirmationNumber, receipt){ }).then(function(newContractInstance){
    console.log('newContractInstance.options.address', newContractInstance.options.address)
})

Log (ganache-cli):
Transaction: 0xc5949096ce884876b434378082004133c3aca0c82cd03d6468796524b469cb92
Contract created: 0x815ff824ba2ca00ed2e538c11df3a2d6f8d37321
Gas usage: 143492
Block Number: 4
Block Time: Fri Mar 09 2018 22:22:34 GMT-0500 (EST)

Log (Node)
> transactionHash: 0x0605cb91e573006a5e983a9f83027f17e50fe5c6056e29c62bdab961cbd08595
transactionHash 0x0605cb91e573006a5e983a9f83027f17e50fe5c6056e29c62bdab961cbd08595
receipt.contractAddress 0xd9315B46009cAf8db1CC5fa1dD3bEf728a6b74F5
newContractInstance.options.address 0xd9315B46009cAf8db1CC5fa1dD3bEf728a6b74F5


// MULTIPLE THINGS TO DO WITH .DEPLOY
http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html

// hmmmm
> web3.eth.getTransaction('0x0605cb91e573006a5e983a9f83027f17e50fe5c6056e29c62bdab961cbd08595f').then(console.log)
Promise {
  _bitField: 0,
  _fulfillmentHandler0: undefined,
  _rejectionHandler0: undefined,
  _promise0: undefined,
  _receiver0: undefined }
> null
>


How to get the reference to the deployed contract on the network???

// TRY - nope, did not help
var dep = helloWorldContract.deploy({
    data: compiled.contracts.HelloWorld.bytecode,
})
dep.send({
    from: '0x16640C7481ee9e5F5f3FDD5b5ec1E7CBc5c8CD7C',
    gas: 4700000,
    gasPrice: 5
}, function(error, transactionHash){ console.log('transactionHash:', transactionHash) }).on('error', function(error){  }).on('transactionHash', function(transactionHash){ console.log('transactionHash', transactionHash) }).on('receipt', function(receipt){
   console.log('receipt.contractAddress', receipt.contractAddress)
}).on('confirmation', function(confirmationNumber, receipt){ }).then(function(newContractInstance){
    console.log('newContractInstance.options.address', newContractInstance.options.address)
})
dep.address
undefined


// TRY - for getting reference to the deployed contract - doesn't give any value to myNewContractInstance
var myNewContractInstance = helloWorldContract.deploy({
    data: compiled.contracts.HelloWorld.bytecode,
}).send({
    from: '0x16640C7481ee9e5F5f3FDD5b5ec1E7CBc5c8CD7C',
    gas: 4700000,
    gasPrice: 5
}, function(error, transactionHash){ console.log('transactionHash:', transactionHash) }).on('error', function(error){  }).on('transactionHash', function(transactionHash){ console.log('transactionHash', transactionHash) }).on('receipt', function(receipt){
   console.log('receipt.contractAddress', receipt.contractAddress)
}).on('confirmation', function(confirmationNumber, receipt){ }).then(function(newContractInstance){
    console.log('=== newContractInstance ===', newContractInstance)
})

// WORKS !!!!!!
let contractInstance
helloWorldContract.deploy({
    data: compiled.contracts.HelloWorld.bytecode,
}).send({
    from: '0x16640C7481ee9e5F5f3FDD5b5ec1E7CBc5c8CD7C',
    gas: 4700000,
    gasPrice: 5
}, function(error, transactionHash){ console.log('transactionHash:', transactionHash) }).on('error', function(error){  }).on('transactionHash', function(transactionHash){ console.log('transactionHash', transactionHash) }).on('receipt', function(receipt){
   console.log('receipt.contractAddress', receipt.contractAddress)
}).on('confirmation', function(confirmationNumber, receipt){ }).then(function(newContractInstance){
    contractInstance = newContractInstance
    console.log('=== newContractInstance address ===', newContractInstance.options.address)
})
> contractInstance._address
'0x2a4EE4edab20Cc796f0b019c618ce194ff1D426D'



> helloWorldContract.at('0x2a4EE4edab20Cc796f0b019c618ce194ff1D426D') // in video he passes '_' what is right value?
TypeError: helloWorldContract.at is not a function
// ^^ NEED research how deployed contract reference can be used...


// WORKS!!!!!!!!
> contractInstance.methods.displayMessage().call().then(console.log)
Promise {
  _bitField: 0,
  _fulfillmentHandler0: undefined,
  _rejectionHandler0: undefined,
  _promise0: undefined,
  _receiver0: undefined }
> Hello from a smart contract

// understand the .call parameters:
options - Object (optional): The options used for calling.
from - String (optional): The address the call “transaction” should be made from.


 */