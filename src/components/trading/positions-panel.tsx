const positions = [
  {
    symbol: 'BTCUSDT',
    side: 'BUY',
    pnl: '+$124.50',
  },
  {
    symbol: 'ETHUSDT',
    side: 'SELL',
    pnl: '+$84.10',
  },
]

export default function PositionsPanel() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-5">
      <h2 className="mb-4 text-lg font-semibold">
        Active Positions
      </h2>

      <div className="space-y-3">
        {positions.map((position) => (
          <div
            key={position.symbol}
            className="rounded-xl bg-[#1f2937] p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {position.symbol}
                </p>
                <p className="text-sm text-gray-400">
                  {position.side}
                </p>
              </div>

              <div className="text-green-400">
                {position.pnl}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}