import { useState } from "react";
import { useNavigate } from "react-router";

export default function Menu() {
  const [isBuyOpen, setIsBuyOpen] = useState<boolean>(false);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);
  const [hoveredPage, setHoveredPage] = useState<string>("home");
  const [currentPage, setCurrentPage] = useState<string>("home");
  let navigate = useNavigate();

  const getTranslate = () => {
    switch (hoveredPage) {
      case "home":
        return "translate-x-[0%]";
      case "buy":
        return "translate-x-[100%]";
      case "verify":
        return "translate-x-[200%]";
      case "more":
        return "translate-x-[300%]";
    }
  };

  return (
    <>
      <div className="w-auto sm:w-[30vw] md:w-[30%] h-full text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
        <ul className="relative flex text-text rounded-2xl w-full ">
          <div className={`bg-accent/20 absolute w-[25%] h-full rounded-2xl ${getTranslate()} transition duration-300`}></div>
          <li
            className={`relative py-2 px-3 flex items-center justify-center rounded-lg transition duration-300 cursor-pointer w-[25%] ${currentPage}`}
            onMouseEnter={() => setHoveredPage("home")}
            onMouseLeave={() => setHoveredPage(currentPage)}
            onClick={() => {
              (setCurrentPage("home"), navigate("/Home"));
            }}
          >
            <a>Home</a>
          </li>
          <li
            className="relative py-2 px-3 flex items-center justify-center rounded-lg transition duration-300 cursor-pointer w-[25%]"
            onMouseEnter={() => {
              (setIsBuyOpen(true), setHoveredPage("buy"));
            }}
            onMouseLeave={() => {
              (setIsBuyOpen(false), setHoveredPage(currentPage));
            }}
            onClick={() => setCurrentPage("buy")}
          >
            <a>Buy</a>

            <div
              className={`absolute left-0 w-[30vw] min-w-47 h-auto  bg-white rounded-lg shadow-lg z-1 transition-all duration-400 top-full scale-85 ${
                isBuyOpen ? "opacity-100 visible" : "opacity-0 mt-10 invisible"
              }`}
            >
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-800 gap-3 sm:gap-5 hover:bg-accent/15 rounded-lg "
                onClick={() => {
                  (navigate("/Auctions"), setCurrentPage("buy"));
                }}
              >
                <img className="w-5 sm:w-7 " src="https://img.icons8.com/ios-filled/50/auction.png" alt="auction" />
                <div className="flex flex-col">
                  <h1 className="pr-2 ">
                    <b>Live Auctions</b>
                  </h1>
                  <h2 className="text-gray-400 py-1 tracking-wider">Discover unique items from selected auctions. Bid, win, and join DnA community.</h2>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-800 gap-3 sm:gap-5 hover:bg-accent/15 rounded-lg "
                onClick={() => {
                  (navigate("/Direct buy"), setCurrentPage("buy"));
                }}
              >
                <img className="w-5 sm:w-7" src="https://img.icons8.com/ios-filled/50/return-purchase.png" alt="purchase" />
                <div className="flex flex-col  ">
                  <h1 className="pr-2">
                    <b>Direct purchase</b>
                  </h1>
                  <h2 className="text-gray-400 py-1 tracking-wider">Secure now your DnA NFT to get immediate access to exclusive benefits.</h2>
                </div>
              </a>
            </div>
          </li>
          <li
            className={`relative py-2 px-3 flex items-center justify-center rounded-lg transition duration-300 cursor-pointer w-[25%]`}
            onMouseEnter={() => {
              setHoveredPage("verify");
            }}
            onMouseLeave={() => {
              setHoveredPage(currentPage);
            }}
            onClick={() => {
              (setCurrentPage("verify"), navigate("/Verify"));
            }}
          >
            <a>Verify</a>
          </li>
          <li
            className={`relative py-2 px-3 flex items-center justify-center rounded-lg transition duration-300 cursor-pointer w-[25%]`}
            onMouseEnter={() => {
              (setIsMoreOpen(true), setHoveredPage("more"));
            }}
            onMouseLeave={() => {
              (setIsMoreOpen(false), setHoveredPage(currentPage));
            }}
            onClick={() => setCurrentPage("more")}
          >
            <a>More</a>

            <div
              className={`absolute left-0 w-[30vw] min-w-34 h-auto  bg-white rounded-lg shadow-lg z-1 transition-all duration-400 top-full scale-85 ${
                isMoreOpen ? "opacity-100 top-full visible" : "opacity-0 mt-10 invisible"
              }`}
            >
              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-800 gap-3 sm:gap-5 hover:bg-accent/15 rounded-lg "
                onClick={() => {
                  (setCurrentPage("more"), navigate("/History"));
                }}
              >
                <img className="w-5 sm:w-7" src="https://img.icons8.com/dotty/80/activity-history.png" alt="history" />
                <div className="flex flex-col ">
                  <h1 className="pr-2 ">
                    <b>Your history</b>
                  </h1>
                  <h2 className="text-gray-400 py-1 tracking-wider">Review your bids</h2>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center px-4 py-2 text-gray-800 gap-3 sm:gap-5 hover:bg-accent/15 rounded-lg "
                onClick={() => {
                  (setCurrentPage("more"), navigate("/About"));
                }}
              >
                <img className="w-5 sm:w-7" src="https://img.icons8.com/ios-filled/50/question-mark.png" alt="about" />
                <div className="flex flex-col ">
                  <h1 className="pr-2">
                    <b>About</b>
                  </h1>
                  <h2 className="text-gray-400  py-1  tracking-wider ">More about this web3 app....</h2>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
