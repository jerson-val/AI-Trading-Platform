import { useEffect } from "react";

import { useChartStore } from "@/src/store/chart-store.store";

import { Candle } from "@/src/types/trading/candle";

export function useChartHistory(
    candles: Candle[],
    symbol: string,
    timeframe: string,
    isLoadingHistory: boolean,
) {

    const chart = useChartStore(s => s.chart);

    const series = useChartStore(s => s.series);

    useEffect(() => {

        if (!chart || !series)
            return;

        const previousRange = chart.timeScale().getVisibleLogicalRange();

        series.setData(candles);

        chart.priceScale("right")
            .applyOptions({
                autoScale:true,
            });

        const pendingOffset =
            useChartStore
                .getState()
                .pendingScrollOffset;

        if (
            pendingOffset > 0 &&
            previousRange
        ) {

            chart
                .timeScale()
                .setVisibleLogicalRange({

                    from:
                        previousRange.from +
                        pendingOffset,

                    to:
                        previousRange.to +
                        pendingOffset,

                });

            useChartStore
                .getState()
                .clearPendingScrollOffset();

        }

    }, [
        candles,
        symbol,
        timeframe,
        isLoadingHistory,
    ]);

}