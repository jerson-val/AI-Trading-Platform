'use client'

export default function AppearanceSettings() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Appearance
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Customize platform appearance
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Theme
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              Dark
            </option>

            <option>
              Light
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Chart Theme
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              TradingView Dark
            </option>

            <option>
              TradingView Light
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}