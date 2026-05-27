'use client'

import BacktestControls from '@/src/components/backtesting/backtest-controls/backtest-controls'
import BacktestChart from '@/src/components/backtesting/backtest-chart/backtest-chart'
import BacktestResults from '@/src/components/backtesting/backtest-results/backtest-results'
import AISummary from '@/src/components/backtesting/ai-summary/ai-summary'
import RiskAnalysis from '@/src/components/backtesting/risk-analysis/risk-analysis'
import TradeTimeline from '@/src/components/backtesting/trade-timeline/trade-timeline'
import TradesHistory from '@/src/components/backtesting/trades-history/trades-history'

export default function BacktestingPage() {
  return (
    <div className="space-y-5">
      {/* TOP CONTROLS */}
      <BacktestControls />

      {/* MAIN GRID */}
      <div className="grid grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="col-span-12 space-y-5 xl:col-span-8">
          <BacktestChart />

          <TradeTimeline />
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-5 xl:col-span-4">
          <BacktestResults />

          <AISummary />

          <RiskAnalysis />
        </div>
      </div>

      {/* TABLE */}
      <TradesHistory />
    </div>
  )
}