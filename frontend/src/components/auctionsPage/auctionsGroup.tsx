import { useEffect, useState } from "react";
import { nftContractRead, auctionContractRead } from "../../utils/config";
import AuctionBox from "./auctionBox";




export async function getStartingPriceFromRarity(rarity: string) {
    let totalStats = await nftContractRead.supplyStats();
    let rarityStats = totalStats[rarity];
    return rarityStats[2];
  }

export function getRarityStatsFromId(tokenId: bigint) {
  if (tokenId <= 0 || tokenId > 1198) throw new Error("Invalid TokenId");
  if (tokenId > 598) return "Common";
  if (tokenId > 298) return "Uncommon";
  if (tokenId > 123) return "Rare";
  if (tokenId > 48) return "Epic";
  return "Legendary";
}

export default function AuctionsGroup() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadAllData() {
    try {
      const activeAuctions = 4;
      let activeIds: bigint[] = [];
      for (let i = 0; i < activeAuctions; i++) {
        const tokenId = await auctionContractRead.activeAuctionsTokenIds(i);
        activeIds.push(tokenId);
      }

      const auctionInfo = await Promise.all(activeIds.map((a) => auctionContractRead.tokenAuction(a)));

      const auctionsWithData = await Promise.all(
        auctionInfo.map(async (auction: any) => {
          const uri = await nftContractRead.getTokenURIFromId(auction[1]);
          const response = await fetch(uri);
          const metadata = await response.json();
          const rarity = getRarityStatsFromId(auction[1]);
          
          return {
            id: Number(auction[1]),
            rarity,
            currentWinner: auction[4][4],
            highestBid: auction[4][2],
            minBid: auction[6],
            imgSrc: metadata.image,
            startingPrice : auction[8]
          }
        })
      )

      setAuctions(auctionsWithData);
      setLoading(false);
    } catch (error) {
      console.error("Errore nel caricamento:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllData();
  }, []);

 

  return (
    <div className="flex xl:flex-wrap h-[65vh] max-h-screen w-screen items-center justify-around gap-4 overflow-y-scroll flex-col xl:flex-row xl:overflow-y-hidden">
      {loading ? <p className="absolute top-[30vh]">Loading...</p> : auctions.map((auction) => <AuctionBox auction={auction} />)}
    </div>
  );
}
