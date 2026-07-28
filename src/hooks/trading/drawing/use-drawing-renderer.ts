import { RefObject, useEffect } from "react";
import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";
import { useTradingStore } from "@/src/store/trading.store";
import { renderDrawings } from "@/src/helpers/trading/drawing.renderer";

export function useDrawingRenderer(
    canvasRef: RefObject<HTMLCanvasElement | null>
) {

    const chart = useChartStore(s => s.chart);
    const candles = useTradingStore(s => s.candles);
    const lastUpdatedCandle = useTradingStore(s => s.lastUpdatedCandle);
    const series = useChartStore(s => s.series);
    const drawings = useDrawingStore(s => s.drawings);

    useEffect(() => {

        if (!canvasRef.current)
            return;

        if (!chart)
            return;

        if (!series)
            return;

        renderDrawings(
            canvasRef.current,
            chart,
            series,
            drawings,
        );

    }, [
        chart,
        series,
        drawings,
        candles,
        lastUpdatedCandle,
    ]);
}