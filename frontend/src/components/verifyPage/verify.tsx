import { useState } from "react";
import { nftContractRead, auctionContractRead } from "../../utils/config";
import { useNavigate } from "react-router";
import { ethers } from "ethers";

type metadata = {
  name: string;
  image: string;
  attributes: { trait_type: string; value: string }[];
};

export default function () {
  const [isVerifyOpen, setIsVerifyOpen] = useState<boolean>(false);
  const [tokenMetadata, setTokenMetadata] = useState<metadata>();
  const [tokenStatus, setTokenStatus] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const navigate = useNavigate();

   async function loadNFTData(tokenId: number) {
    setIsLoading(true);
    const uri = await nftContractRead.getTokenURIFromId(tokenId);
    const response = await fetch(uri);
    const metadata = await response.json();
    const startingPrice = await nftContractRead.getStartingPrice(BigInt(tokenId));
    setStartingPrice(startingPrice);
    setTokenMetadata(metadata);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  async function isAvailable(tokenId: number) {
    let tokenAuction = await auctionContractRead.tokenAuction(tokenId);
    switch (tokenAuction[5]) {
      case 0n:
        return (
          <button
            type="button"
            className="text-gray-500 flex bg-gray-500/20 w-auto h-auto justify-between gap-1 px-1 py-0.5 rounded-md items-center border-3 border-gray-500 font-bold transition-all duration-400 cursor-pointer hover:border-transparent hover:bg-gray-500 hover:text-white hover:shadow-2xl hover:shadow-gray-500"
          >
            Not started
          </button>
        );
      case 1n:
        return (
          <button
            type="button"
            onClick={() => {
              navigate("/Auctions");
            }}
            className="text-green-500 flex bg-green-500/20 w-auto h-auto justify-between gap-1 px-1 py-0.5 rounded-md items-center border-3 border-green-500 font-bold transition-all duration-400 cursor-pointer hover:border-transparent hover:bg-green-500 hover:text-white hover:shadow-2xl hover:shadow-green-500"
          >
            Available
          </button>
        );
      case 2n:
        return (
          <button
            type="button"
            className="text-red-500 flex bg-red-500/20 w-auto h-auto justify-between gap-1 px-1 py-0.5 rounded-md items-center border-3 border-red-500 font-bold transition-all duration-400 cursor-pointer hover:border-transparent hover:bg-red-500 hover:text-white hover:shadow-2xl hover:shadow-red-500"
          >
            Unavailable
          </button>
        );
      case 3n:
        return (
          <button
            type="button"
            onClick={() => {
              navigate("/DirectBuy");
            }}
            className="text-green-500 flex bg-green-500/20 w-auto h-auto justify-between gap-1 px-1 py-0.5 rounded-md items-center border-3 border-green-500 font-bold transition-all duration-400 cursor-pointer hover:border-transparent hover:bg-green-500 hover:text-white hover:shadow-2xl hover:shadow-green-500"
          >
            Available
          </button>
        );
      default:
        return "Unknown status";
    }
  }

  const handleSearch = async () => {
    if (inputValue) {
      await loadNFTData(Number(inputValue));
      const status = await isAvailable(Number(inputValue));
      setTokenStatus(status);
    }
  };

  return (
    <div className={`gap-2 md:gap-6 flex-col absolute top-[12vh] md:top-[15vh] lg:top-[12vh] left-1/2 -translate-x-1/2 flex w-full items-center h-[90%] sm:h-[86%]`}>
      <div className="flex-col w-full h-auto flex items-center justify-between gap-1">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-relaxed w-auto flex justify-center pr-1 text-center py-1 px-1">
          Verify an NFT
        </h1>
      </div>
      <div
        className={`scale-70 lg:scale-100  p-3 overflow-hidden h-11! bg-primary rounded-full flex group items-center ease-in-out transition-all duration-800 shadow-2xl ${
          isVerifyOpen ? "w-[145px]" : "w-[60px]"
        }`}
        onMouseEnter={() => {
          setIsVerifyOpen(true);
        }}
      >
        <div className="flex items-center justify-center fill-white cursor-pointer hover:bg-accent/20 rounded-xl p-1.5" onClick={handleSearch}
        >
          <svg id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="22" height="22">
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <input
          type="number"
          className={`ml-2 rounded-lg outline-none text-[20px] w-full text-white font-normal mx-auto px-4 numero-input transition-all duration-400 ${
            isVerifyOpen ? "bg-accent/20" : "bg-transparent"
          }`}
          min={1}
          max={248}
          value={inputValue}
          onChange={(e) => {
            let value = e.target.value;
            if (parseInt(value) > 248 || parseInt(value) < 1) {
              value = "248";
            }
            setInputValue(value);
          }}
        />
      </div>
      <div className={`w-[85%] sm:w-[70%] h-[65%] sm:h-[70%]  flex items-center justify-between transition-all duration-400`}>
        <div
          className={`${
            isLoading ? "opacity-0 h-1" : "opacity-100 h-[85%] sm:h-full border-t-6 border-b-6"
          } transition-all ease-in-out duration-1300 gap-2 md:gap-3 flex items-center justify-center mx-auto flex-col w-full sm:w-[80%] lg:w-full xl:w-[60%] border-accent overflow-y-hidden pt-2 rounded-sm`}
        >
          {isLoading ? (
            ""
          ) : tokenMetadata ? (
            <>
              <div className="scale-80 lg:scale-100 flex items-center justify-center gap-2">
              <h1 className=" text-lg lg:text-xl font-bold text-shadow-text text-text  leading-relaxed">{tokenMetadata?.name}</h1>
              {tokenStatus}</div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <div className="w-full flex flex-col gap-4">
                  <div className="flex sm:flex-col items-center justify-center  gap-1 lg:gap-3 ">
                    {tokenMetadata?.attributes?.slice(0, 3).map((trait: { [key: string]: any }, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-23  lg:w-35 justify-center bg-linear-to-br from-accent/30 to-accent/10 border-2 border-accent/50 rounded-full px-1 lg:px-2 py-1 lg:text-xs text-primary hover:border-accent/80 hover:from-accent/40 hover:to-accent/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-accent/50 hover:shadow-xl"
                      >
                        <div className="font-semibold text-[9px] lg:text-xs text-accent uppercase">{trait.trait_type}</div>
                        <div className="font-bold text-[11px] lg:text-md uppercase">{trait.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <img src={tokenMetadata?.image} alt="NFT" className="w-30 md:w-32 lg:w-55 rounded-lg shadow-lg shadow-accent border-accent border-2" />
                <div className="flex sm:flex-col gap-1 lg:gap-3 ">
                    {tokenMetadata?.attributes?.slice(3, 6).map((trait: { [key: string]: any }, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-23 lg:w-35 justify-center bg-linear-to-br from-accent/30 to-accent/10 border-2 border-accent/50 rounded-full px-2 py-1 lg:text-xs text-primary hover:border-accent/80 hover:from-accent/40 hover:to-accent/20 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-accent/50 hover:shadow-xl"
                      >
                        <div className="font-semibold text-[9px] lg:text-xs text-accent uppercase">{trait.trait_type}</div>
                        <div className="font-bold text-[11px] lg:text-md uppercase">{trait.value}</div>
                      </div>
                    ))}
                  </div>
              </div>
              <div className="w-full flex items-center justify-center gap-2">
                <h1 className="tracking-widetext shadow-text text-xs lg:text-base text-text  text-center font-bold">
                  Starting Price : {ethers.formatEther(String(startingPrice))}
                </h1>
                <img
                width={13}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA50lEQVR4nM2VMQrCMBSGPxQXR0EQXVyKPYGDm3fRXY8jOuikeAHtKQSvIYJ1LVUJJBBCbZs2Lf3hhxDyvh9e2jxokFpAIC3WzrUEvtIL1/Ae8NACnkDfZcBOgytvXcGnQJwQ8AFmZeFt4JYAV74DnTIB6xS48qoofAC8cgS8gVGRgFMOuPLRFu4DkUVAJGusNAY2GUHi6zoDE1t4V1t7wMEIiuSe96cmU3NgbwBUkAn25FlRY33JcUoL9BZaX7LQEAiNlvjSestCebZ5P1otT0Xlj10tz3UtA4eqR6aQGPRX4FLV0C+kH3n5iUHEyaU2AAAAAElFTkSuQmCC"
                  alt="ethereum"
                ></img>
              </div>
            </>
          ) : (
            <h1 className="text-xl text-text/70 font-bold my-auto">Enter an NFT ID to verify</h1>
          )}
        </div>
      </div>
    </div>
  );
}
