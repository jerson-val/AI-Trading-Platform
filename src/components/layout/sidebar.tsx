'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  LayoutDashboard,
  CandlestickChart,
  BrainCircuit,
  BarChart3,
  Settings,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Trading',
    href: '/trading',
    icon: CandlestickChart,
  },
  {
    label: 'AI Engine',
    href: '/ai-engine',
    icon: BrainCircuit,
  },
  {
    label: 'Backtesting',
    href: '/backtesting',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-gray-800 bg-[#0b1220]">
      {/* LOGO */}
      <div className="border-b border-gray-800 px-5 py-4">
        <h1 className="text-2xl font-extrabold tracking-wide text-blue-400">
          SMC AI
        </h1>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 p-3">
        {menuItems.map((item) => {
          const Icon = item.icon

          const isActive =
            pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-500/15 text-blue-400'
                  : 'text-gray-400 hover:bg-[#111827] hover:text-white'
              }`}
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}