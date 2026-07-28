import { RefObject, useEffect } from "react";
import { useChartStore } from "@/src/store/chart-store.store";
import { useDrawingStore } from "@/src/store/drawing.store";
import { renderDrawings } from "@/src/helpers/trading/drawing.renderer";

export function useDrawingRenderer(
    canvasRef: RefObject<HTMLCanvasElement | null>
) {

    const chart = useChartStore(s => s.chart);
    const series = useChartStore(s => s.series);

    useEffect(() => {

        if (!canvasRef.current
            || !series
            || !chart
        )
            return;

        let animationId = 0;

        const render = () => {

            renderDrawings(
                canvasRef.current!,
                chart,
                series,
                useDrawingStore.getState().drawings,
                useDrawingStore.getState().previewDrawing,
            );

            animationId =
                requestAnimationFrame(render);

        };

        render();

        return () =>
            cancelAnimationFrame(animationId);

    }, [
        chart,
        series,
    ]);
}