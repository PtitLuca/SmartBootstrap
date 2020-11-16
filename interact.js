const getAccounts = async (web3) => {
  return await web3.eth.getAccounts();
};
const getMessage = async (contract) => {
  return await contract.methods.message().call();
};
const setMessage = async (contract, web3, newMessage) => {
  const accounts = await getAccounts(web3);
  return await contract.methods.setMessage(newMessage).send({ from: accounts[0] });
};

module.exports = {
  getAccounts,
  getMessage,
  setMessage,
}