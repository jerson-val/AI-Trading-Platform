import { RefObject, useEffect } from "react";

import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";

import { renderDrawings } from "@/src/helpers/trading/drawing.renderer";

export function useDrawingRenderer(
    canvasRef: RefObject<HTMLCanvasElement | null>,
) {

    const chart = useChartStore(s => s.chart);
    const series = useChartStore(s => s.series);

    useEffect(() => {

        if (!canvasRef.current
            || ! chart
            || ! series
        ) return;

        const redraw = () => {

            if (!canvasRef.current) return;

            renderDrawings(
                canvasRef.current,
                chart,
                series,
                useDrawingStore.getState().drawings,
                useDrawingStore.getState().previewDrawing,
            );

        };

        // Initial render
        redraw();

        const unsubscribe = useDrawingStore.subscribe(redraw);

        chart.timeScale().subscribeVisibleLogicalRangeChange(redraw);
        chart.subscribeCrosshairMove(redraw);

        return () => {

            chart.timeScale().unsubscribeVisibleLogicalRangeChange(redraw);
            chart.unsubscribeCrosshairMove(redraw);
            unsubscribe;
        };

    }, [ chart, series]);
}