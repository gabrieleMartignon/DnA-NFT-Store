import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";
import { expect } from "chai";
import { network } from "hardhat";
const { ethers, networkHelpers } = await network.connect();

describe("Auction contract testing", function () {
  let NFT: any;
  let auction: any;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let auctionAddress: any;
  let tokenIds: number[];

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const nftContractFactory = await ethers.getContractFactory("NFT");
    const basePrice: bigint = 1000000000n;
    NFT = await nftContractFactory.deploy(basePrice);
    await NFT.waitForDeployment();

    const auctionContractFactory = await ethers.getContractFactory("Auction");
    auction = await auctionContractFactory.deploy(await NFT.getAddress());
    await auction.waitForDeployment();

    auctionAddress = auction.target;

    await NFT.setAuctionContract(auctionAddress);

    tokenIds = [1, 50, 200, 1000];
  });

  it("Should revert if one of the token has an auction running or ended", async function () {
    await auction.startAuctions(tokenIds);
    tokenIds = [1, 20, 30, 40];
    expect(auction.startAuctions(tokenIds)).revertedWith("A selected token has an auction active or ended");
  });

  it("Should start auctions properly", async function () {
    await auction.startAuctions(tokenIds);
    for (let i = 0; tokenIds.length > i; i++) {
      let auctionData = await auction.tokenAuction(tokenIds[i]);
      expect(auctionData[5]).equal(1n);
    }
  });

  it("Should emit event after starting auctions", async function () {
    expect(await auction.startAuctions(tokenIds)).emit(auction, "AuctionStarted");
  });

  it("Should add token auctions started to active token Id list", async function () {
    await auction.startAuctions(tokenIds);
    for (let i = 0; tokenIds.length > i; i++) {
      expect(await auction.activeAuctionsTokenIds(i)).equal(tokenIds[i]);
    }
  });

  it("Should revert if caller of withdraw function is not the contract owner", async function () {
    expect(auction.connect(user1).withdrawAll()).revertedWithCustomError(auction, "OwnableUnauthorizedAccount");
  });

  it("Should withdraw all funds to owner account", async function () {
    await networkHelpers.setBalance(auctionAddress, ethers.parseEther("1.0"));
    await auction.withdrawAll();
    expect(await ethers.provider.getBalance(auctionAddress)).equal(0n);
  });

  it("Should revert if placing bid on an a token which hasn't an auction active", async function () {
    expect(auction.placeBid(1)).revertedWith("Auction on this token isn't running");
  });

  it("Should revert if placing bid on an a token which auction has ended", async function () {
    await auction.startAuctions(tokenIds);
    await networkHelpers.time.increase(100000);
    expect(auction.placeBid(1)).revertedWith("Auction ended");
  });

  it("Should revert if placing bid on an a token which user has alredy the highest bid", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    expect(auction.placeBid(1, { value: ethers.parseEther("2") })).revertedWith("You already have the highest bid");
  });

  it("Should revert if bid isn't superior to starting price", async function () {
    await auction.startAuctions(tokenIds);
    expect(auction.placeBid(1, { value: 1000 })).revertedWith("Bid must be equal or superior to starting price");
  });

  it("Should revert if bid proposed on an auction isn't superior to highest bid", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    expect(auction.connect(user1).placeBid(1, { value: ethers.parseEther("0.1") })).revertedWith("Bid proposed isn't superior to highest bid");
  });

  it("Should refund overtaken bid to its bidder", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    const beforeBalance = await ethers.provider.getBalance(owner);
    await auction.connect(user1).placeBid(1, { value: ethers.parseEther("2") });
    expect((await ethers.provider.getBalance(owner)) - beforeBalance).equal(ethers.parseEther("1"));
  });

  it("Should register bid value and address when received", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    let a = await auction.tokenAuction(1);
    expect(a.highestBid.value).equal(ethers.parseEther("1"));
    expect(a.highestBid.bidder).equal(owner.address);
  });

  it("Should emit event after starting auctions", async function () {
    await auction.startAuctions(tokenIds);
    expect(await auction.placeBid(1, { value: ethers.parseEther("1") })).emit(auction, "NewBidPlaced");
  });

  it("Should revert if trying to end auctions before its expiring time", async function () {
    await auction.startAuctions(tokenIds);
    expect(auction.endAuctions(tokenIds)).revertedWith("Auctions not expired yet");
  });

  it("Should assign winner, mint token and send it to him when an auction end", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    await networkHelpers.time.increase(100000);
    await auction.endAuctions(tokenIds);
    let a = await auction.tokenAuction(1);
    expect(a.winner).equal(owner.address);
    expect(await NFT.balanceOf(owner)).equal(1);
  });

  it("Should emit event after ending auctions", async function () {
    await auction.startAuctions(tokenIds);
    await networkHelpers.time.increase(100000);
    expect(await auction.endAuctions(tokenIds)).emit(auction, "AuctionsClosed");
  });

  it("Should delete array with token Id active auctions", async function () {
    await auction.startAuctions(tokenIds);
    await networkHelpers.time.increase(100000);
    await auction.endAuctions(tokenIds);
    expect(auction.activeAuctionsArray).not.exist;
  });

  it("Should revert if tying buy directly a token whitch isn't unsold, or if not sending enough Eth for the purchase", async function () {
    await auction.startAuctions(tokenIds);
    await auction.placeBid(1, { value: ethers.parseEther("1") });
    await networkHelpers.time.increase(100000);
    await auction.endAuctions(tokenIds);
    expect(auction.buyUnsold(1)).revertedWith("Token selected ins't unsold");
    expect(auction.buyUnsold(50)).revertedWith("Offer isn't superior to price requested");
  });

  it("Should emit event after purchasing an unsold NFT", async function () {
    await auction.startAuctions(tokenIds);
    await networkHelpers.time.increase(100000);
    await auction.endAuctions(tokenIds);
    expect(await auction.buyUnsold(1, { value: ethers.parseEther("1") })).emit(auction, "TokenBought");
  });

  it("Chainlink Automation linked functions should end and open new auctions correctly", async function () {
    await auction.startAuctions(tokenIds);
    await networkHelpers.time.increase(100000);
    await auction.checkUpkeep("0x");
    await auction.performUpkeep("0x");
    await networkHelpers.time.increase(100000);
    await auction.checkUpkeep("0x");
    await auction.performUpkeep("0x");
  });
});
