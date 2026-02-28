import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DeployContracts", (m) => {
  const nftContract = m.contract("NFT", [100000000000000n]);
  const auctionContract = m.contract("Auction", [nftContract]);
  m.call(nftContract, "setAuctionContract", [auctionContract]);
  
  return { nftContract, auctionContract };
});
