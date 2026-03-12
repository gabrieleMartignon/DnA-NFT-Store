import { useEffect, useState } from "react";
import RarityBadge from "../sharedComponents/rarityBadge";
import { auctionContractRead, nftContractRead } from "../../utils/config";
import DirectPurchaseBox from "./directPurchaseBox";
import { useActiveAccount } from "thirdweb/react";

export type rarities = "Uncommon" | "Common" | "Rare" | "Epic" | "Legendary" | "";

export type auctionType = {
  id: bigint;
  tokenId: bigint;
  rarity: string;
  highestBid: number;
  imgSrc: string;
  minBid: bigint;
  startingPrice: number;
};

export type tokenMetadataType = {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: rarities | string;
  }[];
};

export default function DirectPurchase() {
  const [selectedRarity, setSelectedRarity] = useState<rarities>("");
  const [unsoldNFTsAuctions, setUnsoldNFTsAuctions] = useState<auctionType[]>([]);
  const [URIData, setURIData] = useState<Record<number, tokenMetadataType>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const account = useActiveAccount();
  const rarities: rarities[] = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

  async function getUnsoldNfTs() {
    const unsoldAuctions: auctionType[] = await auctionContractRead.getUnsoldldAuctions();
    setUnsoldNFTsAuctions(unsoldAuctions);
    const uri: string = await nftContractRead.externalBaseURI();

    return { unsoldAuctions, uri };
  }

  async function fetchTokenMetadata(auctions: auctionType[], URI: string) {
    const tokenMetadata: Record<number, tokenMetadataType> = {};
    for (const auction of auctions) {
      const response = await fetch(URI + String(auction.tokenId) + ".json");
      const data: tokenMetadataType = await response.json();
      tokenMetadata[Number(auction.tokenId)] = data;
    }
    setURIData(tokenMetadata);
  }

  async function loadData() {
    setIsLoading(true);
    const { unsoldAuctions, uri } = await getUnsoldNfTs();
    await fetchTokenMetadata(unsoldAuctions, uri);
    setIsLoading(false);
  }

  function getAuctionRarity(auction: auctionType) {
    const tokenData = URIData[Number(auction.tokenId)];
    const value: string = tokenData?.attributes[4]?.value;
    const validRarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
    return validRarities.includes(value) ? value : tokenData?.attributes[5]?.value;
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="absolute top-0 md:top-[3vh] -translate-x-1/2 left-1/2 w-[80%] ">
        <div className="flex flex-col mt-12 lg:mt-16 items-center justify-center gap-0 lg:gap-4">
          <h1 className="text-3xl md:text-4xl  lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent tracking-tighter text-balance text-center py-2 px-2 ">
            Direct Buy
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide text-balance text-center">
            Choose and purchase your DnA NFT at base price.
          </p>
          <div className="flex flex-wrap justify-evenly items-center w-[90%] h-auto mt-5 gap-2 ">
            {rarities.map((rarity) => {
              return (
                <RarityBadge
                  key={rarity}
                  size="scale-100 lg:scale-130"
                  rarity={rarity}
                  onSelect={() => {
                   
                     
                  setSelectedRarity(rarity);
                  }}
                    
                  isSelected={selectedRarity == rarity}
                />
              );
            })}
          </div>
        </div>
        <div className="w-70 md:w-full h-[65vh] sm:h-[60vh] lg:h-[53vh] mt-7 lg:mt-11 flex flex-row flex-wrap justify-center items-center gap-5 md:gap-10 overflow-y-scroll scrollbar-thumb-accent scrollbar-track-transparent hover:scrollbar-thumb-primary lg:scrollbar-thin mx-auto ">
          {isLoading ? (
            <div id="loader"></div>
          ) : unsoldNFTsAuctions.length == 0 ? (
            <h1>No unsold NFTs found</h1>
          ) : (
            unsoldNFTsAuctions
              .filter((auction) => {
                if (selectedRarity == "") return true;

                return getAuctionRarity(auction) == selectedRarity;
              })
              .slice(0, 20)
              .map((auction) => {
                const auctionRarity = getAuctionRarity(auction);
                return <DirectPurchaseBox auction={auction} account={account} auctionRarity={auctionRarity} data={URIData} />;
              })
          )}
        </div>
      </div>
    </>
  );
}
