'use client'

import { ReactNode } from 'react'
import { useTrading } from '@/src/hooks/trading/use-trading'
import { useLiveCandles } from '@/src/hooks/trading/use-live-candles'
import { useTradingPairs } from '@/src/hooks/trading/use-trading-pairs'

export default function TradingProvider({
  children,
}: {
  children: ReactNode
}) {
  useTradingPairs();
  useLiveCandles()
  useTrading()

  return <>{children}</>
}