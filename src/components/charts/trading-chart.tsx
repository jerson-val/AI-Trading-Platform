'use client'

import { useEffect, useRef } from 'react'
import {
  CandlestickSeries,
  ColorType,
  createChart,
  CrosshairMode,
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts'

import { useTradingStore } from '@/src/store/trading.store'
import { TIME_FRAMES_OPTIONS } from '@/src/config/trading/timeframes'
import { SYMBOLS_OPTIONS } from '@/src/config/trading/symbols'

import Select from '../ui/select/Select'
import ChartCountdown from './chart-countdown'
import { Clock3 } from 'lucide-react'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const chartRef = useRef<IChartApi | null>(null)

  const candleSeriesRef =
    useRef<ISeriesApi<'Candlestick'> | null>(null)

  const candles = useTradingStore((s) => s.candles)

  const lastUpdatedCandle =
    useTradingStore((s) => s.lastUpdatedCandle)

  const symbol = useTradingStore((s) => s.symbol)

  const timeframe =
    useTradingStore((s) => s.timeframe)

  const setSymbol =
    useTradingStore((s) => s.setSymbol)

  const setTimeframe =
    useTradingStore((s) => s.setTimeframe)

  const isLoadingHistory =
    useTradingStore((s) => s.isLoadingHistory)

  const candleForCountdown =
    lastUpdatedCandle ??
    candles[candles.length - 1];

  /*
  ==========================
  CREATE CHART
  ==========================
  */

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

      crosshair: {
        mode: CrosshairMode.Normal,
      },

      localization: {
        priceFormatter: (price: number) =>
          price.toFixed(2),
      },

      handleScroll: true,
      handleScale: true,

      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
    })

    const series = chart.addSeries(
        CandlestickSeries,
        {
            lastValueVisible: true,
        }
    );

    chartRef.current = chart
    candleSeriesRef.current = series

    const resize = () => {
      if (!chartContainerRef.current) return

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      })
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      chart.remove()
    }
  }, [])

  /*
  ==========================
  LOAD HISTORY
  ==========================
  */

  useEffect(() => {

    if (!chartRef.current || 
        !candleSeriesRef.current ||
        ! candles) return;

    candleSeriesRef.current.setData(candles);

    chartRef.current.priceScale("right").applyOptions({
        autoScale: true,
    });

}, [symbol, timeframe, isLoadingHistory]);

  /*
  ==========================
  LIVE UPDATE
  ==========================
  */

  useEffect(() => {
    if (!lastUpdatedCandle) return

    candleSeriesRef.current?.update(lastUpdatedCandle)
  }, [lastUpdatedCandle])

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-4">

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

      <div
        ref={chartContainerRef}
        className="min-h-0 flex-1"
      />

    </div>
  )
}