'use client'

import { useMemo, useState } from 'react'
import { timeZoneConfig } from '@/src/config/settings/timeZone'
import { useSettingsStore } from '@/src/store/settings.store'
import {
  validateFullName,
} from '@/src/utils/validators/input.validators'

export default function ProfileSettings() {

  const settings = useSettingsStore((state) => state.settings)
  const setSettings = useSettingsStore((state) => state.setSettings)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

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

  const getOffsetMinutes = (tz: string) => {
    const now = new Date()

    const utcDate = new Date(
      now.toLocaleString('en-US', { timeZone: 'UTC' })
    )

    const tzDate = new Date(
      now.toLocaleString('en-US', { timeZone: tz })
    )

    return (tzDate.getTime() - utcDate.getTime()) / 60000
  }

  const timeZoneValues = useMemo(() => {
    return timeZoneConfig
      .map((tz) => ({
        ...tz,
        offsetMinutes: getOffsetMinutes(tz.value),
        time: new Intl.DateTimeFormat('en-US', {
          timeZone: tz.value,
          timeZoneName: 'shortOffset',
        })
          .formatToParts(new Date())
          .find(p => p.type === 'timeZoneName')?.value,
      }))
      .sort((a, b) => {
        // 1. sort by REAL numeric offset
        if (a.offsetMinutes !== b.offsetMinutes) {
          return a.offsetMinutes - b.offsetMinutes
        }

        // 2. fallback alphabetical
        return a.label.localeCompare(b.label)
      })
  }, [])

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Profile Settings</h2>
        <p className="mt-1 text-xs text-gray-400">
          Manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* NAME */}
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Full Name
          </label>

          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => {
              handleProfileChange('name', e.target.value)
              setErrors((prev) => ({ ...prev, name: '' }))
            }}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                name: validateFullName(settings.profile.name),
              }))
            }
            className={`w-full rounded-lg border bg-[#1f2937] px-3 py-2 text-sm outline-none transition ${
              errors.name
                ? 'border-red-500'
                : 'border-gray-700 focus:border-blue-500'
            }`}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Email
          </label>

          <input
            type="email"
            readOnly
            value={settings.profile.email}
            className="w-full rounded-lg border border-gray-700 bg-[#0f172a] px-3 py-2 text-sm text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* TIMEZONE */}
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Timezone
          </label>

          <select
            value={settings.profile.timeZone}
            onChange={(e) =>
              handleProfileChange('timeZone', e.target.value)
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          >
            {timeZoneValues.map((tz) => (
              <option key={tz.value} value={tz.value}>
                ({tz.time}) {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}