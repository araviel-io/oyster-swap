import React from "react";
import { Button, Menu } from "antd";
import { useWallet } from "../context/wallet";
import { AccountInfo } from "./accountInfo";
import { WalletConnect } from "./walletConnect";
import { Link, useHistory, useLocation } from "react-router-dom";
import powerlogo from "../assets/powrlogo.svg"

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  const { connected } = useWallet();
  const location = useLocation();
  const history = useHistory();

  const TopBar = (
    <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
      <div className="App-Bar">
        <div className="App-Bar-left">

          <img
            src={powerlogo}
            alt="sPortal"
            className="PW-Logo"
          />
          <div className="App-Bar-left-title">
            Solstice Staking Portal</div>
          {props.left}
        </div>
        <div className="App-Bar-right">
          <WalletConnect>
            <AccountInfo />
          </WalletConnect>

          {props.right}
        </div>
      </div>
    </div>
  );

  return TopBar;
};
