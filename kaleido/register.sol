// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract register{

    mapping(string => address) public walletHash;

    function registerWallet(string memory _hash, address _wallet) public{
        walletHash[_hash] = _wallet;
    } 

    function getUser(string memory _hash) public view returns (address){
        return walletHash[_hash];
    }
    
}