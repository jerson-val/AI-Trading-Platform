'use client'

import DatePicker from 'react-datepicker'

interface SignalHistoryFiltersProps {
  filters: {
    side: string
    status: string
    pair: string
    minConfidence: string
    startDate: string
    endDate: string
  }

  onFilterChange: (
    key: string,
    value: string
  ) => void

  onClearFilters: () => void
}

export default function SignalHistoryFilters({
  filters,
  onFilterChange,
  onClearFilters
}: SignalHistoryFiltersProps) {
  return (
    <div className="mb-5 grid grid-cols-1 gap-4 rounded-xl border border-gray-800 bg-[#0f172a] p-5 md:grid-cols-2 xl:grid-cols-7">
      {/* SIDE */}
      <div>
        <label className="mb-2 block text-xs text-gray-400">
          Side
        </label>

        <select
          value={filters.side}
          onChange={(e) =>
            onFilterChange(
              'side',
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">
            All
          </option>

          <option value="BUY">
            BUY
          </option>

          <option value="SELL">
            SELL
          </option>
        </select>
      </div>

      {/* STATUS */}
      <div>
        <label className="mb-2 block text-xs text-gray-400">
          Result
        </label>

        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange(
              'status',
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">
            All
          </option>

          <option value="WIN">
            WIN
          </option>

          <option value="LOSS">
            LOSS
          </option>
        </select>
      </div>

      {/* PAIR */}
      <div>
        <label className="mb-2 block text-xs text-gray-400">
          Pair
        </label>

        <input
          type="text"
          placeholder="BTCUSDT"
          value={filters.pair}
          onChange={(e) =>
            onFilterChange(
              'pair',
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
        />
      </div>

      {/* CONFIDENCE */}
      <div>
        <label className="mb-2 block text-xs text-gray-400">
          Min Confidence
        </label>

        <input
            type="number"
            min={0}
            placeholder="80"
            value={filters.minConfidence}
            onChange={(e) => {
                const value = e.target.value

                if (Number(value) >= 0) {
                onFilterChange(
                    'minConfidence',
                    value
                )
                }
            }}
            onKeyDown={(e) => {
                if (
                e.key === '-' ||
                e.key === '+' ||
                e.key === 'e'
                ) {
                e.preventDefault()
                }
            }}
            className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
            />
      </div>

      {/* START DATE */}
    <div>
        <label className="mb-2 block text-xs text-gray-400">
            Start
        </label>

        <DatePicker
            selected={
            filters.startDate
                ? new Date(
                    filters.startDate
                )
                : null
            }
            onChange={(
            date: Date | null
            ) =>
            onFilterChange(
                'startDate',
                date
                ? date.toISOString()
                : ''
            )
            }
            placeholderText="Start date"
            className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500"
        />
        </div>

        {/* END DATE */}
        <div>
        <label className="mb-2 block text-xs text-gray-400">
            End
        </label>

        <DatePicker
            selected={
            filters.endDate
                ? new Date(
                    filters.endDate
                )
                : null
            }
            onChange={(
            date: Date | null
            ) =>
            onFilterChange(
                'endDate',
                date
                ? date.toISOString()
                : ''
            )
            }
            placeholderText="End date"
            className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-2 text-sm text-white outline-none transition focus:border-blue-500"
        />
        </div>

        {/* CLEAR BUTTON */}
        <div className="flex items-end">
        <button
            onClick={onClearFilters}
            className=" w-full cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
        >
            Clear
        </button>
    </div> 
    </div>
  )
}