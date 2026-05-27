export default function SignalPreview() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          AI Signal Preview
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Example of AI-generated analysis
        </p>
      </div>

      <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            BTCUSDT
          </span>

          <span className="text-sm font-semibold text-green-400">
            BUY
          </span>
        </div>

        <div className="mt-3 space-y-1.5 text-xs text-gray-300">
          <p>
            • Bullish BOS detected
          </p>

          <p>
            • Liquidity sweep confirmed
          </p>

          <p>
            • Order block respected
          </p>

          <p>
            • Multi-timeframe alignment
          </p>
        </div>

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