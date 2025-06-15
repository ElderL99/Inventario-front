'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import {
  LayoutDashboard,
  Boxes,
  FilePlus2,
  FileMinus2,
  LogOut,
} from 'lucide-react'

import { useAuth } from '@/context/AuthContext'

const navItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={18} />, href: '/dashboard' },
  { label: 'Inventory', icon: <Boxes size={18} />, href: '/dashboard/productos' },
  { label: 'Entry Forms', icon: <FilePlus2 size={18} />, href: '/dashboard/entradas' },
  { label: 'Exit Forms', icon: <FileMinus2 size={18} />, href: '/dashboard/salidas' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <>
      {/* Botón hamburguesa visible solo en móvil */}
      <button
        className="w-full md:hidden fixed top-4 left-4 z-50 bg-[#121212] p-2 rounded"
        onClick={() => setOpen(!open)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15" />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen bg-[#121212] text-white transform transition-transform duration-300 ease-in-out flex flex-col justify-between
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
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
                onClick={() => setOpen(false)} // cierra menú en móvil al navegar
              >
                {icon}
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm hover:text-red-500"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  )
}
