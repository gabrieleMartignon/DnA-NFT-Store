export type alertMessage = {
  error?: string;
  message: string;
  isActive: boolean;
};

export default function Alert(props: alertMessage) {
  let txHash: string = props.message;

  return (
    <div
      className={`h-18 w-75 border-2 border-accent bg-white absolute top-[10vh] ${props.isActive ? "left-3/12 md:left-7/12 xl:left-9/12" : "left-14/12 "} flex z-10 p-2 rounded-xl  justify-between items-center text-text/90 transition-all ease-in-out duration-400`}
    >
      <div className="w-[20%] ">
        {props.error == "Bid registered" ? (
          <img width="35" height="35" src="https://img.icons8.com/flat-round/64/checkmark.png" alt="checkmark" />
        ) : (
          <img src="https://img.icons8.com/?size=100&id=63690&format=png&color=000000" alt="alert Icon" height="35" width="35" />
        )}
      </div>
      <div className="flex font-montserrat flex-col w-full text-xs ">
        <h1 className="text-shadow-md font-semibold mb-1">{props.error}</h1>
        <p className="font-medium  text-text/70">
          {props.error == "Bid registered" ? (
            <a target="_blank" href={`https://sepolia.etherscan.io/tx/${txHash}`} className="underline">
              View transaction
            </a>
          ) : (
            String(props.message)
          )}
        </p>
      </div>
    </div>
  );
}
