'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ExitList() {
  const { token } = useAuth()
  const [exits, setExits] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) return

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exits`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(setExits)
      .catch(() => setError('Error al cargar salidas'))
  }, [token])

  return (
    <div className="mt-4 text-white">
      <h2 className="text-lg font-bold mb-2">Historial de Salidas</h2>
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
          {exits.map((exit) => (
            <tr key={exit._id} className="border-t border-gray-700">
              <td className="p-2">{exit.product?.name || '—'}</td>
              <td className="p-2">{exit.quantity}</td>
              <td className="p-2">{new Date(exit.date).toLocaleDateString()}</td>
              <td className="p-2">{exit.user?.name || '—'}</td>
              <td className="p-2">{exit.note || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
