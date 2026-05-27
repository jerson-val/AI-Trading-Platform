'use client'

import { useAISettingsStore } from '@/src/store/ai-settings.store'

export default function MarketFilters() {
  const settings =
    useAISettingsStore(
      (state) => state.settings
    )

  const setSettings =
    useAISettingsStore(
      (state) => state.setSettings
    )

  const toggleFilter = (
    id: string
  ) => {
    setSettings((prev) => ({
      ...prev,

      marketConditions:
        prev.marketConditions.map(
          (filter) =>
            filter.id === id
              ? {
                  ...filter,
                  isChecked:
                    !filter.isChecked,
                }
              : filter
        ),
    }))
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Market Conditions
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Conditions allowed for AI trading
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {settings.marketConditions.map(
          (filter) => (
            <label
              key={filter.id}
              className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
            >
              <span className="text-sm">
                {filter.label}
              </span>

              <input
                type="checkbox"
                checked={
                  filter.isChecked
                }
                onChange={() =>
                  toggleFilter(
                    filter.id
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