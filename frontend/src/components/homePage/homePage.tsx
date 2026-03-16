import { heroImages } from "../../assets/imgs/imagesExports";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/imgs/DnA_logo.svg";
import Stats from "./stats";
import Rarities from "./rarities";
import Footer from "./footer";

export default function Hero() {
  const imgsPosition: string[] = ["top-0 left-0", "top-0 left-3/4", "top-1/3 left-1/6", "top-1/3 left-2/3", "top-2/3 left-0", "top-2/3 left-3/4"];
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
    const interval = setInterval(() => {
      animateRandomNFT();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute justify-around flex lg:flex-row flex-col top-[10vh] sm:top-[18vh] lg:top-[23vh] left-0 sm:left-1/11 md:left-1/9 z-1 w-screen sm:w-[80vw] h-auto lg:h-[60vh] sm:scale-85 md:scale-100 scale-100">
        <div className="flex flex-col h-full gap-3 md:gap-5 lg:gap-7 lg:justify-center items-center lg:items-start md:pb-10 text-center lg:text-start">
          <img src={logo} alt="DnA Logo" className="w-45 rounded-xl" />
          <h1 className="text-5xl sm:text-4xl md:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-relaxed text-balance px-2">
            Your Web3 access to Scientific Information
          </h1>
          <p className=" md:text-lg text-base text-muted max-w-3xl mx-auto leading-relaxed font-light text-text/70 tracking-wide text-balance">
            Get access to exclusive DnA material, premium articles, e-books, courses and much more.
            <br />
            Join our community of researchers and innovators.
          </p>
          <button
            className="px-8 py-2 rounded-full text-white font-semibold text-lg shadow-lg  transition-all duration-300 transform sm:scale-100 scale-90 hover:scale-105 bg-primary hover:text-primary hover:bg-white cursor-pointer hover:shadow-2xl hover:shadow-primary"
            onClick={() => {
              navigate("/Auctions");
            }}
          >
            Get your NFT!
          </button>
        </div>

        <div className="w-full relative mt-16 sm:mt-10md:mt-20 lg:mt-0 flex justify-center gap-1 sm:gap-2 flex-wrap sm:flex-nowrap ">
          {imgsPosition.map((imageData: string, i: number) => {
            return (
              <img
                key={i}
                src={heroImages[i]}
                alt="NFT image"
                className={`lg:absolute w-14 sm:w-25 md:w-27 lg:w-31 rounded-2xl border-2 sm:border-4 border-accent transition-all duration-1500 ease-in-out lg:ml-6 ${
                  imgChosenAnimation === i + 1
                    ? `top-1/2 lg:left-1/2 ${ i > 2 ? "-translate-x-1/2" : "translate-x-1/2"} lg:-translate-x-1/2 -translate-y-1/2 scale-200 sm:scale-175 z-50 shadow-xl shadow-primary drop-shadow-2xl `
                    : `${imageData} z-2`
                }
            }`}
              />
            );
          })}
        </div>
      </div>
      <Stats />
      <Rarities />
      <Footer />
    </>
  );
}

