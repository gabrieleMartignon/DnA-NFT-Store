import { ethers } from "ethers";
import nftContractJSON from "./ABIs/NFT.json";
import auctionContractJSON from "./ABIs/Auction.json";
import { getContract } from "thirdweb";
import { client } from "../scripts/thirdWebClient";
import { sepolia } from "thirdweb/chains";

const config = {
  rpcUrl: import.meta.env.VITE_SEPOLIA_RPC_URL,
  nftContractAddress: import.meta.env.VITE_NFT_CONTRACT_ADDRESS,
  auctionsContractAddress: import.meta.env.VITE_AUCTIONS_CONTRACT_ADDRESS,
  ownerPrivateKey: import.meta.env.VITE_SEPOLIA_PRIVATE_KEY,
};

const auctionContractABI = auctionContractJSON.abi 
const nftContractABI = nftContractJSON.abi
const provider = new ethers.JsonRpcProvider(config.rpcUrl)
const nftContractRead = new ethers.Contract(config.nftContractAddress, nftContractABI, provider)
const auctionContractRead = new ethers.Contract(config.auctionsContractAddress, auctionContractABI, provider)

const auctionContract = getContract({
  client,
  chain: sepolia,
  address: config.auctionsContractAddress,
  abi: auctionContractJSON.abi as any
});

export { config, provider, nftContractRead, auctionContractRead, auctionContract };
