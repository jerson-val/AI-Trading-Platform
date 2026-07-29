import { IChartApi, ISeriesApi } from "lightweight-charts";
import { Drawing, PreviewDrawing } from "@/src/types/trading/drawing";
import { renderPreviewTrendLine } from "./drawing/render-preview-trend-line";
import { toolManager } from "./tools/tool-manager";
import { renderPreviewRectangle } from "./drawing/render-preview-rectangle";
import { renderPreviewArrow } from "./drawing/render-preview-arrow";

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

        const tool = toolManager.getToolByDrawing(drawing);

        if (!tool) return;

        tool.draw(
            ctx,
            drawing,
            chart,
            series,
        );

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

            case "arrow":

                renderPreviewArrow(
                    ctx,
                    chart,
                    series,
                    previewDrawing
                )

                break;

            case "rectangle":

                renderPreviewRectangle(
                    ctx,
                    chart,
                    series,
                    previewDrawing
                )

                break;

        }

    }

}