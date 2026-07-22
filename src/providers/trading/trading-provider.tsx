'use client'

import { ReactNode } from 'react'
import { useTrading } from '@/src/hooks/use-trading'
import { useLiveCandles } from '@/src/hooks/use-live-candles'

export default function TradingProvider({
  children,
}: {
  children: ReactNode
}) {
  useLiveCandles()
  useTrading()

  return <>{children}</>
}