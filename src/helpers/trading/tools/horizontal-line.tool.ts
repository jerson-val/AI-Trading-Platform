import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import {
    Drawing,
    HorizontalLineDrawing,
} from "@/src/types/trading/drawing";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";

export class HorizontalLineTool implements DrawingTool {

    // --------------------------------------------------
    // Drag state
    // --------------------------------------------------

    private movingDrawingId: string | null = null;

    private originalY: number | null = null;

    // --------------------------------------------------
    // Helpers
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CREATE
    // --------------------------------------------------

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

        if (!point) {
            return;
        }

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

    // --------------------------------------------------
    // MOUSE DOWN
    // --------------------------------------------------

    onMouseDown() {
        // Horizontal lines are created with click.
        // Existing drawing movement uses
        // onMoveStart / onMove / onMoveEnd.
    }

    // --------------------------------------------------
    // MOUSE MOVE
    // --------------------------------------------------

    onMouseMove() {
        // No creation preview is required.
    }

    // --------------------------------------------------
    // MOUSE UP
    // --------------------------------------------------

    onMouseUp() {
        // Horizontal lines are created on click.
    }

    // --------------------------------------------------
    // MOVE START
    // --------------------------------------------------

    onMoveStart(
        x: number,
        y: number,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        if (
            drawing.type !== "horizontal"
        ) {
            return;
        }

        const horizontalLine =
            drawing as HorizontalLineDrawing;

        // ----------------------------------------------
        // Convert original price to screen Y
        // ----------------------------------------------

        const originalY =
            series.priceToCoordinate(
                horizontalLine.price,
            );

        if (originalY === null) {
            return;
        }

        // ----------------------------------------------
        // Store drag state
        // ----------------------------------------------

        this.movingDrawingId =
            horizontalLine.id;

        /*
         * Store the ORIGINAL screen Y position
         * of the line.
         *
         * This value never changes during the drag.
         */
        this.originalY =
            originalY;

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
        series: ISeriesApi<"Candlestick">
    ) {

        if (
            drawing.type !== "horizontal"
        ) {
            return;
        }

        const horizontalLine =
            drawing as HorizontalLineDrawing;

        // ----------------------------------------------
        // Make sure this is the drawing being moved
        // ----------------------------------------------

        if (
            this.movingDrawingId !==
            horizontalLine.id
        ) {
            return;
        }

        if (
            this.originalY === null
        ) {
            return;
        }

        // ----------------------------------------------
        // Calculate vertical movement
        // ----------------------------------------------

        /*
         * Horizontal lines only care about Y.
         *
         * X movement is intentionally ignored.
         */
        const deltaY =
            currentY -
            startY;

        // ----------------------------------------------
        // Move ORIGINAL Y position
        // ----------------------------------------------

        const newY =
            this.originalY +
            deltaY;

        // ----------------------------------------------
        // Convert screen Y -> chart price
        // ----------------------------------------------

        /*
         * We only need the price from the converted
         * point. The X coordinate has no importance
         * for a horizontal line.
         */
        const point =
            this.getChartPoint(
                currentX,
                newY,
                chart,
                series,
            );

        if (!point) {
            return;
        }

        // ----------------------------------------------
        // Create COMPLETE drawing
        // ----------------------------------------------

        const updatedDrawing: HorizontalLineDrawing = {

            ...horizontalLine,

            price:
                point.price,

        };

        // ----------------------------------------------
        // Update store
        // ----------------------------------------------

        useDrawingStore
            .getState()
            .updateDrawing(
                horizontalLine.id,
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
        series: ISeriesApi<"Candlestick">
    ) {

        /*
         * Clear temporary drag state.
         */

        this.movingDrawingId =
            null;

        this.originalY =
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
            drawing.type !== "horizontal"
        ) {
            return;
        }

        const horizontalLine =
            drawing as HorizontalLineDrawing;

        const y =
            series.priceToCoordinate(
                horizontalLine.price,
            );

        if (y === null) {
            return;
        }

        // ----------------------------------------------
        // Line
        // ----------------------------------------------

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
                : horizontalLine.color;

        ctx.lineWidth =
            hovered
                ? horizontalLine.width + 1
                : horizontalLine.width;

        ctx.stroke();

        // ----------------------------------------------
        // Handles
        // ----------------------------------------------

        if (!selected) {
            return;
        }

        ctx.fillStyle =
            "#ffffff";

        ctx.strokeStyle =
            horizontalLine.color;

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

    // --------------------------------------------------
    // HANDLE
    // --------------------------------------------------

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

    // --------------------------------------------------
    // CANCEL
    // --------------------------------------------------

    onCancel() {

        this.movingDrawingId =
            null;

        this.originalY =
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
        series: ISeriesApi<"Candlestick">
    ) {

        if (
            drawing.type !== "horizontal"
        ) {
            return false;
        }

        const horizontalLine =
            drawing as HorizontalLineDrawing;

        const coordinate =
            series.priceToCoordinate(
                horizontalLine.price,
            );

        if (coordinate === null) {
            return false;
        }

        const tolerance = 6;

        return (
            Math.abs(
                y - coordinate,
            ) <= tolerance
        );

    }

}