import { useEffect } from "react";
import { IChartApi } from "lightweight-charts";

export function useChartResize(
    chart: IChartApi | null,
    container: HTMLDivElement | null
) {

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