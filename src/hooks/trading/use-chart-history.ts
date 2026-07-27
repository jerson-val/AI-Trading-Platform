import { useChartStore } from "@/src/store/chart-store.store";
import { Candle } from "@/src/types/trading/candle";
import { IChartApi, ISeriesApi } from "lightweight-charts";
import { RefObject, useEffect } from "react";

export function useChartHistory(
    candles: Candle[],
    symbol: string,
    timeframe: string,
    isLoadingHistory: boolean
) {

    const chart = useChartStore((s) => s.chart);
    const series = useChartStore((s) => s.series);

    useEffect(() => {

        if (!series || !chart)
            return;

        series?.setData(candles);

        chart?.priceScale("right")
            .applyOptions({
                autoScale: true,
            });

    }, [
        symbol,
        timeframe,
        isLoadingHistory,
    ]);

}