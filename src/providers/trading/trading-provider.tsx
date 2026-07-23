'use client'

import { ReactNode } from 'react'
import { useTrading } from '@/src/hooks/trading/use-trading'
import { useLiveCandles } from '@/src/hooks/trading/use-live-candles'

export default function TradingProvider({
  children,
}: {
  children: ReactNode
}) {
  useLiveCandles()
  useTrading()

  return <>{children}</>
}