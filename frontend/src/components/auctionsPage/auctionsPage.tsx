import AuctionsGroup from "./auctionsGroup";
import Countdown from "./Countdown";

export default function AuctionsPage() {
  return (
    <>
      <div className="w-screen h-auto absolute  flex items-center justify-center flex-col gap-4 md:top-[15vh] top-[10vh]  transition-all overflow-x-hidden overflow-y-hidden">
        <div className="flex items-center justify-between gap-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent tracking-tighter md:w-auto flex justify-center pr-1 text-center">
            Active Auctions
          </h1>
        </div>
        <p className=" md:text-lg text-[15px] w-auto text-muted max-w-3xl mx-auto leading-relaxed font-light text-text/70 tracking-wide text-balance text-center">
          Secure your bid and become part of DnA community!
        </p>
        <Countdown />
        <AuctionsGroup />
      </div>
    </>
  );
}
