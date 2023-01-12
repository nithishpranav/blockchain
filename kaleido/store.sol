// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract store{
    uint256 public storedData;

    function simplestorage(uint initVal) public {
        storedData = initVal;
    }

    function set(uint x) public{
        storedData = x;
    }

    function query() public view returns (uint retVal){
        return storedData;
    }

}