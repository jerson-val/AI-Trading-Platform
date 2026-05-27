'use client'

export default function BacktestControls() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Pair
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
            Timeframe
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              15M
            </option>

            <option>
              1H
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Start Date
          </label>

          <input
            type="date"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Initial Balance
          </label>

          <input
            type="number"
            defaultValue={1000}
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          />
        </div>

        <div className="flex items-end">
          <button className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500">
            Run Backtest
          </button>
        </div>
      </div>
    </div>
  )
}