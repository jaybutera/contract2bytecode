Example usage:

BurnableStakeBank is a contract that imports multiple contracts from other files. The program flattens the solidity code
so that all contracts exist in one file. The code is compiled and the single constructor parameter - specified
as a command line argument (in this case an address) - is encoded.

```
node bytecode.js ./contracts/BurnableStakeBank.sol 0x00000000000000000000000000000044
```
