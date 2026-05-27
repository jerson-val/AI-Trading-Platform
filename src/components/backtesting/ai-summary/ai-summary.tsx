export default function AISummary() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          AI Summary
        </h2>

        <p className="text-xs text-gray-400">
          Best performing conditions
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">
            Best Strategy
          </span>

          <span>
            SMC + FVG
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Best Pair
          </span>

          <span>
            BTCUSDT
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Best Session
          </span>

          <span>
            London
          </span>
        </div>
      </div>
    </div>
  )
}