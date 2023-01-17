// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract store{

    mapping (address => bytes32) public dataStore;


    event userStore(
        address userWalletAddress
    );

    function set(address walletAddress, bytes32 dataHash ) public{
        dataStore[walletAddress] = dataHash;
        emit userStore(walletAddress);
    }

    function query(address walletAddress) public  returns (bytes32){
        
        //emit is used fot event stream
        emit userStore(walletAddress);
        return dataStore[walletAddress];
    }

}