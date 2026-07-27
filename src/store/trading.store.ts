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

  isLoadingOlderHistory: boolean;

  setPairs: (pairs: string[]) => void;

  setLoadingPairs: (loading: boolean) => void;

  setLoadingHistory: (loading: boolean) => void;

  setLoadingOlderHistory: (loading: boolean) => void;

  setSymbol: (symbol: string) => void;

  setTimeframe: (timeframe: string) => void;

  setCandles: (candles: Candle[]) => void;

  updateLastCandle: (candle: Candle) => void;

  prependCandles: (candles: Candle[]) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: "",

  timeframe: "30m",

  candles: [],

  pairs: [],

  isLoadingPairs: false,

  isLoadingHistory: false,

  lastUpdatedCandle: null,

  isLoadingOlderHistory: false,

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

  setLoadingOlderHistory: (loading) => set({
      isLoadingOlderHistory: loading,
  }),

  setSymbol: (symbol) => set({ symbol }),

  setTimeframe: (timeframe) => set({ timeframe }),

  setCandles: (candles) => set({ 
    candles,
    lastUpdatedCandle: null
  }),

  prependCandles: (olderCandles) =>
   set((state) => ({
       candles: [
           ...olderCandles,
           ...state.candles,
       ],
  })),

  updateLastCandle: (candle) =>
    set({
        lastUpdatedCandle: candle
    })
}));