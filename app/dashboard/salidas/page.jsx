'use client'
import { useState } from 'react'
import ExitForm from '@/components/forms/ExitForm'
import ExitList from '@/components/dashboard/ExitList'
import { exportToExcel } from '@/utils/exportToExcel'

export default function SalidasPage() {
  const [refresh, setRefresh] = useState(false)
  const [exitsData, setExitsData] = useState([])

  const handleSuccess = () => {
    setRefresh(prev => !prev)
    console.log('Salida registrada con éxito')
  }

  const handleExport = () => {
    if (exitsData.length === 0) {
      alert('No hay salidas para exportar.')
      return
    }

    const formatted = exitsData.map(e => ({
      Producto: e.product?.name || '',
      Cantidad: e.quantity,
      Usuario: e.user?.name || '',
      Fecha: new Date(e.date).toLocaleString('es-MX'),
      Nota: e.note || ''
    }))

    exportToExcel(formatted, 'salidas.xlsx')
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar salida</h1>
      <ExitForm onSuccess={handleSuccess} />

      <div className="flex justify-end my-4">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Exportar Salidas a Excel
        </button>
      </div>

      <ExitList key={refresh} onDataReady={setExitsData} />
    </div>
  )
}
