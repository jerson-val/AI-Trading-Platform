export default function AIAnalysisCard() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-400">
          AI Analysis
        </h2>

        <div className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
          ACTIVE
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Market Condition</p>
          <p className="text-lg font-semibold text-green-400">
            TRENDING
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Recommended Timeframe</p>
          <p className="text-lg font-semibold">5m</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Confidence Score</p>
          <p className="text-lg font-semibold text-blue-400">
            91%
          </p>
        </div>
      </div>
    </div>
  )
}