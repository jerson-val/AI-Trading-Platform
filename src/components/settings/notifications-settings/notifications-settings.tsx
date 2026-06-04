'use client'

import { useSettingsStore } from "@/src/store/settings.store"
import { NotificationKey } from "@/src/types/notifications-settings/notification-key"

export default function NotificationsSettings() {

  const settings =
      useSettingsStore(
        (state) => state.settings
      )
  
  const toggleNotification =
    useSettingsStore(
      (state) => state.toggleNotification
    )

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
        {Object.entries(settings.notifications).map(([key, item]) => (
          <label
              key={key}
              className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3"
            >
              <span className="text-sm">
                {item.label}
              </span>

              <input
                type="checkbox"
                checked={item.value}
                onChange={() => toggleNotification(key as NotificationKey)}
                className="h-4 w-4 cursor-pointer"
              />
            </label>
        ))}
      </div>
    </div>
  )
}