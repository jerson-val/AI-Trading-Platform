'use client'

import { ReactNode } from 'react'
import { useTrading } from '@/src/hooks/use-trading'

export default function TradingProvider({
  children,
}: {
  children: ReactNode
}) {
  useTrading()

  return <>{children}</>
}