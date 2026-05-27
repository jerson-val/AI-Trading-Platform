export default function RiskAnalysis() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Risk Analysis
        </h2>

        <p className="text-xs text-gray-400">
          Risk metrics overview
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">
            Avg Risk
          </span>

          <span>
            1.2%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Worst Loss
          </span>

          <span className="text-red-400">
            -$320
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
            Best Win
          </span>

          <span className="text-green-400">
            +$780
          </span>
        </div>
      </div>
    </div>
  )
}