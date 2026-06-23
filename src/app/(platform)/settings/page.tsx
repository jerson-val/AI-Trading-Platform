'use client'

import ProfileSettings from '@/src/components/settings/profile-settings/profile-settings'
import TradingSettings from '@/src/components/settings/trading-settings/trading-settings'
import NotificationsSettings from '@/src/components/settings/notifications-settings/notifications-settings'
import AppearanceSettings from '@/src/components/settings/appearance-settings/appearance-settings'
import SecuritySettings from '@/src/components/settings/security-settings/security-settings'
import ConnectedAccounts from '@/src/components/settings/connected-accounts/connected-accounts'
import PaymentSettings from '@/src/components/settings/payment-settings/payment-settings'
import ProtectedRoute from '@/src/components/auth/protected-route'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-5">
        {/* TOP */}
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT */}
          <div className="col-span-12 space-y-5 xl:col-span-8">
            <ProfileSettings />

            <TradingSettings />

            <PaymentSettings />
          </div>

          {/* RIGHT */}
          <div className="col-span-12 space-y-5 xl:col-span-4">
            {/* <AppearanceSettings /> */}
            <ConnectedAccounts />

            <NotificationsSettings />

            <SecuritySettings />

          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}