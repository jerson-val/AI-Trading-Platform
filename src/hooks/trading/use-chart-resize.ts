import { useEffect } from "react";
import { useChartStore } from "@/src/store/chart-store.store";

export function useChartResize(
    container: HTMLDivElement | null
) {

    const chart = useChartStore((s) => s.chart);

    useEffect(() => {

        if (!chart || !container)
            return;

        const resize = () => {

            chart.applyOptions({

                width: container.clientWidth,
                height: container.clientHeight,

            });

        };

        window.addEventListener(
            "resize",
            resize
        );

        return () =>
            window.removeEventListener(
                "resize",
                resize
            );

    }, [chart, container]);

}