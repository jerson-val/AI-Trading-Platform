'use client'

import { useEffect } from "react";
import { getCandles } from "../../services/trading/trading.service";
import { useTradingStore } from "../../store/trading.store";
import { useAuthStore } from "../../store/auth.store";
import { useLoaderStore } from "../../store/loader.store";
import { getPreferredSymbol } from "@/src/services/settings/settings.service";

export const useSymbol = () => {
  const setSymbol = useTradingStore((s) => s.setSymbol);
  const symbol = useTradingStore((s) => s.symbol);
  const authStatus = useAuthStore(state => state.authStatus);

  const showLoader = useLoaderStore((state) => state.show)
  const hideLoader = useLoaderStore((state) => state.hide)

  useEffect(() => {

    if (authStatus !== 'authenticated' || symbol )return;

    showLoader()

    const load = async () => {
       try {
        const response = await getPreferredSymbol();

        setSymbol(response.preferredPair);
      } finally {
        hideLoader();
      }
    } 

    load();
  }, [authStatus]);
};