// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC721/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MyToken is ERC20, Ownable, ERC20Permit, ERC721Holder {
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
