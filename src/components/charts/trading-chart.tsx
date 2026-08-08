'use client'

import { useEffect, useRef } from 'react'
import { createTradingChart } from '@/src/hooks/trading/use-chart'
import { useChartResize } from '@/src/hooks/trading/use-chart-resize'
import { useChartHistory } from '@/src/hooks/trading/use-chart-history'
import { useChartRealtime } from '@/src/hooks/trading/use-chart-realtime'
import { useTradingStore } from '@/src/store/trading.store'
import { useChartStore } from '@/src/store/chart-store.store'
import ChartToolbar from './chart-toolbar'
import DrawingCanvas from './drawing-canvas'
import { useDrawingRenderer } from '@/src/hooks/trading/drawing/use-drawing-renderer'
import { useDrawingCanvas } from '@/src/hooks/trading/drawing/use-drawing-canvas'
import { useDrawingInteraction } from '@/src/hooks/trading/drawing/use-drawing-interaction'
import DrawingToolbar from './drawing-toolbar'
import TextEditorOverlay from '../trading/text-editor-overlay'

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setChart = useChartStore((s) => s.setChart);
  const clearChart = useChartStore((s) => s.clearChart);

  const isLoadingHistory = useTradingStore((s) => s.isLoadingHistory)
  const lastUpdatedCandle = useTradingStore((s) => s.lastUpdatedCandle)
  const candles = useTradingStore((s) => s.candles)
  const symbol = useTradingStore((s) => s.symbol)
  const timeframe = useTradingStore((s) => s.timeframe)

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

  useChartResize(chartContainerRef.current);

  useDrawingCanvas( chartContainerRef, canvasRef );

  useDrawingRenderer(canvasRef);

  useDrawingInteraction(chartContainerRef, canvasRef);

    return (

        <div className="flex h-full flex-col rounded-2xl border border-gray-800 bg-[#111827] p-4">

            <ChartToolbar />

            <div className="flex min-h-0 flex-1">

                <DrawingToolbar />

                <div className="relative ml-3 min-h-0 flex-1">

                    <div
                        ref={chartContainerRef}
                        className="absolute inset-0"
                    />

                    <DrawingCanvas
                        ref={canvasRef}
                    />

                    <TextEditorOverlay />

                </div>

            </div>

        </div>

    );

}