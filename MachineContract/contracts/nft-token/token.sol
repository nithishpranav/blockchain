// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
import "./@openzeppelin/contracts@4.8.1/token/ERC20/extensions/ERC20Burnable.sol";
import "./@openzeppelin/contracts@4.8.1/access/Ownable.sol";


contract MyToken is ERC20, Ownable {

    string public machineID;

    address public financierWID;

    address public manufacturerWID;

    address public contractAddress;




    //initialzation flag 
    bool public initialized = false;

    constructor() ERC20("MyToken", "MTK") {}

    function initialize(string memory _machineID, uint256 _amount, address _financierWID, address _manufacturerWID, uint256 _finacierShare, uint256 _manufacturerShare, address _contractAddress) external onlyOwner{
        require(!initialized,"Already Initialized");
        require(_amount>0," ");
        initialized = true;
        machineID = _machineID;
        financierWID = _financierWID;
        manufacturerWID = _manufacturerWID;
        contractAddress = _contractAddress;
        if(_amount == _finacierShare + _manufacturerShare){
            _mint(_manufacturerWID, _manufacturerShare);
            _mint(_financierWID, _finacierShare);
        }
        else{
            revert("amount not equal to sum of shares");
        }
    }

    function contractDetails() external view returns(string memory,uint256, address, address, address) {
        return (machineID,totalSupply(), financierWID, manufacturerWID, contractAddress);
    }     

    function sell(uint256 _amount) external{
        _burn(msg.sender, _amount);
    }

}

