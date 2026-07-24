'use client'

import { useTradingStore } from '@/src/store/trading.store'
import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
    timeframe: string
}

export default function ChartCountdown({
    timeframe,
}: Props) {

    const candles = useTradingStore(s => s.candles);
    const lastUpdatedCandle = useTradingStore(s => s.lastUpdatedCandle);

    const candle = lastUpdatedCandle || candles.at(-1);

    const [remaining, setRemaining] =
        useState('--:--')

    const getTimeframeSeconds = () => {
        switch (timeframe) {
            case '1m':
                return 60

            case '5m':
                return 300

            case '15m':
                return 900

            case '30m':
                return 1800

            case '1h':
                return 3600

            case '4h':
                return 14400

            case '1d':
                return 86400

            default:
                return 60
        }
    }

    useEffect(() => {

        const timeframeSeconds =
            getTimeframeSeconds()

        const update = () => {

            if (
                candle?.time == null ||
                !Number.isFinite(candle.time)
            ) {
                setRemaining('--:--')
                return
            }

            const closeTime = candle.time + timeframeSeconds

            const now = Math.floor(Date.now() / 1000)

            const remainingSeconds = Math.max(0, closeTime - now)

            setRemaining(formatRemaining(remainingSeconds));
        }

        update()

        const timer = setInterval(update, 1000)

        return () => clearInterval(timer)

    }, [lastUpdatedCandle, timeframe])

    const formatRemaining = (totalSeconds: number) => {

        const hours = Math.floor(totalSeconds / 3600);

        const minutes = Math.floor((totalSeconds % 3600) / 60);

        const seconds = totalSeconds % 60;

        if (timeframe === '4h' || timeframe === '1d') {
            return `${hours}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;
        }

        return `${minutes}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div
            className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-700
                bg-slate-800
                px-3
                py-2
                font-mono
                text-xs
                tracking-wide
                text-slate-200
                min-w-[78px]
                justify-center
            "
        >
            <Clock3
                size={14}
                className="text-slate-400"
            />

            <span>{remaining}</span>
        </div>
    )
}