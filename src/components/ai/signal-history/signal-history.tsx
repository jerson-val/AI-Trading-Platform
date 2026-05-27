'use client'

import { useState, useMemo } from 'react'
import SignalDetailsModal from './signal-details-modal'
import { formatSignalDate } from '@/src/utils/date/format-relative-date'
import SignalHistoryFilters from './signal-history-filters'

const initialFilters = {
  side: '',
  status: '',
  pair: '',
  minConfidence: '',
  startDate: '',
  endDate: '',
}

const signalHistory = [
  {
    pair: 'BTCUSDT',
    side: 'BUY',
    confidence: '91%',
    result: '+2.4%',
    status: 'WIN',
    createdAt:
      '2026-05-26T14:30:00Z',
  },
  {
    pair: 'ETHUSDT',
    side: 'SELL',
    confidence: '84%',
    result: '-1.1%',
    status: 'LOSS',
    createdAt:
      '2026-05-25T08:10:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
  {
    pair: 'SOLUSDT',
    side: 'BUY',
    confidence: '88%',
    result: '+4.8%',
    status: 'WIN',
    createdAt:
      '2026-05-20T12:20:00Z',
  },
]

export default function SignalHistory() {
  const [selectedSignal, setSelectedSignal] =
    useState<
      (typeof signalHistory)[0] | null
    >(null)

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [filters, setFilters] =
    useState(initialFilters)

   const handleClearFilters =
    () => {
        setFilters(initialFilters)
    }

  const handleFilterChange = (
    key: string,
    value: string
    ) => {
    setFilters((prev) => ({
        ...prev,
        [key]: value,
    }))
    }

  const handleOpenModal = (
    signal: (typeof signalHistory)[0]
  ) => {
    setSelectedSignal(signal)

    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)

    setSelectedSignal(null)
  }

  const filteredSignals =
    useMemo(() => {
        return signalHistory.filter(
        (signal) => {
            // SIDE
            if (
            filters.side &&
            signal.side !==
                filters.side
            ) {
            return false
            }

            // STATUS
            if (
            filters.status &&
            signal.status !==
                filters.status
            ) {
            return false
            }

            // PAIR
            if (
            filters.pair &&
            !signal.pair
                .toLowerCase()
                .includes(
                filters.pair.toLowerCase()
                )
            ) {
            return false
            }

            // CONFIDENCE
            if (
            filters.minConfidence
            ) {
            const confidence =
                Number(
                signal.confidence.replace(
                    '%',
                    ''
                )
                )

            if (
                confidence <
                Number(
                filters.minConfidence
                )
            ) {
                return false
            }
            }

            // DATE RANGE
            const signalDate =
            new Date(
                signal.createdAt
            )

            if (
            filters.startDate
            ) {
            const start =
                new Date(
                filters.startDate
                )

            if (
                signalDate < start
            ) {
                return false
            }
            }

            if (filters.endDate) {
            const end = new Date(
                filters.endDate
            )

            if (
                signalDate > end
            ) {
                return false
            }
            }

            return true
        }
        )
    }, [filters])

  return (
    <>
      <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            AI Signal History
          </h2>

          <p className="mt-0.5 text-xs text-gray-400">
            Historical AI-generated signals
          </p>
        </div>

        <SignalHistoryFilters
            filters={filters}
            onFilterChange={
                handleFilterChange
            }
            onClearFilters={
                handleClearFilters
            }
        />

        {/* TABLE */}
        <div className="max-h-[420px] overflow-y-auto overflow-x-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-[#111827]">
              <tr className="border-b border-gray-800 text-xs text-gray-400">
                <th className="pb-3">
                  Pair
                </th>

                <th className="pb-3">
                  Side
                </th>

                <th className="pb-3">
                  Confidence
                </th>

                <th className="pb-3">
                  Result
                </th>

                <th className="pb-3">
                  Status
                </th>

                <th className="pb-3">
                  Generated
                </th>

                <th className="pb-3">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="text-xs">
              {filteredSignals.map(
                (signal, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800/50"
                  >
                    <td className="py-3 font-medium">
                      {signal.pair}
                    </td>

                    <td
                      className={`py-3 font-semibold ${
                        signal.side ===
                        'BUY'
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {signal.side}
                    </td>

                    <td className="py-3 text-blue-400">
                      {signal.confidence}
                    </td>

                    <td
                      className={`py-3 font-medium ${
                        signal.result.startsWith(
                          '+'
                        )
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {signal.result}
                    </td>

                    <td className="py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                          signal.status ===
                          'WIN'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {signal.status}
                      </span>
                    </td>

                    <td className="py-3 text-gray-400">
                      {formatSignalDate(signal.createdAt)}
                    </td>

                    <td className="py-3">
                      <button
                        onClick={() =>
                          handleOpenModal(
                            signal
                          )
                        }
                        className="cursor-pointer rounded-lg bg-blue-500/10 px-3 py-1.5 text-[11px] font-medium text-blue-400 transition hover:bg-blue-500/20"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SignalDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        signal={selectedSignal}
      />
    </>
  )
}