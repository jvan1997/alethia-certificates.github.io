import { bytecode, abi } from './build/RegisteredCertificate.json';
import { web3 } from './web3Util.js';

const RegisteredCertificate = new web3.eth.Contract(abi);

const deploy = (value, major, units, fname, lname, sig_id) => {
    const deployParameters = {
        arguments: [major, units, fname, lname, sig_id],
        data: bytecode,
    }
    return RegisteredCertificate.deploy(deployParameters).estimateGas().then((gas) => {
        return RegisteredCertificate.deploy(deployParameters).send({
            from: depositorAddress,
            value,
            gas
        });
    })
}

export default deploy;