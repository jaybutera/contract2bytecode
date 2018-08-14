Example usage:

BurnableStakeBank is a contract that imports multiple contracts from other files. The program flattens the solidity file
so that all contracts exist in one file, then compiles and encodes the single constructor parameter which is specified
as a command line argument.

```
node bytecode.js ./contracts/BurnableStakeBank.sol 0x00000000000000000000000000000044
```
