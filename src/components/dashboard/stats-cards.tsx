import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
} from 'lucide-react'

const stats = [
  {
    title: 'Total Profit',
    value: '$12,450',
    change: '+18.2%',
    positive: true,
    icon: DollarSign,
  },
  {
    title: 'Win Rate',
    value: '74%',
    change: '+4.1%',
    positive: true,
    icon: TrendingUp,
  },
  {
    title: 'Worst Loss',
    value: '-$820',
    change: '-2.4%',
    positive: false,
    icon: TrendingDown,
  },
  {
    title: 'Total Trades',
    value: '284',
    change: '+32',
    positive: true,
    icon: BarChart3,
  },
]

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-800 bg-[#111827] p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {stat.value}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                <Icon size={22} />
              </div>
            </div>

            <p
              className={`mt-4 text-sm ${
                stat.positive
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {stat.change} this month
            </p>
          </div>
        )
      })}
    </div>
  )
}