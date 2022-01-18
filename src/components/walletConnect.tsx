import React, { FunctionComponent } from "react";
import { useWallet } from "../context/wallet";
import { ExplorerLink } from "./explorerLink";
import { Button } from "@material-ui/core";

export const WalletConnect2: FunctionComponent = ({ children }) => {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || "";

  if (connected) {
    return (
      <div style={{ display: "flex" }}>

        <div style={{ cursor: "pointer" }}>{children}</div>
        <div>
          {connected && (
            <ExplorerLink
              type="address"
              address={publicKey}
              style={{ padding: 12 }}
            />
          )}
        </div>
        <div>
          <Button key="3" onClick={select}>
            Change Wallet
          </Button>
          {connected && (
            <Button
              key="2"
              style={{ color: "rgba(255, 0, 0, 0.7)" }}
              onClick={disconnect}
            >
              Disconnect
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Button onClick={connected ? disconnect : connect} >
      {connected ? "Disconnect" : "Connect"}
    </Button>
  );
};
