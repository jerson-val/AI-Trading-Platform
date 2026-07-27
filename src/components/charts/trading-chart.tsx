'use client'

import { useEffect, useRef } from 'react'
import {
  IChartApi,
  ISeriesApi,
} from 'lightweight-charts'
import { useTradingStore } from '@/src/store/trading.store'
import { createTradingChart } from '@/src/hooks/trading/use-chart'
import { useChartResize } from '@/src/hooks/trading/use-chart-resize'
import ChartToolbar from './chart-toolbar'
import { useChartHistory } from '@/src/hooks/trading/use-chart-history'
import { useChartRealtime } from '@/src/hooks/trading/use-chart-realtime'
import { useChartStore } from '@/src/store/chart-store.store'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  const setChart = useChartStore((s) => s.setChart);
  const clearChart = useChartStore((s) => s.clearChart);

  const isLoadingHistory = useTradingStore((s) => s.isLoadingHistory)
  const lastUpdatedCandle = useTradingStore((s) => s.lastUpdatedCandle)
  const candles = useTradingStore((s) => s.candles)
  const symbol = useTradingStore((s) => s.symbol)
  const timeframe = useTradingStore((s) => s.timeframe)

  useChartResize(chartContainerRef.current);

  /*
  ==========================
  CREATE CHART
  ==========================
  */

  useEffect(() => {

    if (!chartContainerRef.current) return;

    const {
        chart,
        series,
    } = createTradingChart(
        chartContainerRef.current
    );

    setChart(chart, series);

    return () => {
      clearChart()
      chart.remove()
    };

  }, []);


  useChartRealtime( lastUpdatedCandle)

  useChartHistory(
    candles,
    symbol,
    timeframe,
    isLoadingHistory
  )

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-4">

     <ChartToolbar />

      <div
        ref={chartContainerRef}
        className="min-h-0 flex-1"
      />

    </div>
  )
}