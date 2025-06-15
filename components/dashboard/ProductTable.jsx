'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import ProductForm from '@/components/forms/ProductForm'
import { Pencil, Trash2 } from 'lucide-react'
import { exportProductsToExcel } from '@/utils/exportToExcel'

export default function ProductTable({ onSuccess }) {
  const { token, user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [productos, setProductos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [error, setError] = useState('')

  const fetchProducts = () => {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products/search`)
    if (searchTerm) url.searchParams.append('name', searchTerm)
    if (category) url.searchParams.append('category', category)

    fetch(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        setProductos(data)
        if (onSuccess) onSuccess()
      })
      .catch(() => setError('Error al cargar productos'))
  }

  useEffect(() => {
    if (token) fetchProducts()
  }, [searchTerm, category, token])

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que quieres eliminar este producto?')) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error()
      fetchProducts()
    } catch (err) {
      alert('Error al eliminar el producto')
    }
  }

  return (
    <div className="mt-6 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h2 className="text-xl font-bold">Inventario</h2>

        <div className="flex flex-wrap gap-2">
          {isAdmin && (
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingProduct(null)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              {showForm ? 'Cerrar' : '+ Agregar Producto'}
            </button>
          )}

          {productos.length > 0 && (
            <button
              onClick={() => exportProductsToExcel(productos)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Exportar a Excel
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre"
          className="bg-[#1e1e1e] p-2 rounded border border-gray-700 text-sm text-white w-full sm:w-auto"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Categoría"
          className="bg-[#1e1e1e] p-2 rounded border border-gray-700 text-sm text-white w-full sm:w-auto"
        />
      </div>

      {showForm && isAdmin && (
        <div className="mb-6">
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              setEditingProduct(null)
              setShowForm(false)
              fetchProducts()
              if (onSuccess) onSuccess()
            }}
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-md bg-[#222]">
        <table className="w-full text-sm text-left text-white table-auto">
          <thead className="bg-[#333] uppercase text-xs text-gray-400">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Ubicación</th>
              <th className="px-4 py-3">Cantidad</th>
              <th className="px-4 py-3">Estado</th>
              {isAdmin && <th className="px-4 py-3">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod._id} className="border-t border-white/10">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2">{prod.location}</td>
                <td className="px-4 py-2">{prod.quantity}</td>
                <td className="px-4 py-2">
                  {prod.quantity <= 0 ? (
                    <span className="text-red-400">Agotado</span>
                  ) : prod.quantity <= 200 ? (
                    <span className="text-yellow-400">Bajo</span>
                  ) : (
                    <span className="text-green-400">Disponible</span>
                  )}
                </td>
                {isAdmin && (
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => handleEdit(prod)} className="text-blue-400 hover:text-blue-200">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(prod._id)} className="text-red-400 hover:text-red-200">
                      <Trash2 size={18} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
