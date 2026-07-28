import {
    IChartApi,
    ISeriesApi,
    Time,
} from "lightweight-charts";

export function chartToScreen(
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    time: number,
    price: number,
) {
    const x = chart
        .timeScale()
        .timeToCoordinate(time as Time);

    const y =
        series.priceToCoordinate(price);

    if (x == null || y == null)
        return null;

    return { x, y };
}