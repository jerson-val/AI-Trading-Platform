import { IChartApi, ISeriesApi } from "lightweight-charts";
import { screenToChart } from "../screen-to-chart.helper";
import { useDrawingStore } from "@/src/store/drawing.store";
import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { chartToScreen } from "../chart-to-screen.helper";
import { Drawing, RectangleDrawing } from "@/src/types/trading/drawing";

export class RectangleTool implements DrawingTool {

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

        if (!point)
            return;

        // First click
        if (!this.startPoint) {

            this.startPoint = point;

            return;

        }

        // Second click
        const preview =
            useDrawingStore
                .getState()
                .previewDrawing;

        if (
            preview &&
            preview.type === "rectangle"
        ) {

            useDrawingStore
                .getState()
                .addDrawing({

                    id: crypto.randomUUID(),

                    type: "rectangle",

                    start: preview.start,

                    end: point,

                    color: preview.color,

                    fillColor: preview.fillColor,

                    borderWidth: preview.borderWidth,

                });

        }

        useDrawingStore
            .getState()
            .setPreviewDrawing(null);

        this.startPoint = null;

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

                fillColor: "rgba(59,130,246,.15)",

                borderWidth: 2,

            });

    }

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: RectangleDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const start = chartToScreen(
            chart,
            series,
            drawing.start.time,
            drawing.start.price,
        );

        if (!start)
            return;

        const end = chartToScreen(
            chart,
            series,
            drawing.end.time,
            drawing.end.price,
        );

        if (!end) return;

        const left = Math.min(start.x, end.x);

        const top = Math.min(start.y, end.y);

        const width = Math.abs(end.x - start.x);

        const height = Math.abs(end.y - start.y);

        ctx.fillStyle = drawing.fillColor;

        ctx.fillRect(
            left,
            top,
            width,
            height,
        );

        ctx.strokeStyle = drawing.color;

        ctx.lineWidth = drawing.borderWidth;

        ctx.strokeRect(
            left,
            top,
            width,
            height,
        );

    }

    onCancel(){
        this.startPoint = null;
        useDrawingStore.getState().setPreviewDrawing(null);
    }

}