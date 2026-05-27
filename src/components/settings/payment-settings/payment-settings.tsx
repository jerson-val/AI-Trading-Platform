'use client'

import { useState } from "react"
import BillingHistoryModal from "../billing-history-modal/billing-history-modal"

const plans = [
  {
    name: 'Free',
    price: '$0',
    current: false,
  },
  {
    name: 'Pro',
    price: '$29/mo',
    current: true,
  },
  {
    name: 'Institutional',
    price: '$199/mo',
    current: false,
  },
]

export default function PaymentSettings() {

    const [isModalOpen, setIsModalOpen] =
        useState(false)

  return (
    <div className="rounded-xl border border-gray-800 bg-[#111827] p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Billing & Subscription
        </h2>

        <p className="mt-1 text-xs text-gray-400">
          Manage your subscription plan
        </p>
      </div>

      <div className="space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border px-4 py-4 ${
              plan.current
                ? 'border-blue-500/30 bg-blue-500/10'
                : 'border-gray-700 bg-[#1f2937]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold">
                  {plan.name}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {plan.price}
                </p>
              </div>

              {plan.current ? (
                <span className="rounded-lg bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                  Current Plan
                </span>
              ) : (
                <button className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium transition hover:bg-blue-500">
                  Upgrade
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT METHOD */}
      <div className="mt-5 rounded-lg border border-gray-700 bg-[#1f2937] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Payment Method
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Visa ending in 4242
            </p>
          </div>

          <button className="cursor-pointer text-xs text-blue-400 transition hover:text-blue-300">
            Update
          </button>
        </div>
      </div>

      {/* BILLING HISTORY */}
      <div className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            Billing History
          </h3>

          <button
            onClick={() =>
                setIsModalOpen(true)
            }
            className="cursor-pointer text-xs text-blue-400 transition hover:text-blue-300"
            >
            View All
            </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3">
            <div>
              <p className="text-sm">
                Pro Subscription
              </p>

              <p className="text-xs text-gray-400">
                May 2026
              </p>
            </div>

            <span className="text-sm">
              $29
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#1f2937] px-4 py-3">
            <div>
              <p className="text-sm">
                Pro Subscription
              </p>

              <p className="text-xs text-gray-400">
                April 2026
              </p>
            </div>

            <span className="text-sm">
              $29
            </span>
          </div>
        </div>
      </div>

      <BillingHistoryModal
        isOpen={isModalOpen}
        onClose={() =>
            setIsModalOpen(false)
        }
        />
    </div>
  )
}