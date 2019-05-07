import web3 from '../web3';
import Certificate from '../build/Certificate.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Certificate.interface),
    address
  )
}