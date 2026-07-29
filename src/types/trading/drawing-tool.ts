import { IChartApi, ISeriesApi } from "lightweight-charts";
import { Drawing } from "./drawing";

export interface DrawingTool {

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): void;

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): void;

    draw(
        ctx: CanvasRenderingContext2D,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): void;

    onCancel(): void;

}