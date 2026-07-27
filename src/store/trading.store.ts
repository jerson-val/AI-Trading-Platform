import { create } from "zustand";
import { Candle } from "../types/trading/candle";

interface TradingStore {
  symbol: string;

  timeframe: string;

  lastUpdatedCandle: Candle | null;

  candles: Candle[];

  pairs: string[];

  isLoadingPairs: boolean;

  isLoadingHistory: boolean;

  setPairs: (pairs: string[]) => void;

  setLoadingPairs: (loading: boolean) => void;

  setLoadingHistory: (loading: boolean) => void;

  setSymbol: (symbol: string) => void;

  setTimeframe: (timeframe: string) => void;

  setCandles: (candles: Candle[]) => void;

  updateLastCandle: (candle: Candle) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: "",

  timeframe: "30m",

  candles: [],

  pairs: [],

  isLoadingPairs: false,

  isLoadingHistory: false,

  lastUpdatedCandle: null,

  setPairs: (pairs) =>
    set({
        pairs,
    }),

  setLoadingPairs: (loading) =>
    set({
        isLoadingPairs: loading,
  }),

  setLoadingHistory: (loading) => set({
    isLoadingHistory: loading
  }),

  setSymbol: (symbol) => set({ symbol }),

  setTimeframe: (timeframe) => set({ timeframe }),

  setCandles: (candles) => set({ 
    candles,
    lastUpdatedCandle: null
   }),

  updateLastCandle: (candle) =>
    set({
        lastUpdatedCandle: candle
    })
}));