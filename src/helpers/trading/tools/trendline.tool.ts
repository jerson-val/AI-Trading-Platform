import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import {
    ChartPoint,
    Drawing,
    TrendLineDrawing,
} from "@/src/types/trading/drawing";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class TrendLineTool implements DrawingTool {

    private startPoint: ChartPoint | null = null;

    private getChartPoint(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
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

                type: "trendline",

                start: this.startPoint,

                end,

                color: "#3b82f6",

                width: 2,

            });

        this.reset();

    }

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
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
        series: ISeriesApi<"Candlestick">,
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

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (!this.startPoint)
            return;

        useDrawingStore
            .getState()
            .setPreviewDrawing({

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

    onMouseUp(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
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

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
    ) {

        const trendLine =
            drawing as TrendLineDrawing;

        const start =
            chartToScreen(
                chart,
                series,
                trendLine.start.time,
                trendLine.start.price,
            );

        const end =
            chartToScreen(
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

        ctx.strokeStyle =
            hovered
                ? "#60a5fa"
                : trendLine.color;

        ctx.lineWidth =
            hovered
                ? trendLine.width + 1
                : trendLine.width;

        ctx.stroke();

        if (!selected)
            return;

        ctx.fillStyle = "#ffffff";

        ctx.strokeStyle = trendLine.color;

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
        },
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
        drawing: TrendLineDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
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

        const dx =
            end.x - start.x;

        const dy =
            end.y - start.y;

        const length =
            Math.sqrt(
                dx * dx +
                dy * dy,
            );

        if (length === 0)
            return false;

        const distance =
            Math.abs(

                dy * x -

                dx * y +

                end.x * start.y -

                end.y * start.x

            ) / length;

        return distance <= 6;

    }

}