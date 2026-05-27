'use client'

import Modal from '@/src/components/ui/modal'

interface BillingHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const invoices = [
  {
    id: 'INV-2026-001',
    date: 'May 2026',
    amount: '$29',
    status: 'Paid',
  },
  {
    id: 'INV-2026-002',
    date: 'April 2026',
    amount: '$29',
    status: 'Paid',
  },
  {
    id: 'INV-2026-003',
    date: 'March 2026',
    amount: '$29',
    status: 'Paid',
  },
  {
    id: 'INV-2026-004',
    date: 'February 2026',
    amount: '$29',
    status: 'Paid',
  },
]

export default function BillingHistoryModal({
  isOpen,
  onClose,
}: BillingHistoryModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Billing History"
    >
      <div className="space-y-5">
        {/* SUMMARY */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-4">
            <p className="text-xs text-gray-400">
              Total Paid
            </p>

            <h3 className="mt-1 text-xl font-bold text-green-400">
              $116
            </h3>
          </div>

          <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-4">
            <p className="text-xs text-gray-400">
              Active Plan
            </p>

            <h3 className="mt-1 text-xl font-bold text-blue-400">
              Pro
            </h3>
          </div>

          <div className="rounded-lg border border-gray-800 bg-[#0f172a] p-4">
            <p className="text-xs text-gray-400">
              Invoices
            </p>

            <h3 className="mt-1 text-xl font-bold">
              {invoices.length}
            </h3>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-[#0f172a]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-gray-400">
                <th className="p-4">
                  Invoice
                </th>

                <th className="p-4">
                  Date
                </th>

                <th className="p-4">
                  Amount
                </th>

                <th className="p-4">
                  Status
                </th>

                <th className="p-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-800 text-sm"
                >
                  <td className="p-4">
                    {invoice.id}
                  </td>

                  <td className="p-4">
                    {invoice.date}
                  </td>

                  <td className="p-4">
                    {invoice.amount}
                  </td>

                  <td className="p-4">
                    <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
                      {invoice.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button className="cursor-pointer text-xs text-blue-400 transition hover:text-blue-300">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  )
}