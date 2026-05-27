'use client'

import { useAISettingsStore } from '@/src/store/ai-settings.store'

export default function TimeframeSettings() {
  const settings =
    useAISettingsStore(
      (state) => state.settings
    )

  const setSettings =
    useAISettingsStore(
      (state) => state.setSettings
    )

  const toggleTimeframe = (
    id: string
  ) => {
    setSettings((prev) => ({
      ...prev,

      timeframes:
        prev.timeframes.map(
          (timeframe) =>
            timeframe.id === id
              ? {
                  ...timeframe,
                  isChecked:
                    !timeframe.isChecked,
                }
              : timeframe
        ),
    }))
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
        {settings.timeframes.map(
          (timeframe) => (
            <button
              key={timeframe.id}
              onClick={() =>
                toggleTimeframe(
                  timeframe.id
                )
              }
              className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                timeframe.isChecked
                  ? 'border border-blue-500/20 bg-blue-500/10 text-blue-400'
                  : 'border border-gray-700 bg-[#1f2937] text-gray-400 hover:border-gray-600 hover:text-white'
              }`}
            >
              {timeframe.label}
            </button>
          )
        )}
      </div>
    </div>
  )
}