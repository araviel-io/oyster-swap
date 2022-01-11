import React, { useMemo } from "react";
import { PoolInfo } from "../../models";
import { useEnrichedPools } from "./../../context/market";
//import echarts from "echarts";


export const SupplyOverview = (props: { pool?: PoolInfo }) => {
  const { pool } = props;
  const pools = useMemo(() => (pool ? [pool] : []), [pool]);
  const enriched = useEnrichedPools(pools);



  if (enriched.length === 0) {
    return null;
  }

  return <div  style={{ height: 150, width: "100%" }} />;
};
