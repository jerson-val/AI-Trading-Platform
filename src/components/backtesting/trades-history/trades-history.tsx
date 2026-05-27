const trades = [
  {
    pair: 'BTCUSDT',
    side: 'BUY',
    pnl: '+$320',
    result: 'WIN',
    confidence: '92%',
  },
  {
    pair: 'ETHUSDT',
    side: 'SELL',
    pnl: '-$120',
    result: 'LOSS',
    confidence: '74%',
  },
]

export default function TradesHistory() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Trades History
        </h2>

        <p className="text-xs text-gray-400">
          Detailed backtesting trades
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400">
              <th className="pb-4">
                Pair
              </th>

              <th className="pb-4">
                Side
              </th>

              <th className="pb-4">
                PnL
              </th>

              <th className="pb-4">
                Result
              </th>

              <th className="pb-4">
                Confidence
              </th>
            </tr>
          </thead>

          <tbody>
            {trades.map((trade) => (
              <tr
                key={`${trade.pair}-${trade.pnl}`}
                className="border-b border-gray-800 text-sm"
              >
                <td className="py-4">
                  {trade.pair}
                </td>

                <td
                  className={`py-4 ${
                    trade.side === 'BUY'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {trade.side}
                </td>

                <td className="py-4">
                  {trade.pnl}
                </td>

                <td
                  className={`py-4 ${
                    trade.result ===
                    'WIN'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {trade.result}
                </td>

                <td className="py-4">
                  {trade.confidence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}