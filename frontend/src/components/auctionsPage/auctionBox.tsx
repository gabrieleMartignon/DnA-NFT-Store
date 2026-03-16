import { ethers, type BigNumberish } from "ethers";
import { useActiveAccount } from "thirdweb/react";
import { sendTransaction, prepareContractCall, waitForReceipt } from "thirdweb";
import { useEffect, useState } from "react";
import { auctionContract, auctionContractRead } from "../../utils/config";
import Alert from "../sharedComponents/alert";
import RarityBadge from "../sharedComponents/rarityBadge";
import type { auctionType } from "../directPurchasePage/directPurchasePage";
import type { alertMessage } from "../sharedComponents/alert";
import { client } from "../../scripts/thirdWebClient";
import { sepolia } from "thirdweb/chains";

export function getRarityBadge(rarity: string) {
  switch (rarity.toLowerCase()) {
    case "legendary":
      return <RarityBadge size="100" rarity="Legendary" />;
    case "epic":
      return <RarityBadge size="100" rarity="Epic" />;
    case "rare":
      return <RarityBadge size="100" rarity="Rare" />;
    case "uncommon":
      return <RarityBadge size="100" rarity="Uncommon" />;
    default:
      return <RarityBadge size="100" rarity="Common" />;
  }
}

type propsType = {
  auction: auctionType;
};

export default function AuctionBox({ auction }: propsType) {
  const account = useActiveAccount();
  const [currentBestBid, setCurrentBestBid] = useState<number | bigint>(0);
  const [minBid, setMinBid] = useState<BigNumberish>();
  const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<alertMessage | null>(null);

  useEffect(() => {
    setCurrentBestBid(auction.highestBid);
    setMinBid(auction.minBid);
  }, [auction]);

  function showAlert(_error: string, _message: string) {
    setAlertData({ error: _error, message: _message, isActive: true });
    setTimeout(() => {
      setAlertData({ error: _error, message: _message, isActive: false });
    }, 3500);
  }

  const onClickPlaceBid = async (tokenId: bigint, bidValue: bigint) => {
    if (!account) {
      showAlert("No wallet connected", "Connect a wallet before placing a bid");
    } else {
      try {
        setIsTransactionLoading(true);
        const tx = prepareContractCall({
          contract: auctionContract,
          method: "function placeBid(uint256 tokenId)",
          params: [tokenId],
          value: bidValue,
        });
        const result = await sendTransaction({
          transaction: tx,
          account: account,
        });
        await waitForReceipt({
          client,
          chain: sepolia,
          transactionHash: result.transactionHash,
        });
        const updatedAuction = await auctionContractRead.tokenAuction(tokenId);
        setMinBid(updatedAuction[6]);
        setCurrentBestBid(bidValue);
        showAlert("Bid registered", `${result.transactionHash}`);
      } catch (error) {
        console.error(error);
        return showAlert("Error", (error as Error).message);
      } finally {
        setIsTransactionLoading(false);
      }
    }
  };

  return (
    <>
      {alertData?.isActive == false ? (
        <Alert error={alertData?.error} message={alertData?.message} isActive={false} />
      ) : (
        <Alert error={alertData?.error} message={String(alertData?.message)} isActive={alertData?.isActive ?? false} />
      )}

      <div className="rounded-lg shadow-xl flex justify-around h-auto gap-7  xl:w-[33%] w-auto items-center drop-shadow-lg drop-white p-1  border-2  border-accent bg-accent/10 scale-80 xl:scale-100 ">
        <div className=" flex w-[50%] md:w-[40%] h-full m-2 ">
          <img src={auction.imgSrc} alt="NFT image" className=" mx-auto my-auto w-40 h-43 rounded-2xl border drop-shadow-2xl border-transparent " />
        </div>
        <div className="flex flex-col gap-2 h-full w-[60%] justify-center mr-4 ">
          <p className="text-text font-extrabold text-xl">DnA NFT #{auction.tokenId}</p>
          {getRarityBadge(auction.rarity)}

          {currentBestBid >= auction.startingPrice ? (
            <p className="text-text/70 text-xs flex items-center">
              Best Bid : <b className="text-text font-extrabold ml-2 text-2xl">{parseFloat(ethers.formatEther(currentBestBid)).toFixed(5)}</b>
              <img
                className="scale-75"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                alt="ethereum"
              ></img>
            </p>
          ) : (
            ""
          )}
          <button
            className="relative h-auto flex items-center w-auto justify-center py-1 overflow-hidden rounded-md bg-primary/80 px-2 text-neutral-50 transition hover:bg-primary cursor-pointer font-bold"
            onClick={async () => {
              const bid: bigint = BigInt(currentBestBid > 0 ? (minBid as BigNumberish) : auction.startingPrice);
              await onClickPlaceBid(auction.tokenId, bid);
            }}
          >
            <div className="relative flex lg:text-lg text-sm items-center justify-center ">
              {isTransactionLoading ? (
                <div id="loader" className="scale-90 "></div>
              ) : currentBestBid > 0 ? (
                <>
                  <h1>Bid {parseFloat(ethers.formatEther(minBid as BigNumberish)).toFixed(6)} </h1>
                  <img
                    className="scale-75"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                    alt="ethereum"
                  ></img>
                </>
              ) : (
                <>
                  <h1>Bid {parseFloat(ethers.formatEther(auction.startingPrice)).toFixed(4)} </h1>
                  <img
                    className="scale-75"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                    alt="ethereum"
                  ></img>
                </>
              )}
            </div>
            <div className="animate-shine-infinite absolute inset-0 -top-5 flex h-[calc(100%+40px)] w-full justify-center blur-md">
              <div className="relative h-full w-8 bg-white/30"></div>
            </div>
          </button>
          <div className=" w-full lg:w-auto ">
            <div className="relative">
              <input
                input-id={auction.id}
                type="number"
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-500 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-700 shadow-sm focus:shadow "
                placeholder="0.01 ETH"
                step={0.01}
                min={0}
              />
              <button
                className="absolute right-1 top-1 rounded bg-primary py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-primary-700 focus:shadow-none active:bg-primary hover:bg-primary active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                type="button"
                onClick={async () => {
                  const inputElement = document.querySelector(`input[input-id="${auction.id}"]`) as HTMLInputElement;
                  const inputValue = inputElement?.value || "0";
                  await onClickPlaceBid(auction.tokenId, ethers.parseEther(inputValue));
                }}
              >
                Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
