import { useEffect, useState, type JSX } from "react";
import { useActiveAccount } from "thirdweb/react";
import { auctionContractRead } from "../../utils/config";
import { ethers } from "ethers";
import { getRarityBadge } from "../auctionsPage/auctionBox";
import { getRarityStatsFromId } from "../auctionsPage/auctionsGroup";

type bid = {
  id: number;
  tokenId: number;
  value: number;
  timestamp: number;
  address: string;
};

type bidResultType = { [key: string]: JSX.Element | undefined };

export default function HistoryPage() {
  const [userBids, setUserBids] = useState<bid[]>([]);
  const [bidResults, setBidResults] = useState<bidResultType>({});
  const activeAccount = useActiveAccount();

  async function getBidResult(tokenId: bigint) {
    let auction = await auctionContractRead.tokenAuction(tokenId);
    if (auction.highestBid.bidder == activeAccount?.address) {
      if (auction.state == 1n) {
        return <p className="font-bold text-green-400">Currently winning</p>;
      } else if (auction.state == 2n) {
        return <p className="font-bold text-green-600">Winner</p>;
      }
    }
    return <p className="font-bold text-red-400">Beaten</p>;
  }

  useEffect(() => {
    const fetchUserBids = async () => {
      if (!activeAccount?.address) return;
      const bids = await auctionContractRead.getUserBids(activeAccount.address);
      setUserBids(bids);
    };
    fetchUserBids();
  }, [activeAccount]);

  useEffect(() => {
    if (userBids.length > 0) {
      const loadBidResults = async () => {
        const results: bidResultType = {};

        for (const bid of userBids) {
          results[bid.tokenId.toString()] = await getBidResult(BigInt(bid.tokenId));
        }
        setBidResults(results);
      };
      loadBidResults();
    }
  }, [userBids]);

  function bidDate(timestamp: number) {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString();
  }

  return (
    <div>
      <div className="absolute top-[17vh] xl:top-[13vh] w-full">
        <div className=" flex-col w-full h-auto  flex items-center justify-between gap-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-relaxed w-auto flex justify-center pr-1 text-center py-1 px-1">
            Your bids history
          </h1>

          <p className=" md:text-lg sm:text-base  text-muted max-w-3xl mx-auto leading-relaxed font-light text-text/70 tracking-wide text-balance text-center">
            Review your bids
          </p>
        </div>

        {activeAccount == undefined ? (
          <p className="md:text-lg sm:text-base text-muted max-w-3xl mx-auto leading-relaxed  text-text/70 tracking-wide text-balance text-center p-7 mt-[15vh] font-bold">
            Connect a wallet to see your bids
          </p>
        ) : userBids && userBids.length > 0 ? (
          <div className="w-[90%] md:w-[85%] xl:w-[70%] mx-auto mt-15 h-[50vh] flex flex-col-reverse items-center justify-end overflow-y-auto">
            {userBids.slice(0, 20).map((bid) => (
              <div
                key={bid.id}
                className="text-[9px] sm:text-base h-10 border w-full flex items-center justify-evenly bg-accent/10 rounded-xl mb-3 border-accent "
              >
                <h1 className="font-semibold">Token #{bid.tokenId}</h1>

                <h1 className="sm:scale-100 scale-70 ">{getRarityBadge(getRarityStatsFromId(BigInt(bid.tokenId)))}</h1>
                <h1 className="flex justify-center items-center font-semibold">
                  {ethers.formatEther(String(bid.value))}{" "}
                  <img
                    className="scale-75"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                    alt="ethereum"
                  ></img>
                </h1>
                <h1 className="">{bidResults[bid.tokenId.toString()]}</h1>
                <h1>{bidDate(bid.timestamp)}</h1>
              </div>
            ))}
          </div>
        ) : (
          <p className="  mt-[15vh] md:text-lg sm:text-base  text-muted max-w-3xl mx-auto leading-relaxed  text-text/70 tracking-wide text-balance text-center">
            No bids found for the current account
          </p>
        )}
      </div>
    </div>
  );
}
