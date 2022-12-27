// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract simpleStorage{
    uint256 public storedData;

    function simplestorage(uint initVal) public {
        storedData = initVal;
    }

    function set(uint x) public{
        storedData = x;
    }
    function get() public view returns (uint retVal){
        return storedData;
    }

    function query() public view returns (uint retVal){
        return storedData;
    }


}