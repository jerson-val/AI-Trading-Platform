const signals = [
  {
    symbol: 'BTCUSDT',
    signal: 'BUY',
    confidence: '91%',
  },
  {
    symbol: 'ETHUSDT',
    signal: 'SELL',
    confidence: '84%',
  },
]

export default function SignalsFeed() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Live Signals
      </h2>

      <div className="space-y-3">
        {signals.map((signal) => (
          <div
            key={signal.symbol}
            className="flex items-center justify-between rounded-xl bg-[#1f2937] p-4"
          >
            <div>
              <p className="font-semibold">
                {signal.symbol}
              </p>

              <p className="text-sm text-gray-400">
                {signal.signal}
              </p>
            </div>

            <div className="text-blue-400">
              {signal.confidence}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}