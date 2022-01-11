import React, { useCallback, useContext, useEffect, useState } from "react";
import { POOLS_WITH_AIRDROP } from "./../models/airdrops";
import { MINT_TO_MARKET } from "./../models/marketOverrides";
import {
  convert,
  getPoolName,
  getTokenName,
  KnownTokenMap,
  STABLE_COINS,
} from "./../utils/utils";
import { useConnectionConfig } from "./../utils/connection";
import {
  cache,
  getMultipleAccounts,
  MintParser,
  ParsedAccountBase,
  useCachedPool,
} from "./../utils/accounts";
import { Market, MARKETS, Orderbook, TOKEN_MINTS } from "@project-serum/serum";
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import { PoolInfo } from "../models";
import { EventEmitter } from "./../utils/eventEmitter";
import { LIQUIDITY_PROVIDER_FEE, SERUM_FEE } from "../utils/pools";

interface RecentPoolData {
  pool_identifier: string;
  volume24hA: number;
}

export interface MarketsContextState {
  midPriceInUSD: (mint: string) => number;
  marketEmitter: EventEmitter;
  accountsToObserve: Map<string, number>;
  marketByMint: Map<string, SerumMarket>;

  subscribeToMarket: (mint: string) => () => void;

  dailyVolume: Map<string, RecentPoolData>;
}


const MarketsContext = React.createContext<MarketsContextState | null>(null);

//const marketEmitter = new EventEmitter();

export function MarketProvider({ children = null as any }) {



  return (
    <div></div>
  );
}


export const useEnrichedPools = (pools: PoolInfo[]) => {
  const context = useContext(MarketsContext);
  const { tokenMap } = useConnectionConfig();
  const [enriched, setEnriched] = useState<any[]>([]);
  const subscribeToMarket = context?.subscribeToMarket;
  const marketEmitter = context?.marketEmitter;
  const marketsByMint = context?.marketByMint;
  const dailyVolume = context?.dailyVolume;
  console.log("serum useEnrichedPools", context)

  console.log("enriched : ", enriched)
  return enriched;
};

// TODO:
// 1. useEnrichedPools
//      combines market and pools and user info
// 2. ADD useMidPrice with event to refresh price
// that could subscribe to multiple markets and trigger refresh of those markets only when there is active subscription

interface SerumMarket {
  marketInfo: {
    address: PublicKey;
    name: string;
    programId: PublicKey;
    deprecated: boolean;
  };

  // 1st query
  marketAccount?: AccountInfo<Buffer>;

  // 2nd query
  mintBase?: AccountInfo<Buffer>;
  mintQuote?: AccountInfo<Buffer>;
  bidAccount?: AccountInfo<Buffer>;
  askAccount?: AccountInfo<Buffer>;
  eventQueue?: AccountInfo<Buffer>;

  swap?: {
    dailyVolume: number;
  };

  midPrice?: (mint?: PublicKey) => number;
}
