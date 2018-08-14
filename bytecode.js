const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546')
const solc = require('solc')
const path = require('path')
const Merger = require('./node_modules/sol-merger/lib/merger')

let flatten = async (filepath) => {
   let merger = new Merger();
   return await merger.processFile(filepath, true)
}

const filepath = process.argv[2]
if ( filepath == undefined ) {
   console.log("You didn't specify a path to a solidity file")
   process.exit(0)
}

// Extract file name from filepath
const filename = filepath.match(/[\w-]+\.sol/).toString()

flatten( process.argv[2] ).then( content => {
   const contractArgs = process.argv.slice(3)

   // Compile
   let input    = { [filename] : content }
   let compiled = solc.compile({ sources: input })
   // Used to reference compiled contract
   let contractKey = filename + ':' + filename.substring(0, filename.length-4)

   // Log compile errors/warnings
   console.log(compiled.errors)

   // Generate a web3 contract object from the compilation
   const abi      = JSON.parse( compiled.contracts[ contractKey ].interface )
   const bytecode = compiled.contracts[ contractKey ].bytecode
   const contract = web3.eth.contract( abi )

   // Create deployable bytecode with constructor parameters
   console.log( contract.new.getData(
      contractArgs[0],
      { data: bytecode }
   ) )
})
