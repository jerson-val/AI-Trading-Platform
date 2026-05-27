'use client'

import { useAISettingsStore } from '@/src/store/ai-settings.store'

export default function ConfidenceSettings() {

    const settings =
      useAISettingsStore(
        (state) => state.settings
      )

    const setSettings =
      useAISettingsStore(
        (state) => state.setSettings
      )

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Confidence Threshold
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Minimum AI confidence required
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm">
            Minimum Confidence
          </span>

          <span className="text-sm font-semibold text-blue-400">
            {settings.minConfidence}%
          </span>
        </div>

        <input
          type="range"
          min={50}
          max={100}
          value={settings.minConfidence}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              minConfidence: Number(e.target.value)
            }))
          }
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  )
}