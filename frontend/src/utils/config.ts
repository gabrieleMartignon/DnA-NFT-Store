import { ethers } from "ethers";
import nftContractJSON from "./ABIs/NFT.json";
import auctionContractJSON from "./ABIs/Auction.json";
import { getContract } from "thirdweb";
import { client } from "../scripts/thirdWebClient";
import { sepolia } from "thirdweb/chains";

const config = {
  rpcUrl: "https://0xrpc.io/sep",
  nftContractAddress: "0x57A4068F040566136817D48F2CA87f6360DF826e",
  auctionsContractAddress: "0xE92803Fed7a44567fCfC636dBE8681B891298Aa8",
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

