import {
    CandlestickSeries,
    createChart
} from "lightweight-charts";

import { chartOptions } from "@/src/config/trading/chart-options";

export function createTradingChart(
    container: HTMLDivElement
) {

    const chart = createChart(container, {
        ...chartOptions,
        width: container.clientWidth,
        height: container.clientHeight,
    });

    const series = chart.addSeries(
        CandlestickSeries,
        {
            lastValueVisible: true,
        }
    );

    return {
        chart,
        series,
    };
}