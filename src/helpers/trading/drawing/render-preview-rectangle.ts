import { IChartApi, ISeriesApi } from "lightweight-charts";
import { chartToScreen } from "../chart-to-screen.helper";
import { PreviewRectangle } from "@/src/types/trading/drawing";

export function renderPreviewRectangle(
    ctx: CanvasRenderingContext2D,
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    drawing: PreviewRectangle,
) {

    const start = chartToScreen(
        chart,
        series,
        drawing.start.time,
        drawing.start.price,
    );

    if (!start)
        return;

    const left = Math.min(
        start.x,
        drawing.endScreen.x,
    );

    const top = Math.min(
        start.y,
        drawing.endScreen.y,
    );

    const width = Math.abs(
        drawing.endScreen.x - start.x,
    );

    const height = Math.abs(
        drawing.endScreen.y - start.y,
    );

    ctx.fillStyle =
        drawing.fillColor;

    ctx.fillRect(
        left,
        top,
        width,
        height,
    );

    ctx.strokeStyle =
        drawing.color;

    ctx.lineWidth =
        drawing.borderWidth;

    ctx.strokeRect(
        left,
        top,
        width,
        height,
    );

}