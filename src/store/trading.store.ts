import { create } from "zustand";
import { Candle } from "../types/trading/candle";

interface TradingStore {
  symbol: string;

  timeframe: string;

  candles: Candle[];

  setSymbol: (symbol: string) => void;

  setTimeframe: (timeframe: string) => void;

  setCandles: (candles: Candle[]) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: "BTCUSDT",

  timeframe: "1h",

  candles: [],

  setSymbol: (symbol) => set({ symbol }),

  setTimeframe: (timeframe) => set({ timeframe }),

  setCandles: (candles) => set({ candles }),
}));