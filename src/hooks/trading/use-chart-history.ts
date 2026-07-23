import { Candle } from "@/src/types/trading/candle";
import { IChartApi, ISeriesApi } from "lightweight-charts";
import { RefObject, useEffect } from "react";

export function useChartHistory(
    series: RefObject<ISeriesApi<'Candlestick'> | null>,
    chart: RefObject<IChartApi | null>,
    candles: Candle[],
    symbol: string,
    timeframe: string,
    isLoadingHistory: boolean
) {

    useEffect(() => {

        if (!series || !chart)
            return;

        series?.current?.setData(candles);

        chart?.current?.priceScale("right")
            .applyOptions({
                autoScale: true,
            });

    }, [
        symbol,
        timeframe,
        isLoadingHistory,
    ]);

}