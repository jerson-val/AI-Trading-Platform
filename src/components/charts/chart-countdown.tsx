'use client'

import { Clock3 } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
    candleTime: number
    timeframe: string
}

export default function ChartCountdown({
    candleTime,
    timeframe,
}: Props) {

    const [remaining, setRemaining] = useState("")

    const getSeconds = () => {
        switch (timeframe) {
            case '1m': return 60
            case '5m': return 300
            case '15m': return 900
            case '30m': return 1800
            case '1h': return 3600
            case '4h': return 14400
            case '1d': return 86400
            default: return 60
        }
    }

    useEffect(() => {

        const update = () => {

            const closeTime =
                candleTime + getSeconds()

            const now =
                Math.floor(Date.now() / 1000)

            const remainingSeconds =
                Math.max(0, closeTime - now)

            const minutes =
                Math.floor(remainingSeconds / 60)

            const seconds =
                remainingSeconds % 60

            setRemaining(
                `${minutes}:${seconds.toString().padStart(2,'0')}`
            )
        }

        update()

        const timer =
            setInterval(update,1000)

        return () => clearInterval(timer)

    }, [candleTime,timeframe])

    return (
        <div
            className="
            flex
            gap-3
            rounded-full
            bg-slate-800
            border
            border-slate-700
            px-3
            py-2
            font-mono
            text-xs
            tracking-wide
            "
        >
            <Clock3 size={14} className="text-slate-400" />
            {remaining}
        </div>
    )
}