const signals = [
  {
    pair: 'BTCUSDT',
    side: 'BUY',
    entry: '104,250',
    sl: '103,900',
    tp: '105,400',
    confidence: '91%',
    time: '2m ago',
  },
  {
    pair: 'ETHUSDT',
    side: 'SELL',
    entry: '3,820',
    sl: '3,860',
    tp: '3,720',
    confidence: '84%',
    time: '5m ago',
  },
]

export default function LiveSignalsFeed() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Live AI Signals
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Real-time AI-generated trade opportunities
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400">
              <th className="pb-3">
                Pair
              </th>

              <th className="pb-3">
                Side
              </th>

              <th className="pb-3">
                Entry
              </th>

              <th className="pb-3">
                SL
              </th>

              <th className="pb-3">
                TP
              </th>

              <th className="pb-3">
                Confidence
              </th>

              <th className="pb-3">
                Time
              </th>

              <th className="pb-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="text-xs">
            {signals.map((signal) => (
              <tr
                key={`${signal.pair}-${signal.time}`}
                className="border-b border-gray-800/50"
              >
                <td className="py-3 font-medium">
                  {signal.pair}
                </td>

                <td
                  className={`py-3 font-semibold ${
                    signal.side === 'BUY'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  {signal.side}
                </td>

                <td className="py-3">
                  {signal.entry}
                </td>

                <td className="py-3">
                  {signal.sl}
                </td>

                <td className="py-3">
                  {signal.tp}
                </td>

                <td className="py-3 text-blue-400">
                  {signal.confidence}
                </td>

                <td className="py-3 text-gray-400">
                  {signal.time}
                </td>

                <td className="py-3">
                  <button className="cursor-pointer rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-500/20">
                    Execute
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}