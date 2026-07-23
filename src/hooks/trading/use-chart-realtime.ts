import { Candle } from "@/src/types/trading/candle";
import { ISeriesApi } from "lightweight-charts";
import { RefObject, useEffect } from "react";

export function useChartRealtime(
    series: RefObject<ISeriesApi<'Candlestick'> | null>,
    candle: Candle | null
) {

    useEffect(() => {

        if (!series)
            return;

        if (!candle)
            return;

        series?.current?.update(candle);

    }, [
        candle,
    ]);

}