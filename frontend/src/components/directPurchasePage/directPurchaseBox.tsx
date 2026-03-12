import type { auctionType } from "./directPurchasePage";
import RarityBadge from "../sharedComponents/rarityBadge";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useState } from "react";
import { auctionContract } from "../../utils/config";
import Alert from "../sharedComponents/alert";
import { type rarities } from "./directPurchasePage";
import { ethers } from "ethers";
import type { Account } from "thirdweb/wallets";
import type { alertMessage } from "../sharedComponents/alert";

type propsType = {
  auction: auctionType;
  account: Account | undefined;
  auctionRarity: string;
  data: { [key: number]: { image: string } };
};

export default function DirectPurchaseBox({ auction, account, auctionRarity, data }: propsType) {
  const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<alertMessage | null>(null);

  function showAlert(_error: string, _message: string) {
    setAlertData({ error: _error, message: _message, isActive: true });
    setTimeout(() => {
      setAlertData({ error: _error, message: _message, isActive: false });
    }, 3500);
  }

  const onClickBuyUnsold = async (tokenId: bigint, price: bigint) => {
    if (!account) {
      showAlert("No wallet connected", "Connect a wallet before placing a bid");
    } else {
      try {
        setIsTransactionLoading(true);
        const tx = prepareContractCall({
          contract: auctionContract,
          method: "function buyUnsold(uint256 tokenId)",
          params: [tokenId],
          value: price,
        });

        await sendTransaction({
          transaction: tx,
          account: account,
        });
      } catch (error) {
        console.log(error);
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
      <div
        key={auction.tokenId}
        className="w-auto md:w-md lg:w-87 flex-row h-auto border gap-3 bg-accent/10 rounded-xl border-accent flex justify-center items-center p-2 md:p-3 "
      >
        <img src={data[Number(auction.tokenId)]?.image} alt="Loading..." className="rounded-xl w-25 lg:w-35" />
        <div className="flex flex-col gap-3 w-full">
          <p className="text-text font-extrabold text-base lg:text-xl">DnA NFT #{auction.tokenId}</p>
          <RarityBadge size="scale-100" rarity={auctionRarity as rarities} />
          <button
            className="relative h-8.5 flex items-center w-auto justify-center py-1 overflow-hidden rounded-md bg-primary/80 px-2 text-neutral-50 transition hover:bg-primary cursor-pointer font-bold"
            onClick={() => {
              onClickBuyUnsold(auction.tokenId, BigInt(auction.startingPrice));
            }}
          >
            {isTransactionLoading ? (
              <div id="loader" className="scale-50"></div>
            ) : (
              <div className="flex">
                {parseFloat(ethers.formatEther(auction.startingPrice)).toFixed(4)}
                <img
                  className="scale-75"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                  alt="ethereum"
                ></img>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
