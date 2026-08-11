import {
    IChartApi,
    ISeriesApi,
    UTCTimestamp,
} from "lightweight-charts";

import {
    ChartPoint,
} from "@/src/types/trading/drawing";

export function screenToChart(
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    x: number,
    y: number,
): ChartPoint | null {

    const timeScale =
        chart.timeScale();

    // --------------------------------------------------
    // PRICE
    // --------------------------------------------------

    const price =
        series.coordinateToPrice(y);

    if (price === null) {
        return null;
    }

    // --------------------------------------------------
    // LOGICAL X
    //
    // Unlike coordinateToTime(), coordinateToLogical()
    // also works when the cursor is in empty space.
    // --------------------------------------------------

    const logical =
        timeScale.coordinateToLogical(x);

    if (logical === null) {
        return null;
    }

    // --------------------------------------------------
    // SERIES DATA
    // --------------------------------------------------

    const data =
        series.data();

    if (data.length === 0) {
        return null;
    }

    // --------------------------------------------------
    // ONE CANDLE
    // --------------------------------------------------

    if (data.length === 1) {

        const firstTime =
            timeToSeconds(
                data[0].time,
            );

        return {
            time:
                firstTime as UTCTimestamp,

            price,
        };
    }

    // --------------------------------------------------
    // EXACT / BETWEEN CANDLES
    // --------------------------------------------------

    if (
        logical >= 0 &&
        logical <= data.length - 1
    ) {

        const lowerIndex =
            Math.floor(logical);

        const upperIndex =
            Math.ceil(logical);

        // Exact candle
        if (
            lowerIndex === upperIndex
        ) {

            return {
                time:
                    normalizeTime(
                        data[lowerIndex].time,
                    ),

                price,
            };
        }

        const lowerTime =
            timeToSeconds(
                data[lowerIndex].time,
            );

        const upperTime =
            timeToSeconds(
                data[upperIndex].time,
            );

        const ratio =
            logical -
            lowerIndex;

        const interpolatedTime =
            lowerTime +
            (
                upperTime -
                lowerTime
            ) *
            ratio;

        return {
            time:
                Math.round(
                    interpolatedTime,
                ) as UTCTimestamp,

            price,
        };
    }

    // --------------------------------------------------
    // EMPTY SPACE AFTER LAST CANDLE
    // --------------------------------------------------

    if (
        logical >
        data.length - 1
    ) {

        const previous =
            data[
                data.length - 2
            ];

        const last =
            data[
                data.length - 1
            ];

        const previousTime =
            timeToSeconds(
                previous.time,
            );

        const lastTime =
            timeToSeconds(
                last.time,
            );

        const interval =
            lastTime -
            previousTime;

        if (interval <= 0) {
            return null;
        }

        const candlesAfterLast =
            logical -
            (
                data.length - 1
            );

        const extrapolatedTime =
            lastTime +
            (
                candlesAfterLast *
                interval
            );

        return {
            time:
                Math.round(
                    extrapolatedTime,
                ) as UTCTimestamp,

            price,
        };
    }

    // --------------------------------------------------
    // EMPTY SPACE BEFORE FIRST CANDLE
    // --------------------------------------------------

    if (logical < 0) {

        const first =
            data[0];

        const second =
            data[1];

        const firstTime =
            timeToSeconds(
                first.time,
            );

        const secondTime =
            timeToSeconds(
                second.time,
            );

        const interval =
            secondTime -
            firstTime;

        if (interval <= 0) {
            return null;
        }

        const extrapolatedTime =
            firstTime +
            (
                logical *
                interval
            );

        return {
            time:
                Math.round(
                    extrapolatedTime,
                ) as UTCTimestamp,

            price,
        };
    }

    return null;
}

// ======================================================
// TIME HELPERS
// ======================================================

function timeToSeconds(
    time: unknown,
): number {

    // ------------------------------------------
    // UTCTimestamp
    // ------------------------------------------

    if (
        typeof time === "number"
    ) {
        return time;
    }

    // ------------------------------------------
    // BusinessDay / Date string
    // ------------------------------------------

    if (
        typeof time === "string"
    ) {

        return (
            new Date(time).getTime() /
            1000
        );
    }

    // ------------------------------------------
    // BusinessDay
    // ------------------------------------------

    if (
        typeof time === "object" &&
        time !== null &&
        "year" in time &&
        "month" in time &&
        "day" in time
    ) {

        const businessDay =
            time as {
                year: number;
                month: number;
                day: number;
            };

        return (
            Date.UTC(
                businessDay.year,
                businessDay.month - 1,
                businessDay.day,
            ) / 1000
        );
    }

    throw new Error(
        "Unsupported Lightweight Charts time format.",
    );
}

function normalizeTime(
    time: unknown,
): UTCTimestamp {

    return Math.round(
        timeToSeconds(time),
    ) as UTCTimestamp;
}