// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract register{

    mapping(address => address) public walletHash;

    function registerWallet(address _hash, address _wallet) public{
        walletHash[_hash] = _wallet;
    } 

    function getUser(address _hash) public view returns (address){
        return walletHash[_hash];
    }
    
}