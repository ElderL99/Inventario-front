'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ExitForm({ onSuccess }) {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ productId: '', quantity: '', note: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        const disponibles = data.filter(p => p.quantity > 0)
        setProducts(disponibles)
      })

      .catch(() => setError('Error al cargar productos'))
  }, [token])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.productId || !form.quantity) {
      return setError('Producto y cantidad son obligatorios')
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: form.productId,
          quantity: parseInt(form.quantity),
          note: form.note,
        }),
      })

      if (!res.ok) throw new Error('Error al registrar salida')

      setSuccess('✅ Salida registrada correctamente')
      setForm({ productId: '', quantity: '', note: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <select
        name="productId"
        value={form.productId}
        onChange={handleChange}
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
      >
        <option value="">Selecciona un producto</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <input
        name="quantity"
        type="number"
        min="1"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Cantidad"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
      />

      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Nota (opcional)"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
      />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-medium"
      >
        Registrar salida
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  )
}