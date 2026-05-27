'use client'

import { useEffect, useRef } from 'react'
import {
  createChart,
  ColorType,
} from 'lightweight-charts'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

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

    candleSeries.setData([
      {
        time: '2025-01-01',
        open: 100,
        high: 110,
        low: 90,
        close: 105,
      },
      {
        time: '2025-01-02',
        open: 105,
        high: 120,
        low: 100,
        close: 115,
      },
    ])

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

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          BTCUSDT
        </h2>

        <div className="flex gap-2">
          {['1m', '5m', '15m', '1H', '4H'].map((tf) => (
            <button
              key={tf}
              className="rounded-lg bg-[#1f2937] px-3 py-1 text-sm hover:bg-blue-500"
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