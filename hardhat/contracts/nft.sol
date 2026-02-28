// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721, Ownable {
    using Strings for uint256;

    struct rarityStats {
        uint256 supply;
        uint256 availableSupply;
        uint256 startingPrice;
    }

    struct supply {
        uint256 total;
        uint256 auctionedSupply;
        rarityStats Common;
        rarityStats Uncommon;
        rarityStats Rare;
        rarityStats Epic;
        rarityStats Legendary;
    }

    supply public supplyStats;
    address public auctionContract;

    constructor(
        uint256 basePrice
    ) ERC721("DnA NFTs Collection", "DnA") Ownable(msg.sender) {
        require(basePrice > 0, "Invalid price");

        supplyStats.total = 1196;

        supplyStats.Common = rarityStats(598, 598, basePrice);
        supplyStats.Uncommon = rarityStats(300, 300, basePrice * 2);
        supplyStats.Rare = rarityStats(175, 175, basePrice * 4);
        supplyStats.Epic = rarityStats(75, 75, basePrice * 8);
        supplyStats.Legendary = rarityStats(48, 48, basePrice * 16);
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://bafybeias6q3afmfifj4cbxbamvhil2aczjb2mdqrs25ht2xtcrhmjcd22e.ipfs.w3s.link/";
    }

    function externalBaseURI() external pure returns (string memory) {
        return _baseURI();
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);

        return getTokenURIFromId(tokenId);
    }

    function getTokenURIFromId(
        uint256 tokenId
    ) public pure returns (string memory) {
        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string.concat(baseURI, tokenId.toString(), ".json")
                : "";
    }

    function setAuctionContract(address newAuctionAddress) external onlyOwner {
        require(newAuctionAddress != address(0), "Zero address not allowed");
        auctionContract = newAuctionAddress;
    }

    function getStartingPrice(uint256 tokenId) external view returns (uint256) {
        rarityStats memory stats = _getRarityStats(tokenId);
        return stats.startingPrice;
    }

    function mint(address to, uint256 tokenId) external {
        require(msg.sender == auctionContract, "Not authorized");
        rarityStats storage stats = _getRarityStats(tokenId);
        stats.availableSupply--;
        _safeMint(to, tokenId);
    }

    function _getRarityStats(
        uint256 tokenId
    ) internal view returns (rarityStats storage stats) {
        require(tokenId > 0 && tokenId <= 1196, "Invalid TokenId");

        if (tokenId > 598) return supplyStats.Common;
        if (tokenId > 298) return supplyStats.Uncommon;
        if (tokenId > 123) return supplyStats.Rare;
        if (tokenId > 48) return supplyStats.Epic;
        return supplyStats.Legendary;
    }

    function decreaseAuctionedSupply() external {
    require(msg.sender == auctionContract, "Not authorized");
    supplyStats.auctionedSupply--;
}
}
