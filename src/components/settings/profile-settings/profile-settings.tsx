'use client'

export default function ProfileSettings() {
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
            placeholder="John Doe"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Username
          </label>

          <input
            type="text"
            placeholder="johntrader"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Email
          </label>

          <input
            type="email"
            placeholder="john@email.com"
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Timezone
          </label>

          <select className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
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