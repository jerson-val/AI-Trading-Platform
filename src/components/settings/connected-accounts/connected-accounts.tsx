'use client'

const brokers = [
  {
    name: 'Binance',
    connected: true,
  },
  {
    name: 'Bybit',
    connected: false,
  },
  {
    name: 'MetaTrader 5',
    connected: false,
  },
]

export default function ConnectedAccounts() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Connected Accounts
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Broker integrations
        </p>
      </div>

      <div className="space-y-3">
        {brokers.map((broker) => (
          <div
            key={broker.name}
            className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
          >
            <div>
              <p className="text-sm font-medium">
                {broker.name}
              </p>

              <p className="text-xs text-gray-400">
                {broker.connected
                  ? 'Connected'
                  : 'Not Connected'}
              </p>
            </div>

            <button
              className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-medium transition ${
                broker.connected
                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
              }`}
            >
              {broker.connected
                ? 'Disconnect'
                : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}