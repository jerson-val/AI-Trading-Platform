const timeline = [
  '10:30 BUY BTCUSDT',
  '11:10 TP HIT',
  '12:00 SELL ETHUSDT',
  '12:30 SL HIT',
]

export default function TradeTimeline() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Trade Timeline
        </h2>

        <p className="text-xs text-gray-400">
          Chronological AI decisions
        </p>
      </div>

      <div className="space-y-3">
        {timeline.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3 text-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}