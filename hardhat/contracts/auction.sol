// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

interface INFT {
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

    function getStartingPrice(uint256 tokenId) external view returns (uint256);

    function mint(address to, uint256 tokenId) external;

    function supplyStats() external pure returns (supply memory stats);

    function increaseAuctionedSupply() external;
}

contract Auction is ReentrancyGuard, Ownable, AutomationCompatibleInterface {
    enum auctionState {
        NotStarted,
        Running,
        Ended,
        Unsold
    }

    struct bid {
        uint256 id;
        uint256 tokenId;
        uint256 value;
        uint256 timestamp;
        address bidder;
    }

    struct auction {
        uint256 id;
        uint256 tokenId;
        uint256 startTime;
        uint256 endTime;
        bid highestBid;
        auctionState state;
        uint256 minBid;
        address winner;
        uint256 startingPrice;
    }

    INFT public nftContract;

    uint256 internal bidCounter;
    uint256 internal auctionCounter;
    uint32 internal minBidIncrementalPercentage = 5;
    uint256[4] public activeAuctionsTokenIds;

    mapping(address => bid[]) public clientBidList;
    mapping(uint256 => auction) public tokenAuction;
    auction[] public unsoldAuctions;

    event AuctionStarted(uint256 indexed tokenId, uint256 timestamp);

    event NewBidPlaced(
        address indexed bidder,
        uint256 indexed tokenIdTarget,
        uint256 newBid,
        uint256 timestamp
    );

    event Withdraw(uint256 amount);

    event AuctionsClosed(
        uint256 indexed tokenId,
        address indexed winner,
        uint256 timestamp
    );

    event BoughtUnsoldNFT(
        uint256 indexed tokenId,
        address indexed user,
        uint256 timestamp
    );

    constructor(address _nftAddress) Ownable(msg.sender) {
        nftContract = INFT(_nftAddress);
        uint256[4] memory tokenIds = getRandomTokenIds();
        startAuctions(tokenIds);
    }

    function getRandomTokenIds() public view returns (uint256[4] memory) {
        uint256[4] memory tokenIds;
        uint8 count = 0;
        uint256 seed = 0;
        require(
            nftContract.supplyStats().auctionedSupply <= 244,
            "All auctions completed"
        );
        while (count < 4) {
            uint256 randomTokenId = (uint256(
                keccak256(abi.encodePacked(block.timestamp, seed))
            ) % nftContract.supplyStats().total) + 1;

            bool alreadySelected = false;
            for (uint8 j = 0; j < count; j++) {
            if (tokenIds[j] == randomTokenId) {
                alreadySelected = true;
                break;
            }
        }

            if (alreadySelected == false && tokenAuction[randomTokenId].state == auctionState.NotStarted) {
                tokenIds[count] = randomTokenId;
                count++;
            }

            seed++;
        }

        return tokenIds;
    }

    function getUserBids(
        address userAddress
    ) public view returns (bid[] memory) {
        return clientBidList[userAddress];
    }

    function getUnsoldldAuctions() external view returns (auction[] memory) {
        return unsoldAuctions;
    }

    function withdrawAll() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: contractBalance}("");
        require(success, "Withdraw failed");
        emit Withdraw(contractBalance);
    }

    function startAuctions(uint256[4] memory tokenIds) public {
        for (uint8 i = 0; i < tokenIds.length; i++) {
            require(
                tokenAuction[tokenIds[i]].state == auctionState.NotStarted,
                "A selected token has an auction active or ended"
            );

            auctionCounter++;
            tokenAuction[tokenIds[i]] = auction(
                auctionCounter,
                tokenIds[i],
                block.timestamp,
                block.timestamp + 7 days,
                bid(bidCounter, tokenIds[i], 0, 0, address(0)),
                auctionState.Running,
                0,
                address(0),
                nftContract.getStartingPrice(tokenIds[i])
            );

            activeAuctionsTokenIds[i] = tokenIds[i];
            emit AuctionStarted(tokenIds[i], block.timestamp);
        }
    }

    function placeBid(uint256 tokenId) external payable nonReentrant {
        auction storage onBiddignAuction = tokenAuction[tokenId];
        uint256 startingPrice = nftContract.getStartingPrice(tokenId);

        require(
            onBiddignAuction.state == auctionState.Running,
            "Auction on this token isn't running"
        );

        require(block.timestamp < onBiddignAuction.endTime, "Auction ended");

        require(
            msg.sender != onBiddignAuction.highestBid.bidder,
            "You already have the highest bid"
        );
        require(
            msg.value >= startingPrice,
            "Bid must be equal or superior to starting price"
        );
        require(
            msg.value >= onBiddignAuction.highestBid.value,
            "Bid proposed isn't superior to highest bid"
        );

        if (onBiddignAuction.highestBid.value >= 0) {
            require(
                msg.value >= onBiddignAuction.minBid,
                "Bid proposed must be above minimal bid"
            );
            onBiddignAuction.minBid =
                msg.value +
                (msg.value * minBidIncrementalPercentage) /
                100;

            address oldBidder = onBiddignAuction.highestBid.bidder;
            uint256 oldBid = onBiddignAuction.highestBid.value;

            if (oldBid > 0) {
                (bool success, ) = payable(oldBidder).call{value: oldBid}("");
                require(success);
            }
        }

        bidCounter++;

        onBiddignAuction.highestBid = bid(
            bidCounter,
            tokenId,
            msg.value,
            block.timestamp,
            msg.sender
        );
        clientBidList[msg.sender].push(onBiddignAuction.highestBid);

        emit NewBidPlaced(msg.sender, tokenId, msg.value, block.timestamp);
    }

    function endAuctions(uint256[4] memory tokenIds) public {
        require(
            block.timestamp >= tokenAuction[tokenIds[0]].endTime,
            "Auctions not expired yet"
        );

        for (uint8 i = 0; i < tokenIds.length; i++) {
            auction storage onEndingAuction = tokenAuction[tokenIds[i]];

            if (onEndingAuction.highestBid.value > 0) {
                onEndingAuction.state = auctionState.Ended;
                onEndingAuction.winner = onEndingAuction.highestBid.bidder;
                nftContract.mint(
                    onEndingAuction.winner,
                    onEndingAuction.tokenId
                );
            } else {
                onEndingAuction.state = auctionState.Unsold;
                unsoldAuctions.push(onEndingAuction);
            }
            nftContract.increaseAuctionedSupply();

            emit AuctionsClosed(
                onEndingAuction.tokenId,
                onEndingAuction.winner,
                block.timestamp
            );
        }

        delete activeAuctionsTokenIds;
    }

    function buyUnsold(uint256 tokenId) external payable nonReentrant {
        auction storage onBuyingUnsold = tokenAuction[tokenId];
        require(
            onBuyingUnsold.state == auctionState.Unsold,
            "Token selected ins't unsold"
        );

        uint256 price = nftContract.getStartingPrice(tokenId);
        require(msg.value >= price, "Offer isn't superior to price requested");

        onBuyingUnsold.state = auctionState.Ended;
        onBuyingUnsold.winner = msg.sender;

        nftContract.mint(msg.sender, tokenId);

        uint256 refund = msg.value - price;
        if (refund > 0) {
            (bool success, ) = payable(msg.sender).call{value: refund}("");
            require(success);
        }

        emit BoughtUnsoldNFT(tokenId, msg.sender, block.timestamp);
    }

    function checkUpkeep(
        bytes calldata checkData
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        if (activeAuctionsTokenIds[0] == 0) {
            upkeepNeeded = false;
        } else {
            bool isTimeToEndAuctions = block.timestamp >=
                tokenAuction[activeAuctionsTokenIds[0]].endTime;
            upkeepNeeded = isTimeToEndAuctions;
        }

        performData = abi.encode(upkeepNeeded);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        if (activeAuctionsTokenIds[0] != 0) {
            endAuctions(activeAuctionsTokenIds);
        }

        uint256[4] memory newTokenIds = getRandomTokenIds();

        startAuctions(newTokenIds);
    }
}
