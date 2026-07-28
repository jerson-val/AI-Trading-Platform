import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { screenToChart } from "../screen-to-chart.helper";
import { useDrawingStore } from "@/src/store/drawing.store";
import { Drawing, TrendLineDrawing } from "@/src/types/trading/drawing";
import { chartToScreen } from "../chart-to-screen.helper";

export class TrendLineTool implements DrawingTool {

    private startPoint: any = null;

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const point = screenToChart(
            chart,
            series,
            x,
            y,
        );

        if (!point) return;

        // First click
        if (!this.startPoint) {

            this.startPoint = point;

            return;

        }

        // Second click
        const drawing = {

            id: crypto.randomUUID(),

            type: "trendline" as const,

            start: this.startPoint,

            end: point,

            color: "#3b82f6",

            width: 2,

        };

        useDrawingStore.getState().addDrawing(drawing);
        useDrawingStore.getState().setPreviewDrawing(null);
        this.startPoint = null;

    }

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        if (!this.startPoint)
            return;

        const point = screenToChart(
            chart,
            series,
            x,
            y,
        );

        if (!point) return;

        useDrawingStore.getState().setPreviewDrawing({

            type: "trendline",

            start: this.startPoint,

            endScreen: {
                x,
                y,
            },

            color: "#3b82f6",

            width: 2,

        });
    }

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const trendLine = drawing as TrendLineDrawing;

        const start = chartToScreen(
            chart,
            series,
            trendLine.start.time,
            trendLine.start.price,
        );

        const end = chartToScreen(
            chart,
            series,
            trendLine.end.time,
            trendLine.end.price,
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

        ctx.strokeStyle = trendLine.color;

        ctx.lineWidth = trendLine.width;

        ctx.stroke();

    }

}