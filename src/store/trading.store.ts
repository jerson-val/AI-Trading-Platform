import { create } from "zustand";
import { Candle } from "../types/trading/candle";

interface TradingStore {
  symbol: string;

  timeframe: string;

  lastUpdatedCandle: Candle | null;

  candles: Candle[];

  isLoadingHistory: boolean;

  setLoadingHistory: (loading: boolean) => void;

  setSymbol: (symbol: string) => void;

  setTimeframe: (timeframe: string) => void;

  setCandles: (candles: Candle[]) => void;

  updateLastCandle: (candle: Candle) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: "BTCUSDT",

  timeframe: "1h",

  candles: [],

  isLoadingHistory: false,

  lastUpdatedCandle: null,

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