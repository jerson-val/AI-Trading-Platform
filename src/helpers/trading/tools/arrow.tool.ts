import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import {
    ArrowDrawing,
    ChartPoint,
} from "@/src/types/trading/drawing";

import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class ArrowTool implements DrawingTool {

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

                type: "arrow",

                start: this.startPoint,

                end,

                color: "#3b82f6",

                width: 2,

            });

        this.reset();

    }

    //------------------------------------
    // CLICK -> CLICK
    //------------------------------------

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const point = this.getChartPoint(
            x,
            y,
            chart,
            series,
        );

        if (!point)
            return;

        // First click
        if (!this.startPoint) {

            this.startPoint = point;

            return;

        }

        // Second click
        this.finishDrawing(point);

    }

    //------------------------------------
    // NOT USED
    //------------------------------------

    onMouseDown() {}

    onMouseUp() {}

    //------------------------------------
    // Preview
    //------------------------------------

    onMouseMove(
        x: number,
        y: number,
    ) {

        if (!this.startPoint)
            return;

        useDrawingStore
            .getState()
            .setPreviewDrawing({

                type: "arrow",

                start: this.startPoint,

                endScreen: {
                    x,
                    y,
                },

                color: "#3b82f6",

                width: 2,

            });

    }

    //------------------------------------
    // Draw
    //------------------------------------

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: ArrowDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
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

        //----------------------------------
        // Line
        //----------------------------------

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
                : drawing.color;

        ctx.lineWidth =
            hovered
                ? drawing.width + 1
                : drawing.width;

        ctx.stroke();

        //----------------------------------
        // Arrow Head
        //----------------------------------

        const angle = Math.atan2(
            end.y - start.y,
            end.x - start.x,
        );

        const size = 12;

        const arrowAngle = Math.PI / 6;

        ctx.beginPath();

        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                size *
                    Math.cos(angle - arrowAngle),
            end.y -
                size *
                    Math.sin(angle - arrowAngle),
        );

        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                size *
                    Math.cos(angle + arrowAngle),
            end.y -
                size *
                    Math.sin(angle + arrowAngle),
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

        //----------------------------------
        // Handles
        //----------------------------------

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

    //------------------------------------
    // Cancel
    //------------------------------------

    onCancel() {

        this.reset();

    }

    //------------------------------------
    // Hit Test
    //------------------------------------

    hitTest(
        x: number,
        y: number,
        drawing: ArrowDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
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
            return false;

        const dx = end.x - start.x;
        const dy = end.y - start.y;

        const length = Math.sqrt(
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