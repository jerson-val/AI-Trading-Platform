import { IChartApi, ISeriesApi } from "lightweight-charts";
import { screenToChart } from "../screen-to-chart.helper";
import { useDrawingStore } from "@/src/store/drawing.store";
import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { HorizontalLineDrawing } from "@/src/types/trading/drawing";

export class HorizontalLineTool implements DrawingTool {

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

        useDrawingStore.getState().addDrawing({

            id: crypto.randomUUID(),

            type: "horizontal",

            price: point.price,

            color: "#3b82f6",

            width: 2,

        });

    }

    onMouseMove() {}

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: HorizontalLineDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const coordinate = series.priceToCoordinate( drawing.price );

        if (coordinate === null)
            return;

        ctx.beginPath();

        ctx.moveTo(
            0,
            coordinate,
        );

        ctx.lineTo(
            ctx.canvas.width,
            coordinate,
        );

        ctx.strokeStyle =
            drawing.color;

        ctx.lineWidth =
            drawing.width;

        ctx.stroke();

    }

    onCancel() {}

}