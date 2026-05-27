'use client'

import { useState } from 'react'

const availableTimeframes = [
  '4H',
  '1H',
  '15M',
  '5M',
]

export default function TimeframeSettings() {
  const [selectedTimeframes, setSelectedTimeframes] =
    useState([
      '4H',
      '1H',
      '15M',
    ])

  const toggleTimeframe = (
    timeframe: string
  ) => {
    setSelectedTimeframes((prev) => {
      if (
        prev.includes(timeframe)
      ) {
        return prev.filter(
          (tf) => tf !== timeframe
        )
      }

      return [
        ...prev,
        timeframe,
      ]
    })
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Multi-Timeframe
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Timeframes analyzed by AI
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTimeframes.map(
          (timeframe) => {
            const isSelected =
              selectedTimeframes.includes(
                timeframe
              )

            return (
              <button
                key={timeframe}
                onClick={() =>
                  toggleTimeframe(
                    timeframe
                  )
                }
                className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  isSelected
                    ? 'border border-blue-500/20 bg-blue-500/10 text-blue-400'
                    : 'border border-gray-700 bg-[#1f2937] text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {timeframe}
              </button>
            )
          }
        )}
      </div>
    </div>
  )
}