export default function AIPerformance() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          AI Performance
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          AI trading statistics
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-400">
            AI Accuracy
          </p>

          <h3 className="mt-1 text-2xl font-bold text-green-400">
            87%
          </h3>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Signals Generated
          </p>

          <h3 className="mt-1 text-2xl font-bold">
            1,284
          </h3>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Best Strategy
          </p>

          <h3 className="mt-1 text-sm font-medium">
            Smart Money Concepts
          </h3>
        </div>

        <div>
          <p className="text-xs text-gray-400">
            Win Rate
          </p>

          <h3 className="mt-1 text-sm font-medium">
            74%
          </h3>
        </div>
      </div>
    </div>
  )
}