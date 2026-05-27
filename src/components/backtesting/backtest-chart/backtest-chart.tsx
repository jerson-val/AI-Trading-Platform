'use client'

export default function BacktestChart() {
  return (
    <div className="h-[500px] rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Historical Replay
        </h2>

        <p className="text-xs text-gray-400">
          Visualize AI trade execution
        </p>
      </div>

      <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed border-gray-700 text-sm text-gray-500">
        Trading Replay Chart
      </div>
    </div>
  )
}