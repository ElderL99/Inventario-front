'use client'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ExitList({ onDataReady }) {
  const { token } = useAuth()
  const [exits, setExits] = useState([])
  const [error, setError] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  // 🧠 Filtrado por fechas
  const filteredExits = exits.filter((exit) => {
    if (!fechaInicio && !fechaFin) return true
    const fecha = new Date(exit.date)
    const desde = fechaInicio ? new Date(fechaInicio) : null
    const hasta = fechaFin ? new Date(fechaFin + 'T23:59:59') : null
    return (!desde || fecha >= desde) && (!hasta || fecha <= hasta)
  })

  // ✅ Enviar datos filtrados al padre sin bucles infinitos
  const prevDataRef = useRef(null)
  useEffect(() => {
    const dataString = JSON.stringify(filteredExits)
    if (onDataReady && prevDataRef.current !== dataString) {
      onDataReady(filteredExits)
      prevDataRef.current = dataString
    }
  }, [filteredExits, onDataReady])

  // 🔄 Carga de datos
  useEffect(() => {
    if (!token) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exits`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setExits)
      .catch(() => setError('Error al cargar salidas'))
  }, [token])

  return (
    <div className="mt-4 text-white">
      <h2 className="text-lg font-bold mb-2">Historial de Salidas</h2>
      {error && <p className="text-red-500">{error}</p>}

      {/* 🗓️ Filtros de fecha */}
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

      {/* 📋 Tabla */}
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
          {filteredExits.map((exit) => (
            <tr key={exit._id} className="border-t border-gray-700">
              <td className="p-2">{exit.product?.name || '—'}</td>
              <td className="p-2">{exit.quantity}</td>
              <td className="p-2">{new Date(exit.date).toLocaleString('es-MX')}</td>
              <td className="p-2">{exit.user?.name || '—'}</td>
              <td className="p-2">{exit.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
