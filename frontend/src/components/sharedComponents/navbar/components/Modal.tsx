import { ConnectButton } from "thirdweb/react";
import { client } from "../../../../scripts/thirdWebClient";
import { sepolia } from "thirdweb/chains";

export default function Modal() {
  return (
    <ConnectButton
      client={client}
      connectModal={{
        title: "Sign to DnA NFT Store",
      }}
      connectButton={{
        label: "Connect",
        style: {
          scale: 0.8,
          minWidth: "80px",
          background: "#06b6d4",
          color: "#ffffff",
          height: "auto",
          padding: "12px",
          margin: "-5px",
        },
      }}
      detailsButton={{
        style: {
          scale: 0.65,
          margin: "-25px",
        },
      }}
      chain={sepolia}
    />
  );
}
