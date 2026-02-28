import logo from "../../assets/imgs/Logo.png";
import image1 from "../../assets/imgs/1.png";
import image2 from "../../assets/imgs/2.png";
import image3 from "../../assets/imgs/3.png";
import image4 from "../../assets/imgs/4.png";
import image5 from "../../assets/imgs/5.png";
import image6 from "../../assets/imgs/6.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Stats from "./stats";
import Rarities from "./rarities";
import Footer from "./footer";

export default function () {
  const [imgChosenAnimation, setImgChosenAnimation] = useState<number>(0);
  const navigate = useNavigate();

  function animateRandomNFT() {
    let randomNum: number = Math.floor(Math.random() * 6) + 1;
    setImgChosenAnimation(randomNum);

    setTimeout(() => {
      setImgChosenAnimation(0);
    }, 2000);
  }

  useEffect(() => {
    setInterval(() => {
      animateRandomNFT();
    }, 3500);
  }, []);

  return (
    <>
      <div className="absolute justify-around flex lg:flex-row flex-col top-[18vh] lg:top-[23vh] left-0 sm:left-1/11 md:left-1/9 z-1 w-screen sm:w-[80vw] h-auto lg:h-[60vh] sm:scale-85 md:scale-100 scale-100">
        <div className="flex flex-col h-full gap-5 sm:gap-3 md:gap-5 lg:gap-7 lg:justify-center  items-center lg:items-start md:pb-10 text-center lg:text-start">
          <img src={logo} alt="DnA Logo" className="w-20" />
          <h1 className="text-6xl sm:text-4xl md:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-tighter text-balance">
            Your Web3 access to Scientific Information
          </h1>
          <p className="text-lg md:text-lg sm:text-base  text-muted max-w-3xl mx-auto leading-relaxed font-light text-text/70 tracking-wide text-balance">
            Get access to exclusive DnA material, premium articles, e-books, courses and much more.
            <br />
            Join our community of researchers and innovators.
          </p>
          <button
            className="px-8 py-2 rounded-full text-white font-semibold text-lg shadow-lg  transition-all duration-300 transform hover:scale-105 bg-primary hover:text-primary hover:bg-white cursor-pointer hover:shadow-2xl hover:shadow-primary"
            onClick={() => {
              navigate("/Auctions");
            }}
          >
            Get your NFT!
          </button>
        </div>

        <div className="w-full relative mt-20 lg:mt-0 flex justify-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
          <img
            src={image1}
            alt=""
            className={`lg:absolute w-16 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all  duration-1500 ease-in-out lg:ml-6 ${
              imgChosenAnimation === 1
                ? "top-1/2 lg:left-1/2 translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl "
                : "top-0 left-0 z-2"
            }`}
          />

          <img
            src={image2}
            alt=""
            className={`lg:absolute  w-16 sm:w-25 md:w-27 lg:w-31  rounded-2xl border-2 sm:border-4 border-accent transition-all  duration-1500  ease-in-out   ${
              imgChosenAnimation === 2
                ? "top-1/2 lg:left-1/2 translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl  "
                : "top-0 left-3/4 z-2"
            }`}
          />

          <img
            src={image3}
            alt=""
            className={`lg:absolute w-16 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all  duration-1500 ease-in-out   ${
              imgChosenAnimation === 3
                ? "top-1/2 lg:left-1/2 translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl"
                : "top-1/3 left-1/6 z-2"
            }`}
          />

          <img
            src={image4}
            alt=""
            className={`lg:absolute  w-16 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all  duration-1500 ease-in-out  ${
              imgChosenAnimation === 4
                ? "top-1/2 lg:left-1/2 -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl"
                : "top-1/3 left-2/3 z-2"
            }`}
          />

          <img
            src={image5}
            alt=""
            className={`lg:absolute  w-16 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all  duration-1500 ease-in-out  ${
              imgChosenAnimation === 5
                ? "top-1/2 lg:left-1/2 -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl"
                : "top-2/3 left-0 z-2"
            }`}
          />
          <img
            src={image6}
            alt=""
            className={`lg:absolute w-16 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all linear duration-1500 ease-in-out  ${
              imgChosenAnimation === 6
                ? "top-1/2 lg:left-1/2 -translate-x-1/2 lg:-translate-x-1/2 -translate-y-1/2 scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl"
                : "top-2/3 left-3/4 z-2"
            }`}
          />
        </div>
      </div>
      <Stats />
      <Rarities />
      <Footer />
    </>
  );
}
