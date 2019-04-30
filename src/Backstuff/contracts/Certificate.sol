pragma solidity ^0.4.22;

contract RegisteredCertificate {
    address [] public registeredCertificate;
    event ContractCreated(address contractAddress);
    
    function createCertificate(string _major, uint _units, string _fname, string _lname, string _sig_id, uint _approval_date) public {
        address newCertificate = new Certificate(msg.sender, _major, _units, _fname, _lname, _sig_id, _approval_date);
        emit ContractCreated(newCertificate);
        registeredCertificate.push(newCertificate);
    }
    
    function getDeployedCertificates() public view returns (address[]) {
        return registeredCertificate;
    }
}


contract Certificate {
    event voting(address voter, uint256 count);

    // Owner's address.
    address public owner;

    // Certificate metadata
    string public       major;
    uint public         units;
    string public       fname;
    string public       lname;
    string public       sig_id;

    // date when the certificate was assigned.
    uint public         approval_date;
    
    //vote counter
    uint256 public      vote;
    
    // receipient address
    address public receipient;

    /**
    * @dev Throws if called by any account other than the owner
    */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Constructor sets the original `owner` of the contract to the sender account, and
    * commits the certificate details to the blockchain
    */
    constructor(address _owner, string _major, uint _units, string _fname, string _lname, string _sig_id, uint _approval_date) public {
        owner = _owner;
        major = _major;
        units = _units;
        fname = _fname;
        lname = _lname;
        sig_id = _sig_id;
        approval_date = _approval_date; 
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) private pure returns (uint256 c) {
        c = a + b;
        assert(c >= a);
        return c;
    }

    /**
    * @dev addVote is a payable function that allows people to verify a certificate.
    */
    function addVote() public payable {
        vote = add(1, vote);
        emit voting(msg.sender, vote);
    }

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by voters
    */
    function collect() external onlyOwner {
        owner.transfer(address(this).balance);
    }
    

    /**
    * @dev withdraw allows the owner of the contract to withdraw all ether collected by voters
    */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    /**
    * @dev returns contract metadata in one function call, rather than separate .call()s
    */
    function getCertificateDetails() public view returns (
        address, string, uint, string, string, uint, string, uint256) {
        return (
            owner,
            major,
            units,
            fname,
            lname,
            approval_date,
            sig_id,
            vote
        );
    }
    
}