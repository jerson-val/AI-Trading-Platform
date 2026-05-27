'use client'

export default function SecuritySettings() {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Security
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Protect your account
        </p>
      </div>

      <div className="space-y-3">
        <button className="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3 text-left text-sm transition hover:border-gray-600">
          Change Password
        </button>

        <button className="w-full cursor-pointer rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3 text-left text-sm transition hover:border-gray-600">
          Enable 2FA
        </button>

        <button className="w-full cursor-pointer rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/20">
          Logout All Devices
        </button>
      </div>
    </div>
  )
}