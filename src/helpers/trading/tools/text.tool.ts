import { IChartApi, ISeriesApi } from "lightweight-charts";
import { screenToChart } from "../screen-to-chart.helper";
import { useDrawingStore } from "@/src/store/drawing.store";
import { DrawingTool } from "@/src/types/trading/drawing-tool";
import { TextDrawing } from "@/src/types/trading/drawing";
import { chartToScreen } from "../chart-to-screen.helper";

export class TextTool implements DrawingTool {

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

    onMouseMove() {}

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: TextDrawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

        const point = chartToScreen(
            chart,
            series,
            drawing.point.time,
            drawing.point.price,
        );

        if (!point)
            return;

        ctx.save();

        ctx.font = `${drawing.fontSize}px Inter`;

        ctx.textBaseline = "top";

        ctx.shadowColor = "rgba(0,0,0,.7)";
        ctx.shadowBlur = 4;

        ctx.fillStyle = drawing.color;

        ctx.fillText(
            drawing.text,
            point.x + 2,
            point.y + 2,
        );

        ctx.restore();

    }

    onCancel() {

        useDrawingStore
            .getState()
            .setTextEditor(null);

    }

}