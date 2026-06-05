'use client'

import { LEVERAGE_OPTIONS } from "@/src/config/trading-settings/leverage.config"
import { useSettingsStore } from "@/src/store/settings.store"
import { preventInvalidNumberKeys, restoreZeroIfEmpty } from "@/src/utils/numbers/number-input.utils"
import { useState } from "react"

export default function TradingSettings() {

  const [riskError, setRiskError] =
    useState('')

  const settings =
    useSettingsStore(
      (state) => state.settings
    )

  const updateTradingSettings =
    useSettingsStore(
      (state) =>
        state.updateTradingSettings
    )

  const handlePercentageInput = (
    value: string
  ): string => {
    if (value === '') {
      setRiskError('')
      return ''
    }

    if (value.startsWith('.')) {
      value = `0${value}`
    }

    if (/^0\d/.test(value)) {
      value = value.substring(1)
    }

    const numericValue = Number(value)

    if (numericValue > 100) {
      setRiskError(
        'Risk percentage cannot exceed 100%'
      )
      // keep previous valid value
      return settings.tradingSettings.risk
    }

     if (
      settings.tradingSettings.risk === '100' &&
      value === '100.'
    ) {
      return '100'
    }

    if (numericValue < 0) {
      return settings.tradingSettings.risk
    }

    setRiskError('')

    return value
  }

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Trading Settings
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Configure trading defaults
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Default Risk %
          </label>

          <input
            type="text"
            step="0.01"
            min="0"
            value={
              settings.tradingSettings.risk
            }
            onChange={(e) =>
              updateTradingSettings({
                risk: handlePercentageInput(e.target.value)
              })
            }
            onBlur={() =>{
              restoreZeroIfEmpty(
                settings.tradingSettings
                  .risk,
                (value) =>
                  updateTradingSettings({
                    risk: value,
                  })
              )

              if (
                Number(
                  settings.tradingSettings.risk
                ) <= 100
              ) {
                setRiskError('')
              }
            }}
            onKeyDown={
              preventInvalidNumberKeys
            }
            className={`w-full rounded-lg border bg-[#1f2937] px-3 py-2 text-sm outline-none ${
              riskError
                ? 'border-red-500'
                : 'border-gray-700'
            }`}
          />

          {riskError && (
            <p className="mt-1 text-xs text-red-400">
              {riskError}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Default Leverage
          </label>

          <select
            value={settings.tradingSettings.leverage}
            onChange={(e) =>
              updateTradingSettings({
                leverage: e.target.value,
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          >
            {LEVERAGE_OPTIONS.map(
            (value) => (
              <option
                key={value}
                value={value}
              >
                {`1:${value}`}
              </option>
            )
          )}
        </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Preferred Pair
          </label>

          <select 
            value={settings.tradingSettings.preferedPair}
            onChange={(e) =>
              updateTradingSettings({
                preferedPair: e.target.value
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none"
          >
            <option>
              BTCUSDT
            </option>

            <option>
              ETHUSDT
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Auto Risk Management
          </label>

          <select 
            value={
              settings.tradingSettings.autoRisk
                ? 'true'
                : 'false'
            }
            onChange={(e) =>
              updateTradingSettings({
                autoRisk: e.target.value === 'true'
              })
            }
            className="w-full rounded-lg border border-gray-700 bg-[#1f2937] px-3 py-2 text-sm outline-none">
            <option value="true">
              Enabled
            </option>

            <option value="false">
              Disabled
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}