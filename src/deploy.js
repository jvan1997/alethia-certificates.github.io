const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CertificateRegistry.json');
const fs = require('fs-extra')

const provider = new HDWalletProvider(
  '7f0c51e82a244f96a0a8012e69128cd2',
  'ropsten.infura.io/v3/5821a9542c5f4c77b455bf00b6a45d72'
);

const web3 = new Web3(provider);

const deploy = async () => {
  console.log("Starting to deploy...");
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: '0x' + compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '5000000' });

  console.log(compiledFactory.interface);
  console.log('Contract deployed to', result.options.address);

}
deploy();