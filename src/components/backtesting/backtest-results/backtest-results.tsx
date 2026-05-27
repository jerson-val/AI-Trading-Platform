export default function BacktestResults() {
  const stats = [
    {
      label: 'Total PnL',
      value: '+$4,250',
      color: 'text-green-400',
    },
    {
      label: 'Win Rate',
      value: '68%',
      color: 'text-blue-400',
    },
    {
      label: 'Profit Factor',
      value: '2.4',
      color: 'text-purple-400',
    },
    {
      label: 'Max Drawdown',
      value: '-6.2%',
      color: 'text-red-400',
    },
  ]

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Backtest Results
        </h2>

        <p className="text-xs text-gray-400">
          Historical strategy performance
        </p>
      </div>

      <div className="space-y-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
          >
            <span className="text-sm text-gray-300">
              {stat.label}
            </span>

            <span
              className={`text-sm font-semibold ${stat.color}`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}