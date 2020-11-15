// Retrieve the interface to interact with the contract.
const abi = require('../out/abi.json');
// Retrieve the bytecode to deploy the contract.
const bytecode = require('../out/bytecode.json');
// Ganache is used to load fake ethereum accounts.
const ganache = require('ganache-cli');
const provider = ganache.provider();
// web3 will let us query the ethereum network using a provider.
const Web3 = require('web3');
// web3 will use the ganache provider for testing purposes.
const web3 = new Web3(provider);

describe('Inbox', () => {
  let accounts = undefined;

  beforeEach(async () => {
    // Retrieve all ethereum accounts currently loaded.
    accounts = await web3.eth.getAccounts();
  });

  it('can deploy a contract', () => {

  });
});