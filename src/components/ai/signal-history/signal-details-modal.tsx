'use client'

import Modal from '@/src/components/ui/modal'
import { formatSignalDate } from '@/src/utils/date/format-relative-date'

interface SignalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  signal: {
    pair: string
    side: string
    confidence: string
    result: string
    status: string
    createdAt: string
  } | null
}

export default function SignalDetailsModal({
  isOpen,
  onClose,
  signal,
}: SignalDetailsModalProps) {
  if (!signal) return null

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${signal.pair} ${signal.side} Signal`}
    >
      <div className="space-y-5">
        {/* SIGNAL INFO */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-4">
            <p className="text-xs text-gray-400">
              Confidence
            </p>

            <h3 className="mt-1 text-xl font-bold text-blue-400">
              {signal.confidence}
            </h3>
          </div>

          <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-4">
            <p className="text-xs text-gray-400">
              Result
            </p>

            <h3
              className={`mt-1 text-xl font-bold ${
                signal.result.startsWith(
                  '+'
                )
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {signal.result}
            </h3>
          </div>
        </div>

        {/* AI REASONING */}
        <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-5">
          <h3 className="mb-4 text-sm font-semibold">
            AI Reasoning
          </h3>

          <div className="space-y-2 text-xs text-gray-300">
            <p>
              • Bullish BOS confirmed
            </p>

            <p>
              • Liquidity sweep detected
            </p>

            <p>
              • Demand zone respected
            </p>

            <p>
              • HTF bullish alignment
            </p>

            <p>
              • Momentum increasing on 15M
            </p>
          </div>
        </div>

        {/* TRADE INFO */}
        <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-5">
          <h3 className="mb-4 text-sm font-semibold">
            Trade Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-400">
                Entry
              </p>

              <p className="mt-1 font-medium">
                104,250
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Stop Loss
              </p>

              <p className="mt-1 font-medium">
                103,900
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Take Profit
              </p>

              <p className="mt-1 font-medium">
                105,400
              </p>
            </div>

            <div>
              <p className="text-gray-400">
                Generated
              </p>

              <p className="mt-1 font-medium">
                {formatSignalDate(signal.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS */}
        <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-[#0f172a] p-4">
          <span className="text-sm text-gray-400">
            Signal Status
          </span>

          <span
            className={`rounded-md px-3 py-1 text-xs font-semibold ${
              signal.status ===
              'WIN'
                ? 'bg-green-500/10 text-green-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {signal.status}
          </span>
        </div>
      </div>
    </Modal>
  )
}