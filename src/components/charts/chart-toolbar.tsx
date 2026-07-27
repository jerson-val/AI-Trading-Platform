'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { useTradingStore } from '@/src/store/trading.store'
import { TIME_FRAMES_OPTIONS } from '@/src/config/trading/timeframes'
import Select from '../ui/select/Select'
import ChartCountdown from './chart-countdown'
import { usePinnedTimeframes } from '@/src/hooks/trading/use-pinned-timeframes'
import CryptoIcon from '../trading/crypto-icon'

export default function ChartToolbar() {

    const symbol = useTradingStore(s => s.symbol)
    const setSymbol = useTradingStore(s => s.setSymbol)

    const timeframe = useTradingStore(s => s.timeframe)
    const setTimeframe = useTradingStore(s => s.setTimeframe)

    const candles = useTradingStore(s => s.candles)
    const lastUpdatedCandle = useTradingStore(s => s.lastUpdatedCandle)

    const pairs = useTradingStore(s => s.pairs)

    const candleForCountdown = lastUpdatedCandle ?? candles.at(-1)

    const [open, setOpen] = useState(false)

    const {
    quickTimeframes,
    extraTimeframes,
    selectTimeframe,
    } = usePinnedTimeframes(
        TIME_FRAMES_OPTIONS,
        setTimeframe,
    )

    const options = useMemo(
        () =>
            pairs.map(pair => ({
                value: pair,
                label: (
                  <div className="flex items-center gap-2">
                      <CryptoIcon symbol={pair} />
                      {pair.replace("USDT"," / USDT")}
                  </div>
              ),
            })),
        [pairs]
    );

    return (
        <div className="mb-4 flex items-center justify-between">

            <Select
                value={symbol}
                onChange={setSymbol}
                options={options}
                className="w-52"
                isSearchable
            />

            <div className="flex items-center gap-3">

                {candleForCountdown && (
                    <ChartCountdown
                        timeframe={timeframe}
                    />
                )}

                {/* QUICK BUTTONS */}

                <div className="flex items-center gap-2">

                    {quickTimeframes.map(tf => (

                        <button
                            key={tf}
                            onClick={() => selectTimeframe(tf)}
                            className={`
                                rounded-lg
                                px-3
                                py-1
                                text-sm
                                transition-colors

                                ${
                                    timeframe === tf
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-[#1f2937] hover:bg-blue-500'
                                }
                            `}
                        >
                            {tf}
                        </button>

                    ))}

                </div>

                {/* MORE */}

                <div
                    className="relative"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                >

                    <button
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-700
                            bg-slate-800
                            transition-all
                            hover:border-blue-500
                            hover:bg-slate-700
                        "
                    >
                        <ChevronDown
                            size={16}
                            className={`
                                text-slate-300
                                transition-transform
                                duration-200
                                ${
                                    open
                                        ? 'rotate-180'
                                        : ''
                                }
                            `}
                        />
                    </button>

                    <div
                        className={`
                            absolute
                            right-0
                            top-full
                            mt-1
                            z-50
                            w-24
                            overflow-hidden
                            rounded-xl
                            border
                            border-slate-700
                            bg-[#111827]
                            shadow-2xl
                            transition-all
                            duration-200

                            ${
                                open
                                    ? 'visible translate-y-0 opacity-100'
                                    : 'invisible -translate-y-2 opacity-0'
                            }
                        `}
                    >

                        {extraTimeframes.map(tf => (

                            <button
                                key={tf}
                                onClick={() => {
                                    selectTimeframe(tf)
                                    setOpen(false)
                                }}
                                className={`
                                    flex
                                    w-full
                                    items-center
                                    justify-between
                                    px-3
                                    py-2
                                    text-sm
                                    transition-colors

                                    ${
                                        timeframe === tf
                                            ? 'bg-blue-500 text-white'
                                            : 'text-slate-300 hover:bg-slate-700'
                                    }
                                `}
                            >

                                <span>{tf}</span>

                                {timeframe === tf && (
                                    <Check size={14} />
                                )}

                            </button>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
}