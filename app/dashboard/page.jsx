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

  if (!resumen) return <p className="text-white">Cargando resumen...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardSummary totals={resumen} />
      <ProductTable onSuccess={handleSuccess} />
    </div>
  )
}
