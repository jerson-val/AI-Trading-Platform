'use client'

const notifications = [
  'Signal Alerts',
  'Trade Executions',
  'AI Warnings',
  'Email Notifications',
  'Telegram Alerts',
]

export default function NotificationsSettings() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Notifications
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Manage platform notifications
        </p>
      </div>

      <div className="space-y-3">
        {notifications.map((item) => (
          <label
            key={item}
            className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
          >
            <span className="text-sm">
              {item}
            </span>

            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 cursor-pointer"
            />
          </label>
        ))}
      </div>
    </div>
  )
}