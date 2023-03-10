// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract machineusage {
    mapping(string=>uint256) public usageStore;

    function recordUsage(string memory timeStamp, string memory dayStamp, uint256 usage)public {
        usageStore[timeStamp] = usage;
        usageStore[dayStamp] += usage;
    }

    function returnUsage(string memory timeStamp) public view returns(uint256){
        return usageStore[timeStamp];
    }
}