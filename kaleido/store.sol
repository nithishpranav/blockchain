// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract store{

    mapping (address => bytes32) public dataStore;

    function set(address walletAddress, bytes32 dataHash ) public{
        dataStore[walletAddress] = dataHash;
    }

    function query(address walletAddress) public view returns (bytes32){
        return dataStore[walletAddress];
    }

}