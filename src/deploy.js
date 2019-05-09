
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./Ethereum/build/RegisteredCertificate');
let util = require('util')
// const fs = require('fs-extra')


// const provider = new HDWalletProvider(
//   '7f0c51e82a244f96a0a8012e69128cd2',
//   'ropsten.infura.io/v3/5821a9542c5f4c77b455bf00b6a45d72'
// );
const provider = new Web3.providers.HttpProvider('http://localhost:8545');
const web3 = new Web3(provider);


const deploy = async () => {


  const accounts = await web3.eth.getAccounts();

  const contractInstance = new web3.eth.Contract(JSON.parse(compiledFactory.interface))

  let deploy = contractInstance.deploy({ data: '0x' + compiledFactory.bytecode })

  let promise = new Promise( (resolve, reject)=>{
    let data = {}
    deploy.send({ from: accounts[0], gas: '5000000' })
    .on('error', (error)=>{
      reject(error)
    })
    .on('transactionHash', (transactionHash)=>{
      data.transactionHash = transactionHash
      
    })
    .on('confirmation', (confirmationNumber, receipt)=>{

    })
    .on('receipt', (receipt) =>{
      
      data.receipt = receipt

      resolve(data)
    })




  })
  let returnValues = await promise

  returnValues["fromAccount"] = accounts[0]
  returnValues["compiledFactory"] = compiledFactory

  let x = await  web3.eth.getTransaction(returnValues.transactionHash)

  return returnValues

}
export {deploy};
//deploy();
