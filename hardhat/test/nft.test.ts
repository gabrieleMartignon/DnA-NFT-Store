import { expect } from "chai";
import { network } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/types";
import type { NFT, Auction } from "../types/ethers-contracts/index.js";
const { ethers, networkHelpers } = await network.connect();

describe("NFT contract testing", function () {
  let NFT: NFT;
  let auction: Auction;
  let owner: HardhatEthersSigner;
  let user1: HardhatEthersSigner;
  let user2: HardhatEthersSigner;
  let auctionAddress: any;

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
    await networkHelpers.setBalance(auctionAddress, ethers.parseEther("1.0"));
  });

  it("Should allow setting an auction contract address", async function () {
    const newAuctionContract: string = "0x66c2d38160648BEb4044aE304AfE81EaA6d6c89D";
    await NFT.setAuctionContract(newAuctionContract);
    expect(await NFT.auctionContract()).to.be.equal(newAuctionContract);
  });

  it("Should revert if setting address zero as auction address", async function () {
    const newAuctionContract: string = ethers.ZeroAddress;
    await expect(NFT.setAuctionContract(newAuctionContract)).revertedWith("Zero address not allowed");
  });

  it("Should revert if requesting auction startign price for an invalid tokenId", async function () {
    const tokenId = 100000;
    await expect(NFT.getStartingPrice(tokenId)).revertedWith("Invalid TokenId");
  });

  it("Should give the correct starting price for every token rarity", async function () {
    const tokenIds = [140, 70, 30, 12, 9];
    const stats = await NFT.supplyStats();
    for (let i = 0; tokenIds.length > i; i++) {
      expect(await NFT.getStartingPrice(tokenIds[i])).equal((stats[i + 2] as any).startingPrice);
    }
  });

  it("Shouldn't mint if caller isn't the auctionContract", async function () {
    await expect(NFT.mint(user1.address, 1)).revertedWith("Not authorized");
  });

  it("Should reduce supply when mint is successfull", async function () {
    await networkHelpers.impersonateAccount(auctionAddress);
    const auctionSigner = await ethers.getSigner(auctionAddress);
    await NFT.connect(auctionSigner).mint(user1, 248);
    await NFT.connect(auctionSigner).mint(user1, 1);
    const stats = await NFT.supplyStats();
    expect(stats.Common.availableSupply).equal(123);
    expect(stats.Legendary.availableSupply).equal(9);
  });

  it("Should mint and send the token to owner", async function () {
    await networkHelpers.impersonateAccount(auctionAddress);
    const auctionSigner = await ethers.getSigner(auctionAddress);
    await NFT.connect(auctionSigner).mint(user1, 120);
    expect(await NFT.ownerOf(120)).equal(user1.address);
  });
});
