import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import {
    ChartPoint,
    RectangleDrawing,
} from "@/src/types/trading/drawing";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class RectangleTool implements DrawingTool {

    private startPoint: ChartPoint | null = null;

    private getChartPoint(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        return screenToChart(
            chart,
            series,
            x,
            y,
        );

    }

    private reset() {

        this.startPoint = null;

        useDrawingStore
            .getState()
            .setPreviewDrawing(null);

    }

    private finishDrawing(
        end: ChartPoint,
    ) {

        if (!this.startPoint)
            return;

        useDrawingStore
            .getState()
            .addDrawing({

                id: crypto.randomUUID(),

                type: "rectangle",

                start: this.startPoint,

                end,

                color: "#3b82f6",

                fillColor:
                    "rgba(59,130,246,.15)",

                borderWidth: 2,

            });

        this.reset();

    }

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const point =
            this.getChartPoint(
                x,
                y,
                chart,
                series,
            );

        if (!point)
            return;

        if (!this.startPoint) {

            this.startPoint = point;

            return;

        }

        this.finishDrawing(point);

    }

    onMouseDown(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const point =
            this.getChartPoint(
                x,
                y,
                chart,
                series,
            );

        if (!point)
            return;

        if (!this.startPoint) {

            this.startPoint = point;

        }

    }

    onMouseUp(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        if (!this.startPoint)
            return;

        const point =
            this.getChartPoint(
                x,
                y,
                chart,
                series,
            );

        if (!point)
            return;

        this.finishDrawing(point);

    }

    onMouseMove(
        x: number,
        y: number,
    ) {

        if (!this.startPoint)
            return;

        useDrawingStore
            .getState()
            .setPreviewDrawing({

                type: "rectangle",

                start: this.startPoint,

                endScreen: {
                    x,
                    y,
                },

                color: "#3b82f6",

                fillColor:
                    "rgba(59,130,246,.15)",

                borderWidth: 2,

            });

    }

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: RectangleDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
    ) {

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

        const left =
            Math.min(
                start.x,
                end.x,
            );

        const top =
            Math.min(
                start.y,
                end.y,
            );

        const width =
            Math.abs(
                end.x - start.x,
            );

        const height =
            Math.abs(
                end.y - start.y,
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
            hovered
                ? "#60a5fa"
                : drawing.color;

        ctx.lineWidth =
            hovered
                ? drawing.borderWidth + 1
                : drawing.borderWidth;

        ctx.strokeRect(
            left,
            top,
            width,
            height,
        );

        if (!selected)
            return;

        ctx.fillStyle = "#ffffff";

        ctx.strokeStyle = drawing.color;

        ctx.lineWidth = 2;

        this.drawHandle(
            ctx,
            start,
        );

        this.drawHandle(
            ctx,
            end,
        );

    }

    private drawHandle(
        ctx: CanvasRenderingContext2D,
        point: {
            x: number;
            y: number;
        }
    ) {

        ctx.beginPath();

        ctx.arc(
            point.x,
            point.y,
            5,
            0,
            Math.PI * 2,
        );

        ctx.fill();

        ctx.stroke();

    }

    onCancel() {

        this.reset();

    }

    hitTest(
        x: number,
        y: number,
        drawing: RectangleDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

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
            return false;

        const left =
            Math.min(
                start.x,
                end.x,
            );

        const right =
            Math.max(
                start.x,
                end.x,
            );

        const top =
            Math.min(
                start.y,
                end.y,
            );

        const bottom =
            Math.max(
                start.y,
                end.y,
            );

        const tolerance = 6;

        const nearLeft =
            Math.abs(x - left) <= tolerance &&
            y >= top &&
            y <= bottom;

        const nearRight =
            Math.abs(x - right) <= tolerance &&
            y >= top &&
            y <= bottom;

        const nearTop =
            Math.abs(y - top) <= tolerance &&
            x >= left &&
            x <= right;

        const nearBottom =
            Math.abs(y - bottom) <= tolerance &&
            x >= left &&
            x <= right;

        return (
            nearLeft ||
            nearRight ||
            nearTop ||
            nearBottom
        );

    }

}