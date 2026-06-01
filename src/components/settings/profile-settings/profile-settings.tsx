'use client'

import { useSettingsStore } from "@/src/store/settings.store"

export default function ProfileSettings() {

  const settings =
    useSettingsStore(
      (state) => state.settings
    )
  
  const setSettings =
    useSettingsStore(
      (state) => state.setSettings
    )

  const handleProfileChange = (
    field: keyof typeof settings.profile,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }))
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Profile Settings
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Full Name
          </label>

          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) =>
              handleProfileChange(
                'name',
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Username
          </label>

          <input
            type="text"
            value={settings.profile.userName}
            onChange={(e) =>
              handleProfileChange(
                'userName',
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Email
          </label>

          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) =>
              handleProfileChange(
                'email',
                e.target.value
              )
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Timezone
          </label>

          <select 
          value={settings.profile.timeZone}
          onChange={(e) =>
            handleProfileChange(
              'timeZone',
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option>
              UTC-5
            </option>

            <option>
              UTC+0
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}