'use client'

import { LEVERAGE_OPTIONS } from "@/src/config/trading-settings/leverage.config"
import { useSettingsStore } from "@/src/store/settings.store"
import { preventInvalidNumberKeys, restoreZeroIfEmpty } from "@/src/utils/numbers/number-input.utils"
import { useMemo, useState } from "react"
import Select from "../../ui/select/Select"
import { useTradingStore } from "@/src/store/trading.store"

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

  const pairs = useTradingStore(s => s.pairs)

  const symbol = useTradingStore(s => s.symbol)
  const setSymbol = useTradingStore(s => s.setSymbol)

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

  const selectAutoRiskOptions = [
    {
      label: 'Enabled',
      value: true
    },
    {
      label: 'Disabled',
      value: false
    }
  ]

  const leverageOptions = LEVERAGE_OPTIONS.map((item) => {
      return {
        value: item,
        label: `1:${item}`
      }
  })

  const options = useMemo(
          () =>
              pairs.map(pair => ({
                  value: pair,
                  label: pair.replace(
                      "USDT",
                      " / USDT"
                  ),
              })),
          [pairs]
      );
  

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
            className={`w-full rounded-lg border bg-[#1f2937] px-3 py-3 text-sm outline-none ${
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

          <Select
            onChange={(selected: number) =>
              updateTradingSettings({
                leverage: selected
              })
            }
            value={settings.tradingSettings.leverage}
            options={leverageOptions}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Preferred Pair
          </label>

          <Select
            onChange={(selected: string) =>
              updateTradingSettings({
                preferredPair: selected
              })
            }
            value={settings.tradingSettings.preferredPair}
            options={options}
          />

        </div>

        <div>
          <label className="mb-2 block text-xs text-gray-400">
            Auto Risk Management
          </label>

          <Select
            onChange={(selected: boolean) =>
              updateTradingSettings({
                autoRisk: selected
              })
            }
            value={settings.tradingSettings.autoRisk}
            options={selectAutoRiskOptions}
          />

        </div>
      </div>
    </div>
  )
}