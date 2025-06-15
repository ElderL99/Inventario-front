'use client'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ExitList({ onDataReady }) {
  const { token } = useAuth()
  const [exits, setExits] = useState([])
  const [error, setError] = useState('')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  // 🧠 Filtro por fechas
  const filteredExits = exits.filter((exit) => {
    if (!fechaInicio && !fechaFin) return true
    const fecha = new Date(exit.date)
    const desde = fechaInicio ? new Date(fechaInicio) : null
    const hasta = fechaFin ? new Date(fechaFin + 'T23:59:59') : null
    return (!desde || fecha >= desde) && (!hasta || fecha <= hasta)
  })

  // 🔄 Enviar datos al padre sin loops infinitos
  const prevDataRef = useRef(null)
  useEffect(() => {
    const dataString = JSON.stringify(filteredExits)
    if (onDataReady && prevDataRef.current !== dataString) {
      onDataReady(filteredExits)
      prevDataRef.current = dataString
    }
  }, [filteredExits, onDataReady])

  // 📦 Carga de salidas
  useEffect(() => {
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exits`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setExits)
      .catch(() => setError('Error al cargar salidas'))
  }, [token])

  return (
    <div className="mt-6 text-white">
      <h2 className="text-xl font-bold mb-4 text-center sm:text-left">
        Historial de Salidas
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 🗓️ Filtros de fecha */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1 text-gray-300">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-300">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="bg-[#1e1e1e] border border-gray-700 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* 📋 Tabla */}
      <div className="overflow-x-auto rounded-lg bg-[#1e1e1e]">
        <table className="w-full text-sm text-white table-auto">
          <thead className="bg-[#333] text-xs uppercase text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Usuario</th>
              <th className="px-4 py-2 text-left">Nota</th>
            </tr>
          </thead>
          <tbody>
            {filteredExits.map((exit) => (
              <tr key={exit._id} className="border-t border-white/10">
                <td className="px-4 py-2">{exit.product?.name || '—'}</td>
                <td className="px-4 py-2">{exit.quantity}</td>
                <td className="px-4 py-2">
                  {new Date(exit.date).toLocaleString('es-MX')}
                </td>
                <td className="px-4 py-2">{exit.user?.name || '—'}</td>
                <td className="px-4 py-2">{exit.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
