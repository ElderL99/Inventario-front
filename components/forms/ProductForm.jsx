'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ProductForm({ onSuccess, product }) {
  const { token } = useAuth()
  const isEdit = !!product

  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    quantity: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (isEdit) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        location: product.location || '',
        quantity: product.quantity || '',
      })
    }
  }, [product])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.name || !form.description || !form.category || !form.location || form.quantity === '') {
      setError('Completa todos los campos obligatorios')
      return
    }

    const body = {
      ...form,
      category: form.category.trim().toLowerCase(),
      quantity: parseInt(form.quantity),
      status: 'disponible',
    }

    const url = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/products`

    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error(isEdit ? 'Error al actualizar producto' : 'Error al crear producto')

      setForm({ name: '', description: '', category: '', location: '', quantity: '' })
      setSuccess(isEdit ? '✅ Producto actualizado correctamente' : '✅ Producto creado correctamente')
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
        required
      />
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Categoría"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
        required
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Ubicación"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
        required
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        min="0"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium"
      >
        {isEdit ? 'Actualizar producto' : 'Agregar producto'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  )
}
