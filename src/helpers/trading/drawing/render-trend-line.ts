import { IChartApi, ISeriesApi } from "lightweight-charts";

import { TrendLineDrawing } from "@/src/types/trading/drawing";

import { chartToScreen } from "../chart-to-screen.helper";

export function renderTrendLine(

    ctx: CanvasRenderingContext2D,

    chart: IChartApi,

    series: ISeriesApi<"Candlestick">,

    drawing: TrendLineDrawing,

) {

    const start = chartToScreen(
        chart,
        series,
        drawing.start.time,
        drawing.start.price,
    );

    const end = chartToScreen(
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

}