import { useEffect, useState } from "react";
import RarityBadge from "../auctionsPage/rarityBadge";
import { auctionContractRead, nftContractRead, auctionContract } from "../../utils/config";
import { ethers } from "ethers";
import { useActiveAccount } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "../../scripts/thirdWebClient";
import Alert from "../auctionsPage/alert";

export type rarities = "Uncommon" | "Common" | "Rare" | "Epic" | "Legendary" | "";

export default function DirectPurchase() {
  const [selectedRarity, setSelectedRarity] = useState<rarities>("");
  const [unsoldNFTsAuctions, setUnsoldNFTsAuctions] = useState<[]>([]);
  const [URIData, setURIData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<{ errorString?: string; messageString: any; isActive: boolean | undefined } | null>(null);
  const account = useActiveAccount();

  async function getUnsoldNfTs() {
    const unsoldAuctions = await auctionContractRead.getUnsoldldAuctions();
    setUnsoldNFTsAuctions(unsoldAuctions);
    const uri = await nftContractRead.externalBaseURI();

    return { unsoldAuctions, uri };
  }

  async function fetchImages(auctions: any[], URI: string) {
    const tokenMetadata: any = {};

    for (const auction of auctions) {
      const response = await fetch(URI + String(auction[1]) + ".json");
      const data = await response.json();
      tokenMetadata[auction[1]] = data;
    }
    setURIData(tokenMetadata);
  }

  async function loadData() {
    setIsLoading(true);
    const { unsoldAuctions, uri } = await getUnsoldNfTs();
    await fetchImages(unsoldAuctions, uri);
    setIsLoading(false);
  }

  function getAuctionRarity(auction: any): rarities {
    const value = URIData[auction[1]]?.attributes[4]?.value;
    const validRarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
    return validRarities.includes(value) ? value : URIData[auction[1]]?.attributes[5]?.value;
  }

  useEffect(() => {
    loadData();
  }, []);

  function showAlert(error: string, message: string | unknown) {
    setAlertData({ errorString: error, messageString: message, isActive: true });
    setTimeout(() => {
      setAlertData({ errorString: error, messageString: message, isActive: false });
    }, 3500);
  }

  const onClickBuyUnsold = async (tokenId: bigint, price: bigint) => {
    if (!account) {
      showAlert("No wallet connected", "Connect a wallet before placing a bid");
    } else {
      const tx = prepareContractCall({
        contract: auctionContract,
        method: "function buyUnsold(uint256 tokenId)",
        params: [tokenId],
        value: price,
      });

      const result = await sendTransaction({
        transaction: tx,
        account: account,
      });
    }
  };

  return (
    <>
      {alertData?.isActive == false ? (
        <Alert error={alertData?.errorString} message={alertData?.messageString} isActive={false} />
      ) : (
        <Alert error={alertData?.errorString} message={alertData?.messageString} isActive={alertData?.isActive ?? false} />
      )}
      <div className="absolute top-0 md:top-[5vh] -translate-x-1/2 left-1/2 w-[80%] ">
        <div className="flex flex-col mt-12 lg:mt-16 items-center justify-center gap-0 lg:gap-4">
          <h1 className="text-3xl md:text-4xl  lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent tracking-tighter text-balance text-center py-2 px-2 ">
            Direct Buy
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide text-balance text-center">
            Choose and purchase your DnA NFT at base price.
          </p>
          <div className="flex flex-wrap justify-evenly items-center w-[90%] h-auto mt-5 gap-2 ">
            <RarityBadge
              size="scale-100 lg:scale-130"
              rarity="Legendary"
              onSelect={() => {
                setSelectedRarity("Legendary");
              }}
              isSelected={selectedRarity == "Legendary"}
            />
            <RarityBadge
              size="scale-100 lg:scale-130"
              rarity="Epic"
              onSelect={() => {
                setSelectedRarity("Epic");
              }}
              isSelected={selectedRarity == "Epic"}
            />
            <RarityBadge
              size="scale-100 lg:scale-130"
              rarity="Rare"
              onSelect={() => {
                setSelectedRarity("Rare");
              }}
              isSelected={selectedRarity == "Rare"}
            />
            <RarityBadge
              size="scale-100 lg:scale-130"
              rarity="Uncommon"
              onSelect={() => {
                setSelectedRarity("Uncommon");
              }}
              isSelected={selectedRarity == "Uncommon"}
            />
            <RarityBadge
              size="scale-100 lg:scale-130"
              rarity="Common"
              onSelect={() => {
                setSelectedRarity("Common");
              }}
              isSelected={selectedRarity == "Common"}
            />
          </div>
        </div>
        <div className="w-[280px] md:w-full h-[65vh] sm:h-[60vh] lg:h-[50vh] mt-7 lg:mt-15 flex flex-row flex-wrap justify-center items-center gap-5 md:gap-10 overflow-y-scroll scrollbar-thumb-accent scrollbar-track-transparent hover:scrollbar-thumb-primary scrollbar-hide lg:scrollbar-thin mx-auto ">
          {unsoldNFTsAuctions.length == 0 ? (
            <h1>No unsold NFTs found</h1>
          ) : (
            unsoldNFTsAuctions
              .filter((auction) => {
                if (selectedRarity == "") return true;

                return getAuctionRarity(auction) == selectedRarity;
              })
              .slice(0, 20)
              .map((auction: any) => {
                let auctionRarity = getAuctionRarity(auction);
                return (
                  <div
                    key={auction.tokenId}
                    className="w-auto md:w-[450px] lg:w-[350px] flex-row h-auto border gap-3 bg-accent/10 rounded-xl border-accent flex justify-center items-center p-2 md:p-3 "
                  >
                    <img src={URIData[auction[1]]?.image} alt="Loading..." className="rounded-xl w-25 lg:w-35" />
                    <div className="flex flex-col gap-3 w-full">
                      <p className="text-text font-extrabold text-base lg:text-xl">DnA NFT #{auction.tokenId}</p>
                      <RarityBadge size="scale-100" rarity={auctionRarity} />
                      <button
                        className="relative h-auto flex items-center w-auto justify-center py-1 overflow-hidden rounded-md bg-primary/80 px-2 text-neutral-50 transition hover:bg-primary cursor-pointer font-bold"
                        onClick={() => {
                          onClickBuyUnsold(auction.tokenId, auction.startingPrice);
                        }}
                      >
                        {parseFloat(ethers.formatEther(auction.startingPrice)).toFixed(4)}
                        <img
                          className="scale-75"
                          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                          alt="ethereum"
                        ></img>
                      </button>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </>
  );
}
