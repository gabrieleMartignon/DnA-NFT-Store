import { useState } from "react";

export default function Rarities() {
  const [buttonsTransitions, setButtonsTransitions] = useState<boolean>(false);
  const [rarityIndexSelected, setRarityIndexSelected] = useState<number>(0);
  type tierType = {
    rarity: string;
    supply: number;
    benefits: string[];
    buttonProperty: string;
  };
  const tiersArray: tierType[] = [
    {
      rarity: "Legendary",
      supply: 4,
      benefits: ["Everything in Epic +", "Annual revenue sharing (10%)", "Exclusive VIP annual event", "Branded merchandise edition"],
      buttonProperty: "text-amber-900 from-yellow-200 to-amber-400 hover:shadow-amber-400/40 duration-1700",
    },
    {
      rarity: "Epic",
      supply: 7,
      benefits: ["Everything in Rare", "Monthly Q&A with researchers", "Governance voting rights", "50% discount on events"],
      buttonProperty: "text-purple-900 from-purple-200 to-purple-400 hover:shadow-purple-400/40 duration-1400",
    },
    {
      rarity: "Rare",
      supply: 14,
      benefits: ["Everything in Uncommon +", "Exclusive research datasets", "35% discount on conferences", "Certification of participation"],
      buttonProperty: "text-blue-900 from-blue-200 to-blue-400 hover:shadow-blue-400/40 duration-1100",
    },
    {
      rarity: "Uncommon",
      supply: 25,
      benefits: ["Everything in Common +", "Early access to articles (20 days)", "Monthly webinars", "20% discount on merchandise"],
      buttonProperty: "text-green-900 from-green-200 to-green-400 hover:shadow-green-400/40 duration-800",
    },
    {
      rarity: "Common",
      supply: 50,
      benefits: ["Unlimited access to thousand of articles", "Weekly newsletter", "Private Discord community"],
      buttonProperty: "text-gray-900 from-gray-200 to-gray-400 hover:shadow-gray-400/40 duration-500",
    },
  ];

  return (
    <div
      className="flex border-t-2 border-accent flex-col min-h-screen bg-white lg:w-[75%] mx-auto gap-12 px-4 sm:px-6 lg:px-0 w-[85%] sm:w-[75%]"
      onMouseEnter={() => setButtonsTransitions(true)}
      onClick={() => setButtonsTransitions(true)}
    >
      <div className="flex flex-col mt-12 lg:mt-16 items-center justify-center gap-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-relaxed text-balance text-center py-2 px-2">
          Rarity benefits
        </h1>
        <div className="w-16 sm:w-20 lg:w-24 h-1 mx-auto bg-accent rounded-full"></div>
        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-light tracking-wide text-balance text-center">
          Discover the exclusive benefits unlocked with each rarity tier.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row w-full justify-evenly gap-12 lg:gap-16 ">
        <div className="flex flex-col items-center p-8 sm:p-10 lg:p-12 w-full xl:w-[50%] gap-8 bg-white rounded-xl shadow-md border border-accent">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 text-center border-l-6 border-accent pl-2 ">Supply Distribution</p>
          <hr className="w-full rounded-2xl border-slate-300" />
          <div className="flex flex-col items-center gap-4 w-full">
            {tiersArray.map((rarityInfo: tierType, i) => {
              return (
                <button
                  className={`${rarityInfo.buttonProperty} mx-auto flex items-center justify-center relative h-auto overflow-hidden rounded-xl bg-linear-to-b  px-6 py-3 font-bold text-sm transition-all hover:shadow-lg${buttonsTransitions ? "opacity-100 duration-400 w-full visible" : "opacity-50 w-0 text-[0px] invisible"} ${rarityIndexSelected == i ? "scale-105 shadow-lg outline" : "scale-100 "}`}
                  onClick={() => setRarityIndexSelected(i)}
                >
                  <div className="relative">{rarityInfo.rarity + " " + rarityInfo.supply + "%"}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className={`bg-slate-50 w-full xl:w-[50%] rounded-xl items-center p-8 sm:p-10 lg:p-12 shadow-md flex flex-col gap-6 lg:gap-8 transition-all duration-300 border border-accent ${rarityIndexSelected >= 0 && rarityIndexSelected < 6 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 text-center border-l-6 border-accent pl-2 ">Benefits</p>
          <hr className="w-full rounded-2xl border-slate-300" />
          {rarityIndexSelected >= 0 && rarityIndexSelected < 6
            ? tiersArray[rarityIndexSelected].benefits.map((benefit) => {
                return (
                  <div
                    key={benefit}
                    className="flex items-center w-full gap-4 border-l-4 border-primary rounded-lg px-4 py-3 bg-white hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-5 h-5 text-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">{benefit}</p>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
