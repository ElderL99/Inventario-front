'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function EntryList() {
  const { token } = useAuth()
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setEntries)
      .catch(() => setError('Error al cargar entradas'))
  }, [token])

  return (
    <div className="mt-4 text-white">
      <h2 className="text-lg font-bold mb-2">Historial de Entradas</h2>
      {error && <p className="text-red-500">{error}</p>}

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
          {entries.map((entry) => (
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
