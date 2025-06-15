'use client'
import { useEffect, useState } from 'react'


export default function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProductos = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No hay token')
        return
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Error al obtener productos')

        setProductos(data)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchProductos()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Productos</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {productos.map((p) => (
          <div
            key={p._id}
            className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-white">{p.name}</h2>
            <p className="text-sm text-gray-400">Categoría: {p.category}</p>
            <p className="text-sm text-gray-400">Ubicación: {p.location}</p>
            <p className="text-sm text-gray-300">
              Estado:{' '}
              <span className={
                p.quantity <= 0
                  ? 'text-red-400'
                  : p.quantity <= 200
                    ? 'text-yellow-400'
                    : 'text-green-400'
              }>
                {p.quantity}
              </span>

            </p>

          </div>
        ))}
      </div>
    </div>
  )
}
