'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function EntryList({ onDataReady }) {
  const { token } = useAuth()
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  // 1. Filtro por fechas
  const filteredEntries = entries.filter((entry) => {
    if (!fechaInicio && !fechaFin) return true

    const fechaEntry = new Date(entry.date)
    const desde = fechaInicio ? new Date(fechaInicio) : null
    const hasta = fechaFin ? new Date(fechaFin + 'T23:59:59') : null

    return (!desde || fechaEntry >= desde) && (!hasta || fechaEntry <= hasta)
  })

  // 2. Controla si ya enviaste los datos filtrados
  const prevDataRef = useRef(null)
  useEffect(() => {
    const dataString = JSON.stringify(filteredEntries)
    if (onDataReady && prevDataRef.current !== dataString) {
      onDataReady(filteredEntries)
      prevDataRef.current = dataString
    }
  }, [filteredEntries, onDataReady])

  // 3. Cargar entradas del backend
  useEffect(() => {
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setEntries)
      .catch(() => setError('Error al cargar entradas'))
  }, [token])

  return (
    <div className="mt-4 text-white">
      <h2 className="text-lg font-bold mb-2">Historial de Entradas</h2>
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="bg-[#1e1e1e] border border-gray-600 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <table className="w-full text-sm bg-[#1e1e1e] rounded">
        <thead className="bg-[#333] text-gray-300 uppercase">
          <tr>
            <th className="p-2">Producto</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Fecha</th>
            <th className="p-2">Usuario</th>
            <th className="p-2">Nota</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry) => (
            <tr key={entry._id} className="border-t border-gray-700">
              <td className="p-2">{entry.product?.name || '—'}</td>
              <td className="p-2">{entry.quantity}</td>
              <td className="p-2">{new Date(entry.date).toLocaleString('es-MX')}</td>
              <td className="p-2">{entry.user?.name || '—'}</td>
              <td className="p-2">{entry.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
