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
  { label: 'Inventario', icon: <Boxes size={18} />, href: '/dashboard/productos' },
  { label: 'Entradas', icon: <FilePlus2 size={18} />, href: '/dashboard/entradas' },
  { label: 'Salidas', icon: <FileMinus2 size={18} />, href: '/dashboard/salidas' },
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
        className="w-fit md:hidden fixed top-4 left-4 z-50 bg-[#121212] p-2 rounded-lg border border-white/10 shadow-lg"
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
  className={`fixed md:static top-0 left-0 z-40 w-64 min-h-screen bg-[#121212] text-white transform transition-transform duration-300 ease-in-out flex flex-col
  ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
>
  {/* Logo / título */}
  <div className="p-6 text-center border-b border-white/10">
    <h1 className="text-xs font-bold leading-tight tracking-widest uppercase text-gray-200">
      The Church of <br />
      Jesus Christ <br />
      of Latter-Day Saints
    </h1>
  </div>

  {/* Navegación */}
  <nav className="mt-6 space-y-1 px-1">
    {navItems.map(({ label, icon, href }) => (
      <Link
        key={label}
        href={href}
        className={`flex items-center gap-3 px-6 py-3 text-sm transition-all duration-200 rounded-r-full ${
          pathname === href
            ? 'bg-white/10 text-white font-semibold'
            : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`}
        onClick={() => setOpen(false)}
      >
        {icon}
        {label}
      </Link>
    ))}
  </nav>

  {/* Logout al fondo */}
  <div className="mt-auto p-6 border-t border-white/10">
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors"
    >
      <LogOut size={18} />
      Cerrar sesión
    </button>
  </div>
</aside>

    </>
  )
}
