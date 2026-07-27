import { useChartStore } from "@/src/store/chart-store.store";
import { Candle } from "@/src/types/trading/candle";
import { useEffect } from "react";

export function useChartRealtime(
    candle: Candle | null
) {

    const series = useChartStore((s) => s.series);

    useEffect(() => {

        if (!series)
            return;

        if (!candle)
            return;

        series.update(candle);

    }, [
        candle,
    ]);

}