
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract register{

    mapping(bytes32 => address) public walletHash;

    function registerWallet(string memory _gstId, string memory _password, address _wallet) public returns(bytes32){
        
        bytes32 _hash = keccak256(abi.encode(_gstId,_password));
        walletHash[_hash] = _wallet;
        return _hash;
    } 
    
    function getUser(string memory _gstId, string memory _password) public view returns(address){
        bytes32 _hash = keccak256(abi.encode(_gstId,_password));

        return walletHash[_hash];
    }
    
}
