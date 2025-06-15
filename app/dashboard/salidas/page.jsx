'use client'
import { useState } from 'react'
import ExitForm from '@/components/forms/ExitForm'
import ExitList from '@/components/dashboard/ExitList'
import { exportToExcel } from '@/utils/exportToExcel'

export default function SalidasPage() {
  const [refresh, setRefresh] = useState(false)
  const [exitsData, setExitsData] = useState([])

  const handleSuccess = () => {
    setRefresh((prev) => !prev)
    console.log('Salida registrada con éxito')
  }

  const handleExport = () => {
    if (exitsData.length === 0) {
      alert('No hay salidas para exportar.')
      return
    }

    const formatted = exitsData.map((e) => ({
      Producto: e.product?.name || '',
      Cantidad: e.quantity,
      Usuario: e.user?.name || '',
      Fecha: new Date(e.date).toLocaleString('es-MX'),
      Nota: e.note || '',
    }))

    exportToExcel(formatted, 'salidas.xlsx')
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">
          Registrar salida
        </h1>

        <ExitForm onSuccess={handleSuccess} />

        <div className="flex justify-center sm:justify-end">
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
          >
            Exportar Salidas a Excel
          </button>
        </div>

        <ExitList key={refresh} onDataReady={setExitsData} />
      </div>
    </main>
  )
}
