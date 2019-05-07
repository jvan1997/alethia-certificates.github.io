
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

  console.log(`web3 is ${util.inspect(web3)}`)

  console.log("Starting to deploy...");
  console.log(`web3.eth.getAccounts ${web3.eth.getAccounts}`)
  // web3.eth.getAccounts().then(console.log)
  const accounts = await web3.eth.getAccounts();
  console.log(`accounts is ${accounts}`)


  console.log("Attempting to deploy from account", accounts[0]);


  const contractInstance = new web3.eth.Contract(JSON.parse(compiledFactory.interface))

  let deploy = contractInstance.deploy({ data: '0x' + compiledFactory.bytecode })
  console.log(deploy)

  let promise = new Promise( (resolve, reject)=>{
    let data = {}
    deploy.send({ from: accounts[0], gas: '5000000' })
    .on('error', (error)=>{
      reject(error)
    })
    .on('transactionHash', (transactionHash)=>{
      console.log(`transactionHash is ${transactionHash}`)
      data.transactionHash = transactionHash
      
    })
    .on('confirmation', (confirmationNumber, receipt)=>{
      console.log(confirmationNumber)
      console.log(receipt)
    })
    .on('receipt', (receipt) =>{
      console.log(`receipt is ${util.inspect(receipt)}`)
      
      data.receipt = receipt

      resolve(data)
    })




  })
  let returnValues = await promise

  returnValues["fromAccount"] = accounts[0]
  returnValues["compiledFactory"] = compiledFactory
  console.log(returnValues)

  let x = await  web3.eth.getTransaction(returnValues.transactionHash)
  console.log(x)

  return returnValues

}
export {deploy};
//deploy();
