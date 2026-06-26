'use client'

import { useMemo, useState } from 'react'
import { timeZoneConfig } from '@/src/config/settings/timeZone'
import { useSettingsStore } from '@/src/store/settings.store'
import { validateFullName } from '@/src/utils/validators/input.validators'
import { PROFILE_SETTINGS } from '@/src/enums/settings/profile-settings.enum'
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import Select from '../../ui/select/Select'

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

  const timeZoneOptions = useMemo(() => {
    return timeZoneConfig
      .map((tz) => {
        let offsetMinutes = 0;
        let offsetLabel = "GMT+00:00";

        try {
          offsetMinutes = getTimezoneOffset(tz.value) / 60000;

          const rawOffset = formatInTimeZone(
            new Date(),
            tz.value,
            "xxx"
          );

          offsetLabel = `GMT${rawOffset}`;
        } catch {
          offsetMinutes = 0;
          offsetLabel = "GMT+00:00";
        }

        return {
          value: tz.value,
          label: `(${offsetLabel}) ${tz.label}`,
          search: tz.value,
          offsetMinutes,
        };
      })
      .sort((a, b) => a.offsetMinutes - b.offsetMinutes);
  }, []);

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
              handleProfileChange(PROFILE_SETTINGS.NAME, e.target.value)
              setErrors((prev) => ({ ...prev, name: '' }))
            }}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                name: validateFullName(settings.profile.name),
              }))
            }
            className={`w-full rounded-lg border bg-[#1f2937] p-3 text-sm outline-none transition ${
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
            className="w-full rounded-lg border border-gray-700 bg-[#0f172a] p-3 text-sm text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* TIMEZONE */}
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Timezone
          </label>

          <Select
            onChange={(selected) =>
              handleProfileChange(PROFILE_SETTINGS.TIME_ZONE, selected ?? "")
            }
            value={settings.profile.timeZone ?? ""}
            isSearchable={true}
            options={timeZoneOptions}
            placeholder='Select...'
          />
        </div>
      </div>
    </div>
  )
}