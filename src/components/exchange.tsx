import React from "react";
import { Card } from "@material-ui/core"
import { TradeEntry } from "./trade";
// TODO: remove AddToLiquidity for w integration
//import { AddToLiquidity } from "./pool/add";
import { Settings } from "./settings";
import { SettingOutlined } from "@ant-design/icons";
//import { AppBar } from "./appBar";
import { useHistory, useLocation } from "react-router-dom";
import { WalletConnect2 } from "./walletConnect";
import { AccountInfo } from "./accountInfo";

export const ExchangeView = (props: {}) => {
  const tabStyle: React.CSSProperties = { width: 120 };
  const tabList = [
    {
      key: "trade",
      tab: <div style={tabStyle}>Trade</div>,
      render: () => {
        return <TradeEntry />;
      },
    }/*,
    {
      key: "pool",
      tab: <div style={tabStyle}>Pool</div>,
      render: () => {
        return <AddToLiquidity />;
      },
    },*/
  ];

  const location = useLocation();
  const history = useHistory();
  const activeTab = location.pathname.indexOf("add") < 0 ? "trade" : "pool";

  return (
    <>

      <div>
        <div>
        <Settings />
     
        </div>
        <WalletConnect2>
          <AccountInfo />
        </WalletConnect2>
      </div>
      <Card
        className="exchange-card"
        style={{position:"relative",padding: 0 }}
        //headStyle={{ padding: 0 }}
        //bodyStyle={{ position: "relative" }}
      >
        {tabList.find((t) => t.key === activeTab)?.render()}
      </Card>
    </>
  );
};
