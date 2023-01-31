// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts@4.8.1/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts@4.8.1/token/ERC721/utils/ERC721Holder.sol";

import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/draft-ERC20Permit.sol";

contract MyToken is ERC20, Ownable, ERC20Permit, ERC721Holder {
    //address of the NFT to be fractionalized
    //IERC721 public collection;

    //toked id of the NFT
    string public machineID;

    address public financierWID;

    address public manufacturerWID;


    //initialzation flag 
    bool public initialized = false;

    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    function initialize(string memory _machineID, uint256 _amount, address _financierWID, address _manufacturerWID, uint256 _finacierShare, uint256 _manufacturerShare) external onlyOwner{
        require(!initialized,"Already Initialized");
        require(_amount>0," ");
        // collection = IERC721(_collection);
        // collection.safeTransferFrom(msg.sender, address(this), _tokenId);
        // tokenId = _tokenId;
        initialized = true;
        machineID = _machineID;
        financierWID = _financierWID;
        manufacturerWID = _manufacturerWID;
        if(_amount == _finacierShare + _manufacturerShare){
            _mint(_manufacturerWID, _manufacturerShare);
            _mint(_financierWID, _finacierShare);
        }
        
    }

    function contractDetails() external view returns(string,uint256, address, address){
        return (machineID,totalSupply(), financierWID, manufacturerWID);
    }     

    function sell(uint256 _amount) external{
        _burn(msg.sender, _amount);
    }

}
