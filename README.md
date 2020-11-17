# SmartBootstrap

## About this project

I always wanted to have a boilerplate project to start a dapp project.

So I made one. Feel free to use it !

If you want to write, test, compile and deploy a smart contract in the same place, this repository can help you.

## What can this project do ?

**Write**

Well it is your job, but there is a place for it :wink:

- You can write the smart contract in the `contracts` folder.
- It contains an Inbox contract by default.

**Test**
- You can write some tests in the `test` folder.
- It contains a set of necessary tests for the Inbox contract by default.
- You can run your tests by executing the following command :
```shell script
npm run test
```

**Compile**
- The compile script contains a set of instructions to compile a smart contract.
- You can also get the contract's ABI and bytecode.
- Run the compiler by executing the following command :
```shell script
node compile.js
```
- It will create two files in the `out` folder :
    
    `<contract_name>abi.json` and `<contract_name>bytecode.json`.

**Deploy**
- Deploying a smart contract is not an easy process. You can use Remix to do all the work for you, but actually understanding in depth the deployment will help you interact with the contract later on.
- You need to set two environment variables into a `.env` file.
    - The first one is the `INFURA_ENDPOINT` and represents the node endpoint which will receive your contract transaction.
    - The second one is the `MMEMONIC`. It will be used during the deployment to pay the transaction. Please make sure this information is private.
- Then you just have to run the following command to get the contract address. It will be usefull further to interact with the contract, but you can retrieve it using Etherscan (or any blockchain explorer).
```shell script
node deploy.js
```