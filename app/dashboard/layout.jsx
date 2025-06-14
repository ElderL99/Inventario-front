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
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#1a1a1a] text-white p-6">
        {children}
      </main>
    </div>
  )
}
