import StatsCards from '@/src/components/dashboard/stats-cards'
import PerformanceChart from '@/src/components/dashboard/performance-chart'
import RecentTrades from '@/src/components/dashboard/recent-trades'
import TradingInsights from '@/src/components/dashboard/trading-insights'
import ProtectedRoute from '@/src/components/auth/protected-route'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-5">
        {/* STATS */}
        <StatsCards />

        {/* CHART + INSIGHTS */}
        <div className="grid grid-cols-12 gap-5">
          {/* PERFORMANCE CHART */}
          <div className="col-span-12 xl:col-span-8">
            <PerformanceChart />
          </div>

          {/* INSIGHTS */}
          <div className="col-span-12 xl:col-span-4">
            <TradingInsights />
          </div>
        </div>

        {/* RECENT TRADES */}
        <RecentTrades />
      </div>
    </ProtectedRoute>
    
  )
}