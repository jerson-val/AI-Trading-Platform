'use client'

import ProfileSettings from '@/src/components/settings/profile-settings/profile-settings'
import TradingSettings from '@/src/components/settings/trading-settings/trading-settings'
import NotificationsSettings from '@/src/components/settings/notifications-settings/notifications-settings'
import SecuritySettings from '@/src/components/settings/security-settings/security-settings'
import ConnectedAccounts from '@/src/components/settings/connected-accounts/connected-accounts'
import PaymentSettings from '@/src/components/settings/payment-settings/payment-settings'
import { useEffect } from 'react'
import { getUserSettings } from '@/src/services/settings/settings.service'
import { useSettingsStore } from '@/src/store/settings.store'
import { useLoaderStore } from '@/src/store/loader.store'
import toast from 'react-hot-toast'
import { mapNotificationSettings } from '@/src/mappers/settings.mapper'
import { useAuthStore } from '@/src/store/auth.store'
import { useTradingPairs } from '@/src/hooks/trading/use-trading-pairs'

export default function SettingsPage() {

  const setProfileSettings = useSettingsStore((state) => state.setProfileSettings)
  const setNotificationsSettings = useSettingsStore((state) => state.setNotificationsSettings)
  const setTradingSettings = useSettingsStore((state) => state.setTradingSettings)

  const showLoader = useLoaderStore((state) => state.show)
  const hideLoader = useLoaderStore((state) => state.hide)

  const authStatus = useAuthStore(state => state.authStatus);

  useTradingPairs()

  useEffect(() => {

    if (authStatus !== 'authenticated') {
      return;
    }

      const loadSettings = async () => {
        try {

            showLoader()

            const settings = await getUserSettings();

            setProfileSettings(settings.profile)
            setNotificationsSettings(mapNotificationSettings(settings.notifications))
            setTradingSettings(settings.tradingSettings)
        } catch (error) {

          toast.error('Unable to load your settings.')

        } finally {

          hideLoader()

        }
      }

      loadSettings()

  }, [authStatus])

  return (
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
  )
}