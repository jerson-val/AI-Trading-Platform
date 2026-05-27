export default function RecentTrades() {
  return (
    <div className="rounded-2xl border border-gray-800 bg-[#111827] p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Recent Trades
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Latest executed positions
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 text-sm text-gray-400">
              <th className="pb-4">Pair</th>
              <th className="pb-4">Side</th>
              <th className="pb-4">Result</th>
              <th className="pb-4">Profit</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-sm">
              <td className="py-4">
                BTCUSDT
              </td>

              <td className="py-4 text-green-400">
                BUY
              </td>

              <td className="py-4">
                TP HIT
              </td>

              <td className="py-4 text-green-400">
                +$420
              </td>

              <td className="py-4">
                2026-05-26
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}