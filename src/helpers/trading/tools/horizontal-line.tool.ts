import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import { HorizontalLineDrawing } from "@/src/types/trading/drawing";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";

export class HorizontalLineTool implements DrawingTool {

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

        useDrawingStore
            .getState()
            .addDrawing({

                id: crypto.randomUUID(),

                type: "horizontal",

                price: point.price,

                color: "#3b82f6",

                width: 2,

            });

    }

    onMouseDown() {}

    onMouseMove() {}

    onMouseUp() {}

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: HorizontalLineDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
    ) {

        const y =
            series.priceToCoordinate(
                drawing.price,
            );

        if (y === null)
            return;

        ctx.beginPath();

        ctx.moveTo(
            0,
            y,
        );

        ctx.lineTo(
            ctx.canvas.width,
            y,
        );

        ctx.strokeStyle =
            hovered
                ? "#60a5fa"
                : drawing.color;

        ctx.lineWidth =
            hovered
                ? drawing.width + 1
                : drawing.width;

        ctx.stroke();

        if (!selected)
            return;

        ctx.fillStyle = "#ffffff";

        ctx.strokeStyle = drawing.color;

        ctx.lineWidth = 2;

        this.drawHandle(
            ctx,
            0,
            y,
        );

        this.drawHandle(
            ctx,
            ctx.canvas.width,
            y,
        );

    }

    private drawHandle(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
    ) {

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2,
        );

        ctx.fill();

        ctx.stroke();

    }

    onCancel() {}

    hitTest(
        x: number,
        y: number,
        drawing: HorizontalLineDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const coordinate =
            series.priceToCoordinate(
                drawing.price,
            );

        if (coordinate === null)
            return false;

        const tolerance = 6;

        return (
            Math.abs(
                y - coordinate,
            ) <= tolerance
        );

    }

}