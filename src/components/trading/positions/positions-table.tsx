export default function PositionsTable() {
  return (
    <div className="h-full rounded-2xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">
          Open Positions
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Monitor active trades
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-800 text-sm text-gray-400">
              <th className="pb-4">
                Symbol
              </th>

              <th className="pb-4">
                Side
              </th>

              <th className="pb-4">
                Entry
              </th>

              <th className="pb-4">
                PNL
              </th>

              <th className="pb-4">
                Status
              </th>
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
                104,250
              </td>

              <td className="py-4 text-green-400">
                +$324
              </td>

              <td className="py-4">
                Open
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}