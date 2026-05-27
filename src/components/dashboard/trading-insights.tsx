export default function TradingInsights() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6 h-full">
      <h2 className="text-xl font-semibold">
        Trading Insights
      </h2>

      <div className="mt-6 space-y-5">
        <div>
          <p className="text-sm text-gray-400">
            Best Pair
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            BTCUSDT
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Best Strategy
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            Smart Money Concepts
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            Average RR
          </p>

          <h3 className="mt-1 text-lg font-semibold">
            1 : 3.2
          </h3>
        </div>

        <div>
          <p className="text-sm text-gray-400">
            AI Accuracy
          </p>

          <h3 className="mt-1 text-lg font-semibold text-green-400">
            87%
          </h3>
        </div>
      </div>
    </div>
  )
}