const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const provider = new HDWalletProvider(process.env.MMEMONIC, process.env.INFURA_ENDPOINT);
const web3 = new Web3(provider);

async function deploy(contractName, initalArgs) {
  const abi = require(`./out/${contractName}-abi.json`);
  const bytecode = require(`./out/${contractName}-bytecode.json`);
  const accounts = await web3.eth.getAccounts();
  const contract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode.object, arguments: initalArgs })
    .send({ from: accounts[0], gas: 1000000 });

  console.info('Contract deployed to address : ', contract.options.address);
}

deploy('Inbox', ['Hello world !']).then(() => {
  console.info('Exiting now');
  process.exit(0);
});