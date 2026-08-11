import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import {
    ChartPoint,
    Drawing,
    RectangleDrawing,
} from "@/src/types/trading/drawing";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class RectangleTool implements DrawingTool {

    private startPoint: ChartPoint | null = null;

    // --------------------------------------------------
    // MOVE STATE
    // --------------------------------------------------

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
    // HELPERS
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

    // --------------------------------------------------
    // CREATE - CLICK
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
    // CREATE - MOUSE DOWN
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
    // CREATE - MOUSE MOVE
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

    // --------------------------------------------------
    // CREATE - MOUSE UP
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
            drawing.type !== "rectangle"
        ) {
            return;
        }

        const rectangle =
            drawing as RectangleDrawing;

        // ----------------------------------------------
        // Convert original corners to screen coordinates
        // ----------------------------------------------

        const startScreen =
            chartToScreen(
                chart,
                series,
                rectangle.start.time,
                rectangle.start.price,
            );

        const endScreen =
            chartToScreen(
                chart,
                series,
                rectangle.end.time,
                rectangle.end.price,
            );

        if (
            !startScreen ||
            !endScreen
        ) {
            return;
        }

        // ----------------------------------------------
        // Store original drag state
        // ----------------------------------------------

        this.movingDrawingId =
            rectangle.id;

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
            drawing.type !== "rectangle"
        ) {
            return;
        }

        const rectangle =
            drawing as RectangleDrawing;

        // ----------------------------------------------
        // Make sure this is the drawing being dragged
        // ----------------------------------------------

        if (
            this.movingDrawingId !==
            rectangle.id
        ) {
            return;
        }

        if (
            !this.originalStartScreen ||
            !this.originalEndScreen
        ) {
            return;
        }

        // ----------------------------------------------
        // Calculate movement from ORIGINAL mouse position
        // ----------------------------------------------

        const deltaX =
            currentX -
            startX;

        const deltaY =
            currentY -
            startY;

        // ----------------------------------------------
        // Move ORIGINAL rectangle corners
        // ----------------------------------------------

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

        // ----------------------------------------------
        // Convert screen coordinates back to chart
        // coordinates
        // ----------------------------------------------

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

        // ----------------------------------------------
        // Create COMPLETE drawing
        // ----------------------------------------------

        const updatedDrawing:
            RectangleDrawing = {

            ...rectangle,

            start:
                newStart,

            end:
                newEnd,

        };

        // ----------------------------------------------
        // Update store
        // ----------------------------------------------

        useDrawingStore
            .getState()
            .updateDrawing(
                rectangle.id,
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

        // ----------------------------------------------
        // Clear temporary drag state
        // ----------------------------------------------

        this.movingDrawingId =
            null;

        this.moveStartX =
            0;

        this.moveStartY =
            0;

        this.originalStartScreen =
            null;

        this.originalEndScreen =
            null;

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
            drawing.type !== "rectangle"
        ) {
            return;
        }

        const rectangle =
            drawing as RectangleDrawing;

        // ----------------------------------------------
        // Convert chart coordinates to screen
        // ----------------------------------------------

        const start =
            chartToScreen(
                chart,
                series,
                rectangle.start.time,
                rectangle.start.price,
            );

        const end =
            chartToScreen(
                chart,
                series,
                rectangle.end.time,
                rectangle.end.price,
            );

        if (
            !start ||
            !end
        ) {
            return;
        }

        // ----------------------------------------------
        // Calculate rectangle bounds
        // ----------------------------------------------

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
                end.x -
                start.x,
            );

        const height =
            Math.abs(
                end.y -
                start.y,
            );

        // ----------------------------------------------
        // Fill
        // ----------------------------------------------

        ctx.fillStyle =
            rectangle.fillColor;

        ctx.fillRect(
            left,
            top,
            width,
            height,
        );

        // ----------------------------------------------
        // Border
        // ----------------------------------------------

        ctx.strokeStyle =
            hovered
                ? "#60a5fa"
                : rectangle.color;

        ctx.lineWidth =
            hovered
                ? rectangle.borderWidth + 1
                : rectangle.borderWidth;

        ctx.strokeRect(
            left,
            top,
            width,
            height,
        );

        // ----------------------------------------------
        // Handles
        // ----------------------------------------------

        if (!selected) {
            return;
        }

        ctx.fillStyle =
            "#ffffff";

        ctx.strokeStyle =
            rectangle.color;

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

        // Also clear any stale movement state.

        this.movingDrawingId =
            null;

        this.moveStartX =
            0;

        this.moveStartY =
            0;

        this.originalStartScreen =
            null;

        this.originalEndScreen =
            null;

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
            drawing.type !== "rectangle"
        ) {
            return false;
        }

        const rectangle =
            drawing as RectangleDrawing;

        const start =
            chartToScreen(
                chart,
                series,
                rectangle.start.time,
                rectangle.start.price,
            );

        const end =
            chartToScreen(
                chart,
                series,
                rectangle.end.time,
                rectangle.end.price,
            );

        if (
            !start ||
            !end
        ) {
            return false;
        }

        // ----------------------------------------------
        // Rectangle bounds
        // ----------------------------------------------

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

        // ----------------------------------------------
        // Check edges
        // ----------------------------------------------

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