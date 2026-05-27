import { AIFilter } from "./ai-filters"
import { AIStrategy } from "./ai-strategy"
import { AITimeframe } from "./ai-timeframe"

export interface AISettings {
  strategies: AIStrategy[]
  timeframes: AITimeframe[]
  marketConditions: AIFilter[]
  minConfidence: number
  riskPercent: number
}