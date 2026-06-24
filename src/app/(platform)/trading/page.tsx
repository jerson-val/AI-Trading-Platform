import TradingChart from '@/src/components/charts/trading-chart'
import OrderPanel from '@/src/components/trading/order-panel/order-panel'
import AIAnalysisPanel from '@/src/components/trading/ai-panel/ai-analysis-panel'
import PositionsTable from '@/src/components/trading/positions/positions-table'
import LiveSignalsFeed from '@/src/components/trading/live-signals/live-signals-feed'

export default function TradingPage() {
  return (
      <div className="flex h-full flex-col gap-5">
        {/* TOP */}
        <div className="grid flex-1 grid-cols-12 gap-5">
          {/* CHART */}
          <div className="col-span-12 xl:col-span-9">
            <TradingChart />
          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-12 flex min-h-0 flex-col gap-5 xl:col-span-3">
            <OrderPanel />

            <AIAnalysisPanel />
          </div>
        </div>

        {/* LIVE SIGNALS */}
        <LiveSignalsFeed />

        {/* POSITIONS */}
        <div className="min-h-[250px] max-h-[500px] overflow-y-auto pb-5">
          <PositionsTable />
        </div>
      </div>
  )
}