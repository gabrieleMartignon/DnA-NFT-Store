import { useState, useEffect } from "react";

export default function Rarities() {
  const [buttonsTransitions, setButtonsTransitions] = useState<boolean>();
  const benefitsArray: string[][] = [
    ["Unlimited access to thousand of articles", "Weekly newsletter", "Private Discord community"],
    ["All Common rarity benefits", "Early access to articles (20 days)", "Monthly webinars", "20% discount on merchandise"],
    ["Everything in Uncommon +", "Exclusive research datasets", "35% discount on conferences", "Certification of participation"],
    ["Everything in Rare", "Monthly Q&A with researchers", "Governance voting rights", "50% discount on events"],
    ["Everything in Epic +", "Annual revenue sharing (10%)", "Exclusive VIP annual event", "Branded merchandise edition"],
  ];

  const [rarityIndexSelected, setRarityIndexSelected] = useState<number>(0);

  useEffect(() => {
    let a = document.querySelector("#benefits");
    console.log(a);
  }, [rarityIndexSelected]);

  return (
    <div
      className="flex flex-col min-h-screen bg-white lg:w-[75%] mx-auto gap-12 px-4 sm:px-6 lg:px-0 w-[85%] sm:w-[75%]"
      onMouseEnter={() => setButtonsTransitions(true)}
      onClick={() => setButtonsTransitions(true)}
    >
      <div className="flex flex-col mt-12 lg:mt-16 items-center justify-center gap-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent tracking-tighter text-balance text-center py-2 px-2">
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
          <div className="flex flex-col gap-4 w-full">
            <button
              className={`flex items-center justify-center relative h-auto overflow-hidden rounded-xl bg-linear-to-b from-yellow-200 to-amber-400 px-6 py-3 font-bold text-amber-900 text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/40 ${buttonsTransitions ? "opacity-100" : "opacity-50"} ${rarityIndexSelected == 4 ? "scale-105 shadow-lg" : "scale-100"}`}
              onClick={() => setRarityIndexSelected(4)}
            >
              <div className="relative">Legendary 4%</div>
            </button>

            <button
              className={`flex items-center justify-center relative h-auto overflow-hidden rounded-xl bg-linear-to-b from-purple-200 to-purple-400 px-6 py-3 text-purple-900 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/40 ${buttonsTransitions ? "opacity-100" : "opacity-50"} ${rarityIndexSelected == 3 ? "scale-105 shadow-lg" : "scale-100"}`}
              onClick={() => setRarityIndexSelected(3)}
            >
              <div className="relative">Epic 6%</div>
            </button>

            <button
              className={`flex items-center justify-center relative h-auto overflow-hidden rounded-xl bg-linear-to-b from-blue-200 to-blue-400 px-6 py-3 text-blue-900 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/40 ${buttonsTransitions ? "opacity-100" : "opacity-50"} ${rarityIndexSelected == 2 ? "scale-105 shadow-lg" : "scale-100"}`}
              onClick={() => setRarityIndexSelected(2)}
            >
              <div className="relative">Rare 15%</div>
            </button>

            <button
              className={`flex items-center justify-center relative h-auto overflow-hidden rounded-xl bg-linear-to-b from-emerald-200 to-emerald-400 px-6 py-3 text-emerald-900 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/40 ${buttonsTransitions ? "opacity-100" : "opacity-50"} ${rarityIndexSelected == 1 ? "scale-105 shadow-lg" : "scale-100"}`}
              onClick={() => setRarityIndexSelected(1)}
            >
              <div className="relative">Uncommon 25%</div>
            </button>

            <button
              className={`flex items-center justify-center relative overflow-hidden rounded-xl bg-linear-to-b from-gray-200 to-gray-400 px-6 py-3 text-gray-900 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-gray-400/40 ${buttonsTransitions ? "opacity-100" : "opacity-50"} ${rarityIndexSelected == 0 ? "scale-105 shadow-lg" : "scale-100"}`}
              onClick={() => setRarityIndexSelected(0)}
            >
              <div className="relative">Common 50%</div>
            </button>
          </div>
        </div>

        <div
          className={`bg-slate-50 w-full xl:w-[50%] rounded-xl items-center p-8 sm:p-10 lg:p-12 shadow-md flex flex-col gap-6 lg:gap-8 transition-all duration-300 border border-accent ${rarityIndexSelected >= 0 && rarityIndexSelected < 6 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 text-center border-l-6 border-accent pl-2 ">Benefits</p>
          <hr className="w-full rounded-2xl border-slate-300" />
          {rarityIndexSelected >= 0 && rarityIndexSelected < 6
            ? benefitsArray[rarityIndexSelected].map((benefit) => (
                <div
                  id="benefits"
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
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
