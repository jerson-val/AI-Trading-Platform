import {
    IChartApi,
    ISeriesApi,
} from "lightweight-charts";

import { DrawingTool } from "@/src/types/trading/drawing-tool";

export class RectangleTool implements DrawingTool {

    onClick(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

    }

    onMouseMove(
        x: number,
        y: number,
        chart: IChartApi,
        series: ISeriesApi<"Candlestick">
    ) {

    }

    draw() {

    }

}