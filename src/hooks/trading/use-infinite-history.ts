'use client';

import { useEffect, useRef } from 'react';

import { useChartStore } from '@/src/store/chart-store.store';
import { useTradingStore } from '@/src/store/trading.store';

import { getCandles } from '@/src/services/trading/trading.service';

const PREFETCH_THRESHOLD = 200;
const PAGE_SIZE = 500;
const DEBOUNCE_MS = 250;

export function useInfiniteHistory() {

    const chart = useChartStore(s => s.chart);
    const symbol = useTradingStore(s => s.symbol);
    const timeframe = useTradingStore(s => s.timeframe);
    const prependCandles = useTradingStore(s => s.prependCandles);
    const setLoading = useTradingStore( s => s.setLoadingOlderHistory);
    const setHasMoreHistory = useTradingStore( s => s.setHasMoreHistory);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const requestInFlight = useRef(false);

    useEffect(() => {

        if (!chart) return;

        requestInFlight.current = false;

        if (debounceRef.current) clearTimeout(debounceRef.current);

        const timeScale = chart.timeScale();

        const loadOlderCandles = async () => {

            const {
                candles,
                hasMoreHistory,
                isLoadingOlderHistory,
            } = useTradingStore.getState();

            if (!hasMoreHistory 
                || isLoadingOlderHistory
                || requestInFlight.current) return;

            const range = timeScale.getVisibleLogicalRange();

            if (!range
                || range.from > PREFETCH_THRESHOLD
                || !candles.length
            ) return;

            const oldest = candles[0];

            requestInFlight.current = true;

            try {

                setLoading(true);

                const olderCandles = await getCandles(
                    symbol,
                    timeframe,
                    PAGE_SIZE,
                    Number(oldest.time),
                );

                if (!olderCandles.length) {

                    setHasMoreHistory(false);

                    return;

                }

                prependCandles( olderCandles );

                useChartStore.getState().setPendingScrollOffset(olderCandles.length);
            }

            finally {

                requestInFlight.current = false;

                setLoading(false);

            }

        };

        const handler = () => {

            if (debounceRef.current) clearTimeout(debounceRef.current);

            debounceRef.current = setTimeout( loadOlderCandles, DEBOUNCE_MS );
        };

        timeScale.subscribeVisibleLogicalRangeChange(handler);

        return () => {

            if (debounceRef.current) {

                clearTimeout(
                    debounceRef.current
                );

            }

            requestInFlight.current = false;

            timeScale.unsubscribeVisibleLogicalRangeChange(handler);
        };

    }, [
        chart,
        symbol,
        timeframe,
        prependCandles,
        setHasMoreHistory,
        setLoading,
    ]);

}