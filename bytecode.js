const fs   = require('fs')
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546')
const solc = require('solc')
const path = require('path')
const Merger = require('./node_modules/sol-merger/lib/merger')
const util = require('util')

const write = util.promisify( fs.writeFile )

let flatten = async (filepath) => {
   let merger = new Merger();
   return await merger.processFile(filepath, true)
}

filepath = process.argv[2]
if ( filepath == undefined ) {
   console.log("You didn't specify a path to a solidity file")
   process.exit(0)
}
flatten( process.argv[2] ).then( content => {
   //fs.writeFile('./tmp.sol', content, 
   // Write flattened file to compile
   //await write('./tmp.sol', content)

   // Compile
   let input    = { 'TokenRegistry.sol' : content }
   let compiled = solc.compile({ sources: input }, 1)
   //let compiled = solc.compile(input, 1)
   console.log(compiled.contracts)

   let abi = JSON.parse( compiled.contracts['TokenRegistry.sol:TokenRegistry'].interface )
   let tr = new web3.eth.Contract(
      abi,
      "0x0000000000000000000000000000000000000044", // Contract address
   )
   console.log( compiled.contracts['TokenRegistry.sol:TokenRegistry'].bytecode )
})

/*
let input = {
   'TokenRegistry.sol' : fs.readFileSync('../validator-contracts/contracts/TokenRegistry.sol'),
}
let compiled = solc.compile({ sources: input })
*/

//let bsbJsonInterface = JSON.parse( fs.readFileSync('../validator-contracts/build/contracts/BurnableStakeBank.json') )
//let trJsonInterface  = JSON.parse( fs.readFileSync('./build/contracts/TokenRegistry.json') )

/*
let bsb = new web3.eth.Contract(
   bsbJsonInterface,
   "0x0000000000000000000000000000000000000043", // Contract address
)
*/
/*
let abi = JSON.parse( compiled.contracts[':TokenRegistry'].interface )
let tr = new web3.eth.Contract(
   abi,
   "0x0000000000000000000000000000000000000044", // Contract address
)
console.log('BYTECODE')
console.log( compiled.contracts[':TokenRegistry'].bytecode )

let trInstance = contract.new(
   [tr.address],
   {
      data: '0x608060405260008054600160a060020a031916331790556102f8806100256000396000f3006080604052600436106100775763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631d1a696d811461007c57806321f8a721146100a85780638da5cb5b146100dc578063904194a3146100f1578063de55701e14610109578063f2fde38b1461012f575b600080fd5b34801561008857600080fd5b50610094600435610150565b604080519115158252519081900360200190f35b3480156100b457600080fd5b506100c060043561017d565b60408051600160a060020a039092168252519081900360200190f35b3480156100e857600080fd5b506100c06101bc565b3480156100fd57600080fd5b506100c06004356101cb565b34801561011557600080fd5b5061012d600435600160a060020a03602435166101e6565b005b34801561013b57600080fd5b5061012d600160a060020a0360043516610238565b600081815260016020526040812054600160a060020a031615610174576001610177565b60005b92915050565b600081815260016020526040812054600160a060020a031615156101a057600080fd5b50600090815260016020526040902054600160a060020a031690565b600054600160a060020a031681565b600160205260009081526040902054600160a060020a031681565b600054600160a060020a031633146101fd57600080fd5b600091825260016020526040909120805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03909216919091179055565b600054600160a060020a0316331461024f57600080fd5b600160a060020a038116151561026457600080fd5b60008054604051600160a060020a03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820211fe30992239462c9901613e620c049190bf6b2f6c469da3c5e0b8a537968cf0029',
   }
)
*/
/*
let contractInstance = contract.new(
   [tr.address],
   {
      data: '',
   }
)
*/
