import StrategySettings from '@/src/components/ai/strategy-settings/strategy-settings'
import ConfidenceSettings from '@/src/components/ai/confidence-settings/confidence-settings'
import TimeframeSettings from '@/src/components/ai/timeframe-settings/timeframe-settings'
import MarketFilters from '@/src/components/ai/market-filters/market-filters'
import AIPerformance from '@/src/components/ai/ai-performance/ai-performance'
import SignalPreview from '@/src/components/ai/signal-preview/signal-preview'
import SignalHistory from '@/src/components/ai/signal-history/signal-history'

export default function AIEnginePage() {
  return (
    <div className="space-y-5">
      {/* TOP */}
      <div className="grid grid-cols-12 gap-5">
        {/* LEFT */}
        <div className="col-span-12 space-y-5 xl:col-span-8">
          <StrategySettings />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ConfidenceSettings />

            <TimeframeSettings />
          </div>

          <MarketFilters />
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-5 xl:col-span-4">
          <AIPerformance />

          <SignalPreview />
        </div>

        <div className="col-span-12 space-y-5">
          <SignalHistory  />
        </div>
        
      </div>
    </div>
  )
}