export default function AIAnalysisPanel() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-gray-800 bg-[#111827] p-4">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          AI Analysis
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Real-time market context
        </p>
      </div>

      {/* SIGNAL CARD */}
      <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
        {/* TOP */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            BTCUSDT
          </span>

          <span className="text-sm font-semibold text-green-400">
            BUY
          </span>
        </div>

        {/* ANALYSIS */}
        <div className="mt-3 space-y-1.5 text-xs text-gray-300">
          <p>
            • Bullish BOS detected
          </p>

          <p>
            • Liquidity sweep confirmed
          </p>

          <p>
            • Demand OB respected
          </p>

          <p>
            • HTF bullish trend
          </p>
        </div>

        {/* CONFIDENCE */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[11px] text-gray-400">
            <span>
              Confidence
            </span>

            <span className="text-green-400">
              91%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-[#1f2937]">
            <div className="h-full w-[91%] rounded-full bg-green-500" />
          </div>
        </div>
      </div>
    </div>
  )
}