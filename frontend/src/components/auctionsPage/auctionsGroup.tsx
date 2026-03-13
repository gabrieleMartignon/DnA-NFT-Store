import { useEffect, useState } from "react";
import { nftContractRead, auctionContractRead } from "../../utils/config";
import AuctionBox from "./auctionBox";
import type { auctionType } from "../directPurchasePage/directPurchasePage";

export async function getStartingPriceFromRarity(rarity: string) {
  let totalStats = await nftContractRead.supplyStats();
  let rarityStats = totalStats[rarity];
  return rarityStats[2];
}

export function getRarityStatsFromId(tokenId: bigint) {
  if (tokenId <= 0 || tokenId > 248) throw new Error("Invalid TokenId");
  if (tokenId > 124) return "Common";
  if (tokenId > 62) return "Uncommon";
  if (tokenId > 28) return "Rare";
  if (tokenId > 10) return "Epic";
  return "Legendary";
}

export default function AuctionsGroup() {
  const [auctions, setAuctions] = useState<auctionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadAllData() {
    try {
      const activeAuctions = 4;
      const activeIds: bigint[] = [];
      for (let i = 0; i < activeAuctions; i++) {
        const tokenId = await auctionContractRead.activeAuctionsTokenIds(i);
        activeIds.push(tokenId);
      }

      const auctionInfo: auctionType[] = await Promise.all(activeIds.map((a) => auctionContractRead.tokenAuction(a)));

      const auctionsWithData: auctionType[] = await Promise.all(
        auctionInfo.map(async (auction: any) => {
          const uri = await nftContractRead.getTokenURIFromId(auction[1]);
          const response = await fetch(uri);
          const metadata = await response.json();
          const rarity = getRarityStatsFromId(auction[1]);

          return {
            id: auction[0],
            tokenId: auction[1],
            rarity,
            currentWinner: auction[4][4],
            highestBid: auction[4][2],
            minBid: auction[6],
            imgSrc: metadata.image,
            startingPrice: auction[8],
          };
        }),
      );

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
    <div className="flex xl:flex-wrap h-[60vh] sm:h-[65vh] max-h-screen w-screen items-center justify-around  sm:gap-5 overflow-y-scroll flex-col xl:flex-row xl:overflow-y-hidden ">
      {loading ? <div id="loader" className="mb-50"></div> : auctions.map((auction) => <AuctionBox key={auction.tokenId} auction={auction} />)}
    </div>
  );
}
