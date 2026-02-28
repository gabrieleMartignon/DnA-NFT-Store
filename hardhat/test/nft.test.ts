import { expect } from "chai";
import { network } from "hardhat";
const { ethers, networkHelpers } = await network.connect();

describe("NFT contract testing", function () {
  let NFT: any;
  let auction: any;
  let owner: any;
  let user1: any;
  let user2: any;
  let auctionAddress: any;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();
    let nftContractFactory = await ethers.getContractFactory("NFT");
    let basePrice: bigint = 1000000000n;
    NFT = await nftContractFactory.deploy(basePrice);
    await NFT.waitForDeployment();
    let auctionContractFactory = await ethers.getContractFactory("Auction");
    auction = await auctionContractFactory.deploy(await NFT.getAddress());
    await auction.waitForDeployment();
    auctionAddress = auction.target;
    await NFT.setAuctionContract(auctionAddress);
    await networkHelpers.setBalance(auctionAddress, ethers.parseEther("1.0"));
  });

  it("Should allow setting an auction contract address", async function () {
    let newAuctionContract: string = "0x66c2d38160648BEb4044aE304AfE81EaA6d6c89D";
    await NFT.setAuctionContract(newAuctionContract);
    expect(await NFT.auctionContract()).to.be.equal(newAuctionContract);
  });

  it("Should revert if setting address zero as auction address", async function () {
    let newAuctionContract: string = ethers.ZeroAddress;
    expect(NFT.setAuctionContract(newAuctionContract)).revertedWith("Zero address not allowed");
  });

  it("Should revert if requesting auction startign price for an invalid tokenId", async function () {
    let tokenId = 100000;
    expect(NFT.getStartingPrice(tokenId)).revertedWith("Invalid TokenId");
  });

  it("Should give the correct starting price for every token rarity", async function () {
    let tokenIds = [1000, 450, 200, 50, 1];
    expect(await NFT.supplyStats().Common);
    let stats = await NFT.supplyStats();
    for (let i = 0; tokenIds.length > i; i++) {
      expect(await NFT.getStartingPrice(tokenIds[i])).equal(stats[i + 1].startingPrice);
    }
  });

  it("Should't mint if caller isn't the auctionContract", async function () {
    expect(NFT.mint(user1.address, 1)).revertedWith("Not authorized");
  });

  it("Should reduce supply when mint is successfull", async function () {
    await networkHelpers.impersonateAccount(auctionAddress);
    const auctionSigner = await ethers.getSigner(auctionAddress);
    await NFT.connect(auctionSigner).mint(user1, 1196);
    await NFT.connect(auctionSigner).mint(user1, 1);
    let stats = await NFT.supplyStats();
    expect(stats.Common.availableSupply).equal(597);
    expect(stats.Legendary.availableSupply).equal(47);
  });

  it("Should mint and send the token to owner", async function () {
    await networkHelpers.impersonateAccount(auctionAddress);
    const auctionSigner = await ethers.getSigner(auctionAddress);
    await NFT.connect(auctionSigner).mint(user1, 1000);
    expect(await NFT.ownerOf(1000)).equal(user1.address);
  });
});
