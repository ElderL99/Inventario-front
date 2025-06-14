'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Boxes,
  FilePlus2,
  FileMinus2,
  Settings,
  LogOut
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
  { label: 'Inventory', icon: <Boxes size={18} />, href: '/dashboard/productos' },
  { label: 'Entry Forms', icon: <FilePlus2 size={18} />, href: '/dashboard/entradas' },
  { label: 'Exit Forms', icon: <FileMinus2 size={18} />, href: '/dashboard/salidas' },
  { label: 'Settings', icon: <Settings size={18} />, href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-[#121212] text-white flex flex-col justify-between">
      <div>
        {/* Encabezado institucional */}
        <div className="p-6 text-center border-b border-white/10">
          <h1 className="text-xs font-semibold tracking-wide leading-tight uppercase">
            THE CHURCH OF <br />
            JESUS CHRIST <br />
            OF LATTER-DAY SAINTS
          </h1>
        </div>

        <nav className="mt-6 space-y-1">
          {navItems.map(({ label, icon, href }) => (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-2 px-6 py-3 text-sm hover:bg-white/10 ${
                pathname === href ? 'bg-white/10 font-medium' : ''
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-white/10">
        <button className="flex items-center gap-2 text-sm hover:text-red-500">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </aside>
  )
}
