import {
    IChartApi,
    ISeriesApi,
    Logical,
    Time,
} from "lightweight-charts";

export function chartToScreen(
    chart: IChartApi,
    series: ISeriesApi<"Candlestick">,
    time: number,
    price: number,
) {

    const timeScale =
        chart.timeScale();

    // --------------------------------------------------
    // PRICE
    // --------------------------------------------------

    const y =
        series.priceToCoordinate(
            price,
        );

    if (y === null) {
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
    // Convert drawing time to seconds
    // --------------------------------------------------

    const targetTime =
        timeToSeconds(
            time as Time,
        );

    // --------------------------------------------------
    // Calculate logical index
    // --------------------------------------------------

    const logical =
        getLogicalIndex(
            data,
            targetTime,
        );

    if (logical === null) {
        return null;
    }

    // --------------------------------------------------
    // Convert logical index to screen X
    //
    // This works even when the logical index is
    // outside the existing candle range.
    // --------------------------------------------------

    const x =
        timeScale.logicalToCoordinate(
            logical as Logical,
        );

    if (x === null) {
        return null;
    }

    return {
        x,
        y,
    };
}

// ======================================================
// LOGICAL INDEX
// ======================================================

function getLogicalIndex(
    data: readonly any[],
    targetTime: number,
): number | null {

    if (data.length === 0) {
        return null;
    }

    // --------------------------------------------------
    // One candle
    // --------------------------------------------------

    if (data.length === 1) {

        const firstTime =
            timeToSeconds(
                data[0].time,
            );

        const interval =
            60;

        return (
            targetTime -
            firstTime
        ) / interval;
    }

    // --------------------------------------------------
    // Convert candle times to seconds
    // --------------------------------------------------

    const firstTime =
        timeToSeconds(
            data[0].time,
        );

    const lastTime =
        timeToSeconds(
            data[data.length - 1].time,
        );

    // --------------------------------------------------
    // EXACT FIRST CANDLE
    // --------------------------------------------------

    if (
        targetTime === firstTime
    ) {
        return 0;
    }

    // --------------------------------------------------
    // EXACT LAST CANDLE
    // --------------------------------------------------

    if (
        targetTime === lastTime
    ) {
        return data.length - 1;
    }

    // --------------------------------------------------
    // BEFORE FIRST CANDLE
    // --------------------------------------------------

    if (
        targetTime < firstTime
    ) {

        const secondTime =
            timeToSeconds(
                data[1].time,
            );

        const interval =
            secondTime -
            firstTime;

        if (interval <= 0) {
            return null;
        }

        return (
            targetTime -
            firstTime
        ) / interval;
    }

    // --------------------------------------------------
    // AFTER LAST CANDLE
    // --------------------------------------------------

    if (
        targetTime > lastTime
    ) {

        const previousTime =
            timeToSeconds(
                data[
                    data.length - 2
                ].time,
            );

        const interval =
            lastTime -
            previousTime;

        if (interval <= 0) {
            return null;
        }

        return (
            data.length - 1
        ) +
        (
            (
                targetTime -
                lastTime
            ) / interval
        );
    }

    // --------------------------------------------------
    // BINARY SEARCH
    //
    // Find the two candles surrounding the target time.
    // --------------------------------------------------

    let low = 0;

    let high =
        data.length - 1;

    while (
        low <= high
    ) {

        const middle =
            Math.floor(
                (low + high) / 2,
            );

        const middleTime =
            timeToSeconds(
                data[middle].time,
            );

        if (
            middleTime ===
            targetTime
        ) {

            return middle;
        }

        if (
            middleTime <
            targetTime
        ) {

            low =
                middle + 1;

        } else {

            high =
                middle - 1;

        }
    }

    // --------------------------------------------------
    // Target is between `high` and `low`
    // --------------------------------------------------

    const lowerIndex =
        high;

    const upperIndex =
        low;

    if (
        lowerIndex < 0 ||
        upperIndex >= data.length
    ) {
        return null;
    }

    const lowerTime =
        timeToSeconds(
            data[
                lowerIndex
            ].time,
        );

    const upperTime =
        timeToSeconds(
            data[
                upperIndex
            ].time,
        );

    const interval =
        upperTime -
        lowerTime;

    if (interval <= 0) {
        return lowerIndex;
    }

    const ratio =
        (
            targetTime -
            lowerTime
        ) / interval;

    return (
        lowerIndex +
        ratio
    );
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
    // Date string
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