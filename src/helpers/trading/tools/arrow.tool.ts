import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import {
    ArrowDrawing,
    ChartPoint,
    Drawing,
} from "@/src/types/trading/drawing";

import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class ArrowTool implements DrawingTool {

    private startPoint: ChartPoint | null = null;

    // --------------------------------------------------
    // Drag state
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

                type: "arrow",

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

        // First click
        if (!this.startPoint) {

            this.startPoint = point;

            return;
        }

        // Second click
        this.finishDrawing(point);

    }

    // --------------------------------------------------
    // Mouse Down
    // --------------------------------------------------

    onMouseDown() {
        // Arrow creation uses click -> click.
        // Existing drawing movement is handled
        // through onMoveStart / onMove / onMoveEnd.
    }

    // --------------------------------------------------
    // Mouse Up
    // --------------------------------------------------

    onMouseUp() {
        // Arrow creation uses click -> click.
        // Existing drawing movement is handled
        // through onMoveStart / onMove / onMoveEnd.
    }

    // --------------------------------------------------
    // Preview
    // --------------------------------------------------

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        if (!this.startPoint) {
            return;
        }

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
            drawing.type !== "arrow"
        ) {
            return;
        }

        const arrow =
            drawing as ArrowDrawing;

        // ----------------------------------------------
        // Convert original endpoints to screen space
        // ----------------------------------------------

        const startScreen =
            chartToScreen(
                chart,
                series,
                arrow.start.time,
                arrow.start.price,
            );

        const endScreen =
            chartToScreen(
                chart,
                series,
                arrow.end.time,
                arrow.end.price,
            );

        if (
            !startScreen ||
            !endScreen
        ) {
            return;
        }

        /*
         * Store the drawing being moved.
         */
        this.movingDrawingId =
            arrow.id;

        /*
         * Store the ORIGINAL mouse position.
         *
         * This never changes during the drag.
         */
        this.moveStartX =
            x;

        this.moveStartY =
            y;

        /*
         * Store the ORIGINAL drawing positions.
         *
         * These also never change during the drag.
         */
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
        series: ISeriesApi<"Candlestick">
    ) {

        if (
            drawing.type !== "arrow"
        ) {
            return;
        }

        const arrow =
            drawing as ArrowDrawing;

        /*
         * Make sure we're moving the same drawing
         * that started the drag.
         */
        if (
            this.movingDrawingId !==
            arrow.id
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
        // Calculate mouse movement
        // ----------------------------------------------

        /*
         * IMPORTANT:
         *
         * startX/startY are the ORIGINAL mouse
         * coordinates from the beginning of the drag.
         *
         * currentX/currentY are the current mouse
         * coordinates.
         *
         * Therefore this delta is always relative
         * to the original position.
         */
        const deltaX =
            currentX -
            startX;

        const deltaY =
            currentY -
            startY;

        // ----------------------------------------------
        // Move ORIGINAL endpoints
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
        // Convert screen -> chart coordinates
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

        const updatedDrawing: ArrowDrawing = {

            ...arrow,

            start: newStart,

            end: newEnd,

        };

        // ----------------------------------------------
        // Update store
        // ----------------------------------------------

        useDrawingStore
            .getState()
            .updateDrawing(
                arrow.id,
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
         * Clear all temporary drag state.
         */

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
            drawing.type !== "arrow"
        ) {
            return;
        }

        const arrow =
            drawing as ArrowDrawing;

        const start =
            chartToScreen(
                chart,
                series,
                arrow.start.time,
                arrow.start.price,
            );

        const end =
            chartToScreen(
                chart,
                series,
                arrow.end.time,
                arrow.end.price,
            );

        if (
            !start ||
            !end
        ) {
            return;
        }

        // ----------------------------------------------
        // Line
        // ----------------------------------------------

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
                : arrow.color;

        ctx.lineWidth =
            hovered
                ? arrow.width + 1
                : arrow.width;

        ctx.stroke();

        // ----------------------------------------------
        // Arrow Head
        // ----------------------------------------------

        const angle =
            Math.atan2(
                end.y - start.y,
                end.x - start.x,
            );

        const size = 12;

        const arrowAngle =
            Math.PI / 6;

        ctx.beginPath();

        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                size *
                    Math.cos(
                        angle -
                        arrowAngle,
                    ),

            end.y -
                size *
                    Math.sin(
                        angle -
                        arrowAngle,
                    ),
        );

        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                size *
                    Math.cos(
                        angle +
                        arrowAngle,
                    ),

            end.y -
                size *
                    Math.sin(
                        angle +
                        arrowAngle,
                    ),
        );

        ctx.strokeStyle =
            hovered
                ? "#60a5fa"
                : arrow.color;

        ctx.lineWidth =
            hovered
                ? arrow.width + 1
                : arrow.width;

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
            arrow.color;

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

        /*
         * Also clear any drag state in case Escape
         * is pressed while moving.
         */
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
        series: ISeriesApi<"Candlestick">
    ) {

        if (
            drawing.type !== "arrow"
        ) {
            return false;
        }

        const arrow =
            drawing as ArrowDrawing;

        const start =
            chartToScreen(
                chart,
                series,
                arrow.start.time,
                arrow.start.price,
            );

        const end =
            chartToScreen(
                chart,
                series,
                arrow.end.time,
                arrow.end.price,
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