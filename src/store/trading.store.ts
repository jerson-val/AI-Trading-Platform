import { create } from 'zustand'

interface TradingState {
  selectedSymbol: string
  selectedTimeframe: string

  setSymbol: (symbol: string) => void
  setTimeframe: (timeframe: string) => void
}

export const useTradingStore = create<TradingState>((set) => ({
  selectedSymbol: 'BTCUSDT',
  selectedTimeframe: '5m',

  setSymbol: (symbol) =>
    set({ selectedSymbol: symbol }),

  setTimeframe: (timeframe) =>
    set({ selectedTimeframe: timeframe }),
}))