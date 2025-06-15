'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Sidebar from '@/components/layout/Sidebar'

export default function DashboardLayout({ children }) {
  const { token, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login')
    }
  }, [token, loading])

  if (loading || !token) return null

  return (
    <div className="flex min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      <Sidebar />
      <main className="flex-1 w-full px-4 py-6 text-white md:px-8 lg:px-12 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  )
}
