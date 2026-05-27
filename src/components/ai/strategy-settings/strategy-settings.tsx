'use client'

import { useAISettingsStore } from '@/src/store/ai-settings.store'

export default function StrategySettings() {
  const settings =
    useAISettingsStore(
      (state) => state.settings
    )

  const setSettings =
    useAISettingsStore(
      (state) => state.setSettings
    )

  const toggleStrategy = (
    id: string
  ) => {
    setSettings((prev) => ({
      ...prev,

      strategies:
        prev.strategies.map(
          (strategy) =>
            strategy.id === id
              ? {
                  ...strategy,
                  isChecked:
                    !strategy.isChecked,
                }
              : strategy
        ),
    }))
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Strategy Modules
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Enable or disable AI analysis modules
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {settings.strategies.map(
          (strategy) => (
            <label
              key={strategy.id}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
            >
              <span className="text-sm">
                {strategy.label}
              </span>

              <input
                type="checkbox"
                checked={
                  strategy.isChecked
                }
                onChange={() =>
                  toggleStrategy(
                    strategy.id
                  )
                }
                className="h-4 w-4 cursor-pointer"
              />
            </label>
          )
        )}
      </div>
    </div>
  )
}