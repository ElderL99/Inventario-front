'use client'
import { useState } from 'react'
import EntryForm from '@/components/forms/EntryForm'
import EntryList from '@/components/dashboard/EntryList'
import { exportToExcel } from '@/utils/exportToExcel'

export default function EntradasPage() {
  const [refresh, setRefresh] = useState(false)
  const [entriesData, setEntriesData] = useState([])

  const handleSuccess = () => {
    setRefresh(prev => !prev)
    console.log('Entrada registrada con éxito')
  }

  const handleExport = () => {
  if (entriesData.length === 0) {
    alert('No hay entradas para exportar.')
    return
  }

  const formatted = entriesData.map(e => ({
    Producto: e.product?.name || '',      
    Cantidad: e.quantity,
    Usuario: e.user?.name || '',
    Fecha: new Date(e.date).toLocaleString('es-MX'),
    Nota: e.note || ''
  }))

  exportToExcel(formatted, 'entradas.xlsx')
}


  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar entrada</h1>
      <EntryForm onSuccess={handleSuccess} />

      {/* ✅ Botón para exportar */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Exportar Entradas a Excel
        </button>
      </div>

      {/* ⬇️ Asegúrate de que EntryList exponga los datos */}
      <EntryList key={refresh} onDataReady={setEntriesData} />
    </div>
  )
}
