import { create } from "zustand";
import { Candle } from "../types/trading/candle";

interface TradingStore {
  symbol: string;

  timeframe: string;

  candles: Candle[];

  setSymbol: (symbol: string) => void;

  setTimeframe: (timeframe: string) => void;

  setCandles: (candles: Candle[]) => void;

  updateLastCandle: (candle: Candle) => void;
}

export const useTradingStore = create<TradingStore>((set) => ({
  symbol: "BTCUSDT",

  timeframe: "1h",

  candles: [],

  setSymbol: (symbol) => set({ symbol }),

  setTimeframe: (timeframe) => set({ timeframe }),

  setCandles: (candles) => set({ candles }),

  updateLastCandle: (candle) =>
  set((state) => {

    const candles = [...state.candles];

    const last =
      candles[candles.length - 1];

    if (!last) {
      return {
        candles: [candle],
      };
    }

    if (last.time === candle.time) {
      candles[candles.length - 1] =
        candle;
    } else {
      candles.push(candle);
    }

    return {
      candles,
    };
  }),
}));