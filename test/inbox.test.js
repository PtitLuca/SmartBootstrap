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
// To make the tests.
const assert = require('assert');

const { getMessage, setMessage } = require('../interact.js');

describe('Inbox', () => {
  let accounts = undefined;
  let contract = undefined;
  let initialMsg = 'Hello World !';

  beforeEach(async () => {
    // Retrieve all ethereum accounts currently loaded.
    accounts = await web3.eth.getAccounts();

    // Deploy the contract is required to interact with it.
    contract = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode.object, arguments: [initialMsg] })
      .send({ from: accounts[0], gas: 1000000 });
  });

  it('can deploy a contract', () => {
    assert.ok(contract.options.address);
  });

  it('has a default message',async () => {
    const message = await getMessage(contract);
    assert.equal(message, initialMsg);
  });

  it('can set a new message', async () => {
    const newMessage = 'Goodbye !';
    await setMessage(contract, web3, newMessage);
    const message = await contract.methods.message().call();
    assert.equal(message, newMessage);
  });
});