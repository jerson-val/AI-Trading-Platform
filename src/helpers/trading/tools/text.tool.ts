import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import {
    TextDrawing,
    Drawing,
} from "@/src/types/trading/drawing";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

import { useDrawingStore } from "@/src/store/drawing.store";

import { screenToChart } from "../screen-to-chart.helper";
import { chartToScreen } from "../chart-to-screen.helper";

export class TextTool implements DrawingTool {

    // --------------------------------------------------
    // MOVE STATE
    // --------------------------------------------------

    private movingDrawingId: string | null = null;

    private originalPointScreen: {
        x: number;
        y: number;
    } | null = null;

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
            screenToChart(
                chart,
                series,
                x,
                y,
            );

        if (!point) {
            return;
        }

        useDrawingStore
            .getState()
            .setTextEditor({

                point,

                screen: {
                    x,
                    y,
                },

            });

    }

    // --------------------------------------------------
    // MOUSE MOVE
    // --------------------------------------------------

    onMouseMove() {}

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
            drawing.type !== "text"
        ) {
            return;
        }

        const textDrawing =
            drawing as TextDrawing;

        const point =
            chartToScreen(
                chart,
                series,
                textDrawing.point.time,
                textDrawing.point.price,
            );

        if (!point) {
            return;
        }

        // ----------------------------------------------
        // Store original drawing position
        // ----------------------------------------------

        this.movingDrawingId =
            textDrawing.id;

        this.originalPointScreen = {
            x: point.x,
            y: point.y,
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
            drawing.type !== "text"
        ) {
            return;
        }

        const textDrawing =
            drawing as TextDrawing;

        // ----------------------------------------------
        // Make sure this is the drawing being moved
        // ----------------------------------------------

        if (
            this.movingDrawingId !==
            textDrawing.id
        ) {
            return;
        }

        if (
            !this.originalPointScreen
        ) {
            return;
        }

        // ----------------------------------------------
        // Calculate mouse movement
        // ----------------------------------------------

        const deltaX =
            currentX -
            startX;

        const deltaY =
            currentY -
            startY;

        // ----------------------------------------------
        // Move original text anchor
        // ----------------------------------------------

        const newPointScreen = {

            x:
                this.originalPointScreen.x +
                deltaX,

            y:
                this.originalPointScreen.y +
                deltaY,

        };

        // ----------------------------------------------
        // Convert screen position back to chart point
        // ----------------------------------------------

        const newPoint =
            screenToChart(
                chart,
                series,
                newPointScreen.x,
                newPointScreen.y,
            );

        if (!newPoint) {
            return;
        }

        // ----------------------------------------------
        // Create complete drawing
        // ----------------------------------------------

        const updatedDrawing:
            TextDrawing = {

            ...textDrawing,

            point:
                newPoint,

        };

        // ----------------------------------------------
        // Update store
        // ----------------------------------------------

        useDrawingStore
            .getState()
            .updateDrawing(
                textDrawing.id,
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

        this.movingDrawingId =
            null;

        this.originalPointScreen =
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
            drawing.type !== "text"
        ) {
            return;
        }

        const textDrawing =
            drawing as TextDrawing;

        const point =
            chartToScreen(
                chart,
                series,
                textDrawing.point.time,
                textDrawing.point.price,
            );

        if (!point) {
            return;
        }

        ctx.save();

        ctx.font =
            `${textDrawing.fontSize}px Inter`;

        ctx.textBaseline =
            "top";

        ctx.shadowColor =
            "rgba(0,0,0,.7)";

        ctx.shadowBlur =
            4;

        ctx.fillStyle =
            hovered
                ? "#60a5fa"
                : textDrawing.color;

        ctx.fillText(
            textDrawing.text,
            point.x + 2,
            point.y + 2,
        );

        ctx.restore();

    }

    // --------------------------------------------------
    // CANCEL
    // --------------------------------------------------

    onCancel() {

        useDrawingStore
            .getState()
            .setTextEditor(null);

        this.movingDrawingId =
            null;

        this.originalPointScreen =
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
    ): boolean {

        if (
            drawing.type !== "text"
        ) {
            return false;
        }

        const textDrawing =
            drawing as TextDrawing;

        // ----------------------------------------------
        // Convert text anchor to screen
        // ----------------------------------------------

        const point =
            chartToScreen(
                chart,
                series,
                textDrawing.point.time,
                textDrawing.point.price,
            );

        if (!point) {
            return false;
        }

        // ----------------------------------------------
        // Create a temporary canvas context so that
        // measureText() uses the same font as draw()
        // ----------------------------------------------

        const canvas =
            document.createElement(
                "canvas",
            );

        const ctx =
            canvas.getContext("2d");

        if (!ctx) {
            return false;
        }

        ctx.font =
            `${textDrawing.fontSize}px Inter`;

        ctx.textBaseline =
            "top";

        const metrics =
            ctx.measureText(
                textDrawing.text,
            );

        // ----------------------------------------------
        // Text dimensions
        // ----------------------------------------------

        const textWidth =
            metrics.width;

        const textHeight =
            textDrawing.fontSize;

        // ----------------------------------------------
        // Match the position used by draw()
        //
        // draw():
        //
        // point.x + 2
        // point.y + 2
        // ----------------------------------------------

        const left =
            point.x + 2;

        const top =
            point.y + 2;

        const right =
            left +
            textWidth;

        const bottom =
            top +
            textHeight;

        // ----------------------------------------------
        // Small tolerance around the text
        // ----------------------------------------------

        const tolerance = 6;

        return (
            x >= left - tolerance &&
            x <= right + tolerance &&
            y >= top - tolerance &&
            y <= bottom + tolerance
        );

    }

}