import { ChartPie, House, Milestone } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

const navItems = [
  {
    to: '/',
    label: 'Home',
    icon: House,
  },
  {
    to: '/timeline',
    label: 'Timeline',
    icon: Milestone,
  },
  {
    to: '/stats',
    label: 'Stats',
    icon: ChartPie,
  },
]

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 py-2 sm:px-6 lg:px-8">
        <NavLink to="/" className="inline-flex items-center gap-3">
          <img src={logo} alt="KeenKeeper" className="h-8 w-auto sm:h-10" />
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-2.5 py-2 text-sm font-medium transition-colors sm:px-4 sm:py-1.5 ${
                    isActive
                      ? 'bg-[#244D3F] text-white'
                      : 'text-[#64748B] hover:text-[#244D3F]'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
