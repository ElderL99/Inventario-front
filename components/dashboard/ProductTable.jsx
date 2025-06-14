'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import ProductForm from '@/components/forms/ProductForm'
import { Pencil, Trash2 } from 'lucide-react'

export default function ProductTable() {
  const { token, user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [productos, setProductos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [error, setError] = useState('')

  const fetchProducts = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError('Error al cargar productos'))
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    const confirmDelete = confirm('¿Seguro que quieres eliminar este producto?')
    if (!confirmDelete) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) throw new Error()
      fetchProducts()
    } catch (err) {
      setError('Error al eliminar el producto')
    }
  }

  useEffect(() => {
    if (token) fetchProducts()
  }, [token])

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventario</h2>
        {isAdmin && (
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingProduct(null)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {showForm ? 'Cerrar' : '+ Add Item'}
          </button>
        )}
      </div>

      {showForm && isAdmin && (
        <div className="mb-6">
          <ProductForm
            product={editingProduct}
            onSuccess={() => {
              fetchProducts()
              setEditingProduct(null)
              setShowForm(false)
            }}
          />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto rounded-md bg-[#222]">
        <table className="w-full table-auto text-sm text-left text-white">
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
                  {prod.quantity === 0 ? (
                    <span className="text-red-400">Agotado</span>
                  ) : prod.quantity <= 10 ? (
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
