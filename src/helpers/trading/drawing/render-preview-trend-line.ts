import { IChartApi, ISeriesApi } from "lightweight-charts";

import { PreviewTrendLine } from "@/src/types/trading/drawing";

import { chartToScreen } from "../chart-to-screen.helper";

export function renderPreviewTrendLine(

    ctx: CanvasRenderingContext2D,

    chart: IChartApi,

    series: ISeriesApi<"Candlestick">,

    drawing: PreviewTrendLine,

) {

    const start = chartToScreen(
        chart,
        series,
        drawing.start.time,
        drawing.start.price,
    );

    if (!start)
        return;

    ctx.beginPath();

    ctx.moveTo(
        start.x,
        start.y,
    );

    ctx.lineTo(
        drawing.endScreen.x,
        drawing.endScreen.y,
    );

    ctx.strokeStyle =
        drawing.color;

    ctx.lineWidth =
        drawing.width;

    ctx.stroke();

}