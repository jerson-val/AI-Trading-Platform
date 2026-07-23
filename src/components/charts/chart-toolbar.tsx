'use client'

import { SYMBOLS_OPTIONS } from "@/src/config/trading/symbols";
import { TIME_FRAMES_OPTIONS } from "@/src/config/trading/timeframes";
import Select from "../ui/select/Select";
import ChartCountdown from "./chart-countdown";
import { useTradingStore } from "@/src/store/trading.store";

export default function ChartToolbar(){

    const lastUpdatedCandle = useTradingStore((s) => s.lastUpdatedCandle)
    const candles = useTradingStore((s) => s.candles)
    const symbol = useTradingStore((s) => s.symbol)
    const setSymbol = useTradingStore((s) => s.setSymbol)
    const candleForCountdown = lastUpdatedCandle ?? candles[candles.length - 1]
    const timeframe = useTradingStore((s) => s.timeframe)
    const setTimeframe = useTradingStore((s) => s.setTimeframe)


    return (
         <div className="mb-4 flex items-center justify-between">

        <Select
          value={symbol}
          onChange={setSymbol}
          options={SYMBOLS_OPTIONS}
          className="w-52"
          isSearchable
        />

        <div className="flex items-center gap-3">

          {candleForCountdown && (
                <ChartCountdown
                    candleTime={Number(lastUpdatedCandle?.time)}
                    timeframe={timeframe}
                />
          )}

          {TIME_FRAMES_OPTIONS.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-lg px-3 py-1 text-sm transition-colors ${
                timeframe === tf
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#1f2937] hover:bg-blue-500'
              }`}
            >
              {tf}
            </button>
          ))}

        </div>

      </div>
    )
}