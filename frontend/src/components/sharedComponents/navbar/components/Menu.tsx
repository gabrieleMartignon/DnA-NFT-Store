import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

export type pagesType = "Home" | "Buy" | "Verify" | "More";

export default function Menu() {
  
  const [hoveredPage, setHoveredPage] = useState<pagesType>("Home");
  const [currentPage, setCurrentPage] = useState<pagesType>("Home");

  const getTranslate = () => {
    switch (hoveredPage) {
      case "Home":
        return "0%";
      case "Buy":
        return "100%";
      case "Verify":
        return "200%";
      case "More":
        return "300%";
    }
  };

  useEffect(() => {
    document.title = `DnA NFTs | ${currentPage}`;
}, [currentPage]);

  return (
    <>
      <div className="w-auto sm:w-[30vw] md:w-[30%] h-full text-[10px] sm:text-xs md:text-sm flex items-center justify-center">
        <ul className="relative flex text-text rounded-2xl w-full">
          <div className={`bg-accent/20 absolute w-[25%] h-full rounded-2xl transition-all duration-300`}
          style={{ transform: `translateX(${getTranslate()})` }}></div>
          <MenuItem
            pageName="Home"
            setHoveredPage={setHoveredPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasDropdown={false}
            onNavigate={["/Home"]}
          />
          <MenuItem
            pageName="Buy"
            setHoveredPage={setHoveredPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasDropdown={true}
            onNavigate={["/Auctions", "/DirectBuy"]}
            titles={["Live Auctions", "Direct purchase"]}
            descriptions={[
              "Discover unique items from selected auctions. Bid, win, and join DnA community.",
              "Secure now your DnA NFT to get immediate access to exclusive benefits.",
            ]}
            imgSrc={["https://img.icons8.com/ios-filled/50/auction.png", "https://img.icons8.com/ios-filled/50/return-purchase.png"]}
          />
          <MenuItem
            pageName="Verify"
            setHoveredPage={setHoveredPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasDropdown={false}
            onNavigate={["/Verify"]}
          />
          <MenuItem
            pageName="More"
            setHoveredPage={setHoveredPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            hasDropdown={true}
            onNavigate={["/History", "About"]}
            titles={["Your Bids", "About"]}
            descriptions={["Review your bids", "More about this web3 app...."]}
            imgSrc={["https://img.icons8.com/dotty/80/activity-history.png", "https://img.icons8.com/ios-filled/50/question-mark.png"]}
          />
        </ul>
      </div>
    </>
  );
}
