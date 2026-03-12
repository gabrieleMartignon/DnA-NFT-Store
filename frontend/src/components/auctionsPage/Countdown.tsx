import { auctionContractRead } from "../../utils/config";
import { useEffect, useState } from "react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  async function startCountdown() {
    try {
      const tokenId: bigint[] = await auctionContractRead.activeAuctionsTokenIds(0);
      const auction = await auctionContractRead.tokenAuction(tokenId);

      const endTime: number = Number(auction[3]) * 1000;
      let msRemaining: number = endTime - Date.now();
      setInterval(() => {
        if (msRemaining > 0) {
          msRemaining -= 1000;
          const seconds = Math.floor((msRemaining / 1000) % 60);
          const minutes = Math.floor((msRemaining / (1000 * 60)) % 60);
          const hours = Math.floor((msRemaining / (1000 * 60 * 60)) % 24);
          const days = Math.floor(msRemaining / (1000 * 60 * 60 * 24));

          setTimeLeft({ days, hours, minutes, seconds });
        }
      }, 1000);
      
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <div className="flex xl:absolute items-center justify-center flex-col gap-2 top-[20%] lg:top-[52%]">
      <div className=" text-red-500 flex bg-red-500/20 w-auto h-auto justify-between gap-1 px-1 py-0.5 rounded-md items-center  ">
        <b>Live</b>
        <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
      </div>
      <h1 className="text-2xl font-bold text-text/70 tracking-widest">
        {String(timeLeft.days).padStart(2, "0")}:{String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </h1>
    </div>
  );
}
