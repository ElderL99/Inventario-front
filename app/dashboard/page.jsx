'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import DashboardSummary from '@/components/dashboard/DashboardSummary'
import { getProductSummary } from '@/lib/products'
import ProductTable from '@/components/dashboard/ProductTable'

export default function DashboardPage() {
  const { token } = useAuth()
  const [resumen, setResumen] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const handleSuccess = () => {
    setRefresh(prev => !prev)
  }

  useEffect(() => {
    if (!token) return
    getProductSummary(token)
      .then(data => setResumen(data))
      .catch(err => console.error('Error al cargar resumen:', err))
  }, [token, refresh])

  if (!resumen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a] ">
        <p className="text-gray-300 text-lg font-medium">Cargando resumen...</p>
      </div>
    )
  }

  return (
    <main className="w-full h-full bg-[#1a1a1a] px-4 py-6 overflow-x-hidden md:w- lg:w-full h-full">

      <div className="">
        <h1 className="text-2xl font-bold text-white text-center sm:text-left">
          Dashboard
        </h1>

        <DashboardSummary totals={resumen} />
        <ProductTable onSuccess={handleSuccess} />
      </div>
    </main>
  )
}
