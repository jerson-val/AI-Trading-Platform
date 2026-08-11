// drawing-area.helper.ts

import { IChartApi } from "lightweight-charts";

export function getDrawingAreaWidth(
    chart: IChartApi,
): number {

    return chart
        .timeScale()
        .width();
}

export function isInsideDrawingArea(
    chart: IChartApi,
    x: number,
    y: number,
): boolean {

    const width =
        getDrawingAreaWidth(chart);

    const paneSize =
        chart.paneSize();

    return (
        x >= 0 &&
        x <= width &&
        y >= 0 &&
        y <= paneSize.height
    );
}