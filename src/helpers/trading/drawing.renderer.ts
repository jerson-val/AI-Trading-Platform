import { IChartApi, ISeriesApi } from "lightweight-charts";

import { Drawing } from "@/src/types/trading/drawing";

import { chartToScreen } from "@/src/helpers/trading/chart-to-screen.helper";

export function renderDrawings(
    canvas: HTMLCanvasElement,
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    drawings: Drawing[],
) {

    const ctx =
        canvas.getContext("2d");

    if (!ctx)
        return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
    );

    drawings.forEach(drawing => {

        if (drawing.type !== "trendline")
            return;

        const start =
            chartToScreen(
                chart,
                series,
                drawing.start.time,
                drawing.start.price,
            );

        const end =
            chartToScreen(
                chart,
                series,
                drawing.end.time,
                drawing.end.price,
            );

        if (!start || !end)
            return;

        ctx.beginPath();

        ctx.moveTo(
            start.x,
            start.y,
        );

        ctx.lineTo(
            end.x,
            end.y,
        );

        ctx.strokeStyle =
            drawing.color;

        ctx.lineWidth =
            drawing.width;

        ctx.stroke();

    });

}