'use client'

export default function OrderPanel() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-4">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Execute Trade
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Manage risk and orders
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-3">
        {/* RISK */}
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">
            Risk %
          </label>

          <input
            type="number"
            defaultValue={1}
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        {/* STOP LOSS */}
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">
            Stop Loss
          </label>

          <input
            type="number"
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        {/* TAKE PROFIT */}
        <div>
          <label className="mb-1.5 block text-xs text-gray-400">
            Take Profit
          </label>

          <input
            type="number"
            placeholder="0.00"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className="cursor-pointer rounded-lg bg-green-600 py-2 text-sm font-semibold transition hover:bg-green-500">
            Buy
          </button>

          <button className="cursor-pointer rounded-lg bg-red-600 py-2 text-sm font-semibold transition hover:bg-red-500">
            Sell
          </button>
        </div>
      </div>
    </div>
  )
}