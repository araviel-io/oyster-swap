import React from "react";
import { useWallet } from "../context/wallet";
import { shortenAddress } from "./../utils/utils";
import { Identicon } from "./identicon";
import { useNativeAccount } from "./../utils/accounts";
import { LAMPORTS_PER_SAFE } from "@safecoin/web3.js";

export const NativeBalance = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();

  if (!wallet || !wallet.publicKey) {
    return null;
  }

  return (
      <span>
        {((account?.lamports || 0) / LAMPORTS_PER_SAFE).toFixed(6)}
      </span>
  );
};
