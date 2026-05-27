'use client'

export default function TradingSettings() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Trading Settings
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Configure trading defaults
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Default Risk %
          </label>

          <input
            type="number"
            defaultValue={1}
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Default Leverage
          </label>

          <input
            type="number"
            defaultValue={10}
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Preferred Pair
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              BTCUSDT
            </option>

            <option>
              ETHUSDT
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Auto Risk Management
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              Enabled
            </option>

            <option>
              Disabled
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}