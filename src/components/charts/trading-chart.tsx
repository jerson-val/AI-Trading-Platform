'use client'

import { useEffect, useRef } from 'react'
import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts'
import { useTradingStore } from '@/src/store/trading.store'
import { TIME_FRAMES_OPTIONS } from '@/src/config/trading/timeframes'
import SelectCustom from '../ui/select/selectCustom'
import { SYMBOLS_OPTIONS } from '@/src/config/trading/symbols'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const chartRef = useRef<IChartApi | null>(null)

  const candleSeriesRef =
    useRef<ISeriesApi<'Candlestick'> | null>(null)

  const candles = useTradingStore((state) => state.candles)

  const symbol = useTradingStore((state) => state.symbol)

  const timeframe = useTradingStore((state) => state.timeframe)

  const setSymbol = useTradingStore(state => state.setSymbol);

  const setTimeframe =
    useTradingStore((state) => state.setTimeframe)

  /* ==========================
     CREATE CHART (ONLY ONCE)
  ========================== */
  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#111827',
        },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: {
          color: '#1f2937',
        },
        horzLines: {
          color: '#1f2937',
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    })

    const candleSeries = chart.addCandlestickSeries()

    candleSeries.setData(candles)

    chartRef.current = chart
    candleSeriesRef.current = candleSeries

    const handleResize = () => {
      if (!chartContainerRef.current) return

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [])

  /* ==========================
     UPDATE CANDLES
  ========================== */ 
  useEffect(() => {
    if (!candleSeriesRef.current) return

    candleSeriesRef.current.setData(candles)
  }, [candles])

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-4">
      <div className="mb-4 flex items-center justify-between">
        <SelectCustom
            value={symbol}
            onChange={setSymbol}
            options={SYMBOLS_OPTIONS}
            isSearchable
            className="w-52"
        />

        <div className="flex gap-2">
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

      <div
        ref={chartContainerRef}
        className="min-h-0 flex-1"
      />
    </div>
  )
}