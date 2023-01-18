// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.8.1/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/utils/ERC721Holder.sol";

import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC20/extensions/draft-ERC20Permit.sol";

contract Token is ERC20, Ownable, ERC20Permit, ERC721Holder {
    //address of the NFT to be fractionalized
    IERC721 public collection;

    //toked id of the NFT
    uint256 public tokenId;

    //initialzation flag 
    bool public initialized = false;

    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}

    function initialize(address _collection, uint256 _tokenId, uint256 _amount) external onlyOwner{
        require(!initialized,"Already Initialized");
        require(_amount>0," ");
        collection = IERC721(_collection);
        collection.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokenId = _tokenId;
        initialized = true;
        _mint(msg.sender, _amount);
    }

    function sell(uint256 _amount) external{
        _burn(msg.sender, _amount);
    }

}
