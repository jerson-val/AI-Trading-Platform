import { IChartApi, ISeriesApi } from "lightweight-charts";
import { Drawing } from "./drawing";

export interface DrawingTool {

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): void;

    onMouseDown?(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): void;

    onMouseUp?(
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
        series: ISeriesApi<"Candlestick">,
        selected: boolean,
        hovered: boolean,
    ): void;

    onCancel(): void;

    hitTest(
        x: number,
        y: number,
        drawing: Drawing,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ): boolean;

}