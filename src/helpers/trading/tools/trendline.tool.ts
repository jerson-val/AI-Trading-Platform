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

    private movingDrawingId: string | null = null;

    private moveStartX = 0;
    private moveStartY = 0;

    private originalStartScreen: {
        x: number;
        y: number;
    } | null = null;

    private originalEndScreen: {
        x: number;
        y: number;
    } | null = null;

    // --------------------------------------------------
    // Helpers
    // --------------------------------------------------

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

        if (!this.startPoint) {
            return;
        }

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

    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

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

        if (!point) {
            return;
        }

        if (!this.startPoint) {

            this.startPoint = point;

            return;
        }

        this.finishDrawing(point);

    }

    // --------------------------------------------------
    // MOUSE DOWN
    // --------------------------------------------------

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

        if (!point) {
            return;
        }

        if (!this.startPoint) {

            this.startPoint = point;

        }

    }

    // --------------------------------------------------
    // CREATE PREVIEW
    // --------------------------------------------------

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (!this.startPoint) {
            return;
        }

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

    // --------------------------------------------------
    // MOUSE UP - CREATE
    // --------------------------------------------------

    onMouseUp(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (!this.startPoint) {
            return;
        }

        const point =
            this.getChartPoint(
                x,
                y,
                chart,
                series,
            );

        if (!point) {
            return;
        }

        this.finishDrawing(point);

    }

    // --------------------------------------------------
    // MOVE START
    // --------------------------------------------------

    onMoveStart(
        x: number,
        y: number,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (
            drawing.type !== "trendline"
        ) {
            return;
        }

        const trendLine =
            drawing as TrendLineDrawing;

        const startScreen =
            chartToScreen(
                chart,
                series,
                trendLine.start.time,
                trendLine.start.price,
            );

        const endScreen =
            chartToScreen(
                chart,
                series,
                trendLine.end.time,
                trendLine.end.price,
            );

        if (
            !startScreen ||
            !endScreen
        ) {
            return;
        }

        /*
        * Store the ORIGINAL drawing position.
        *
        * These values must remain unchanged for the
        * entire drag operation.
        */

        this.movingDrawingId =
            trendLine.id;

        this.moveStartX =
            x;

        this.moveStartY =
            y;

        this.originalStartScreen = {
            x: startScreen.x,
            y: startScreen.y,
        };

        this.originalEndScreen = {
            x: endScreen.x,
            y: endScreen.y,
        };

    }

    // --------------------------------------------------
    // MOVE
    // --------------------------------------------------

    onMove(
        drawing: Drawing,
        startX: number,
        startY: number,
        currentX: number,
        currentY: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (
            drawing.type !== "trendline"
        ) {
            return;
        }

        const trendLine =
            drawing as TrendLineDrawing;

        /*
        * Make sure this is the drawing that started
        * the current drag.
        */

        if (
            this.movingDrawingId !==
            trendLine.id
        ) {
            return;
        }

        if (
            !this.originalStartScreen ||
            !this.originalEndScreen
        ) {
            return;
        }

        /*
        * ------------------------------------------
        * Calculate movement from the ORIGINAL
        * mouse position.
        * ------------------------------------------
        */

        const deltaX =
            currentX - startX;

        const deltaY =
            currentY - startY;

        /*
        * ------------------------------------------
        * Move the ORIGINAL endpoints.
        *
        * IMPORTANT:
        *
        * We do NOT use the current drawing's
        * screen position here.
        * ------------------------------------------
        */

        const newStartScreen = {

            x:
                this.originalStartScreen.x +
                deltaX,

            y:
                this.originalStartScreen.y +
                deltaY,

        };

        const newEndScreen = {

            x:
                this.originalEndScreen.x +
                deltaX,

            y:
                this.originalEndScreen.y +
                deltaY,

        };

        /*
        * ------------------------------------------
        * Convert screen coordinates back to
        * chart coordinates.
        * ------------------------------------------
        */

        const newStart =
            this.getChartPoint(
                newStartScreen.x,
                newStartScreen.y,
                chart,
                series,
            );

        const newEnd =
            this.getChartPoint(
                newEndScreen.x,
                newEndScreen.y,
                chart,
                series,
            );

        if (
            !newStart ||
            !newEnd
        ) {
            return;
        }

        /*
        * ------------------------------------------
        * Create a COMPLETE drawing.
        * ------------------------------------------
        */

        const updatedDrawing: TrendLineDrawing = {

            ...trendLine,

            start: newStart,

            end: newEnd,

        };

        useDrawingStore
            .getState()
            .updateDrawing(
                trendLine.id,
                updatedDrawing,
            );

    }

    // --------------------------------------------------
    // MOVE END
    // --------------------------------------------------

    onMoveEnd(
        x: number,
        y: number,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        /*
        * Clear the temporary drag state.
        */

        this.movingDrawingId = null;

        this.moveStartX = 0;

        this.moveStartY = 0;

        this.originalStartScreen = null;

        this.originalEndScreen = null;

    }

    // --------------------------------------------------
    // DRAW
    // --------------------------------------------------

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
    ) {

        if (
            drawing.type !== "trendline"
        ) {
            return;
        }

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

        if (
            !start ||
            !end
        ) {
            return;
        }

        // ------------------------------------------
        // Line
        // ------------------------------------------

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

        // ------------------------------------------
        // Handles
        // ------------------------------------------

        if (!selected) {
            return;
        }

        ctx.fillStyle =
            "#ffffff";

        ctx.strokeStyle =
            trendLine.color;

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

    // --------------------------------------------------
    // HANDLE
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CANCEL
    // --------------------------------------------------

    onCancel() {

        this.reset();

    }

    // --------------------------------------------------
    // HIT TEST
    // --------------------------------------------------

    hitTest(
        x: number,
        y: number,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">,
    ) {

        if (
            drawing.type !== "trendline"
        ) {
            return false;
        }

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

        if (
            !start ||
            !end
        ) {
            return false;
        }

        const dx =
            end.x -
            start.x;

        const dy =
            end.y -
            start.y;

        const length =
            Math.sqrt(
                dx * dx +
                dy * dy,
            );

        if (
            length === 0
        ) {
            return false;
        }

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