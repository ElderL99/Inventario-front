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
            method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="grid gap-4">
        {productos.map((p) => (
          <li key={p._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">Categoría: {p.category}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
