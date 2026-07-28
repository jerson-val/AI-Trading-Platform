import { IChartApi, ISeriesApi } from "lightweight-charts";
import { Drawing, PreviewDrawing } from "@/src/types/trading/drawing";
import { renderTrendLine } from "./drawing/render-trend-line";
import { renderPreviewTrendLine } from "./drawing/render-preview-trend-line";

export function renderDrawings(
    canvas: HTMLCanvasElement,
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    drawings: Drawing[],
    previewDrawing: PreviewDrawing | null,
) {

    const ctx = canvas.getContext("2d");

    if (!ctx)
        return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height,
    );

    drawings.forEach(drawing => {

        switch (drawing.type) {

            case "trendline":

                renderTrendLine(
                    ctx,
                    chart,
                    series,
                    drawing,
                );

                break;

        }

    });

    if (previewDrawing) {

        switch (previewDrawing.type) {

            case "trendline":

                renderPreviewTrendLine(
                    ctx,
                    chart,
                    series,
                    previewDrawing,
                );

                break;

        }

    }

}