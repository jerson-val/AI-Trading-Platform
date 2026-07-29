import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { screenToChart } from "../screen-to-chart.helper";
import { useDrawingStore } from "@/src/store/drawing.store";
import { ArrowDrawing } from "@/src/types/trading/drawing";
import { chartToScreen } from "../chart-to-screen.helper";

export class ArrowTool implements DrawingTool {

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

            type: "arrow" as const,

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

    draw(
        ctx: CanvasRenderingContext2D,
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
            return;

        // Draw the main line
        ctx.beginPath();

        ctx.moveTo(
            start.x,
            start.y,
        );

        ctx.lineTo(
            end.x,
            end.y,
        );

        ctx.strokeStyle = drawing.color;

        ctx.lineWidth = drawing.width;

        ctx.stroke();

        // -------------------------
        // Arrow head
        // -------------------------

        const angle = Math.atan2(
            end.y - start.y,
            end.x - start.x,
        );

        const arrowSize = 12;
        const arrowAngle = Math.PI / 6; // 30°

        ctx.beginPath();

        // Left side
        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                arrowSize *
                    Math.cos(angle - arrowAngle),

            end.y -
                arrowSize *
                    Math.sin(angle - arrowAngle),
        );

        // Right side
        ctx.moveTo(
            end.x,
            end.y,
        );

        ctx.lineTo(
            end.x -
                arrowSize *
                    Math.cos(angle + arrowAngle),

            end.y -
                arrowSize *
                    Math.sin(angle + arrowAngle),
        );

        ctx.strokeStyle = drawing.color;

        ctx.lineWidth = drawing.width;

        ctx.stroke();

    }

    onCancel(): void {
        this.startPoint = null;
        useDrawingStore.getState().setPreviewDrawing(null);
    }

}