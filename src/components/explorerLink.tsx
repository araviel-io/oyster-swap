import React from "react";
import { Typography } from "@material-ui/core"
import { shortenAddress } from "./../utils/utils";
import { PublicKey } from "@safecoin/web3.js";

export const ExplorerLink = (props: {
  address: string | PublicKey;
  type: string;
  code?: boolean;
  style?: React.CSSProperties;
  length?: number;
}) => {
  const { type, code } = props;

  const address =
    typeof props.address === "string"
      ? props.address
      : props.address?.toBase58();

  if (!address) {
    return null;
  }

  const length = props.length ?? 9;

  return (
    <a
      href={`https://explorer.solana.com/${type}/${address}`}
      // eslint-disable-next-line react/jsx-no-target-blank
      target="_blank"
      title={address}
      style={props.style}
    >
      {code ? (
        <Typography style={props.style}>
          <pre>{shortenAddress(address, length)}</pre>
        </Typography>
      ) : (
        shortenAddress(address, length)
      )}
    </a>
  );
};
