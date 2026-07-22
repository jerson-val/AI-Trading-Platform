'use client'

import { useEffect } from "react";
import { getCandles } from "../services/trading/trading.service";
import { useTradingStore } from "../store/trading.store";
import { useAuthStore } from "../store/auth.store";
import { useLoaderStore } from "../store/loader.store";

export const useTrading = () => {
  const symbol = useTradingStore((s) => s.symbol);

  const timeframe = useTradingStore((s) => s.timeframe);

  const setCandles = useTradingStore((s) => s.setCandles);

  const setLoadingHistory = useTradingStore((s) => s.setLoadingHistory)
  
  const authStatus = useAuthStore(state => state.authStatus);

  const showLoader = useLoaderStore((state) => state.show)
  const hideLoader = useLoaderStore((state) => state.hide)

  useEffect(() => {

    setLoadingHistory(true);

    setCandles([]);

    if (authStatus !== 'authenticated')return;

    showLoader()

    const load = async () => {
       try {
        const candles = await getCandles(
          symbol,
          timeframe,
          500
        );

        setCandles(candles);
        setLoadingHistory(false);
      } finally {
        hideLoader();
        setLoadingHistory(false);
      }
    } 

    load();
  }, [symbol, timeframe, authStatus]);
};