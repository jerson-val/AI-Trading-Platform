const filters = [
  'Trending',
  'Ranging',
  'High Volatility',
  'Low Liquidity',
  'News Events',
]

export default function MarketFilters() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Market Conditions
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          Conditions allowed for AI trading
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {filters.map((filter) => (
          <label
            key={filter}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
          >
            <span className="text-sm">
              {filter}
            </span>

            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4"
            />
          </label>
        ))}
      </div>
    </div>
  )
}