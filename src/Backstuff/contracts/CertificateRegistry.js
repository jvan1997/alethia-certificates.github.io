import web3 from '../web3';    // This pulls it from our web3 instance, not actual web3
import RegisteredCertificate from '../build/RegisteredCertificate.json';

const instance = new web3.eth.Contract(
  JSON.parse(RegisteredCertificate.interface),
  // This is the address of the contract factory
  //'0x7117f833A11ecFAddD3cBFbe521219b67Fe64FEb'
  '0xbd13f14efe7861c38de3e8f23b63387cf466bd8b'
);

export default instance;