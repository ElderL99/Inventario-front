'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function EntryForm({ onSuccess }) {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ productId: '', quantity: '', note: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => setError('Error al cargar productos'))
  }, [token])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!form.productId || !form.quantity) {
      return setError('Producto y cantidad son obligatorios')
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/entries`, {
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

      if (!res.ok) throw new Error('Error al registrar entrada')

      setSuccess('✅ Entrada registrada correctamente')
      setForm({ productId: '', quantity: '', note: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#222] p-6 rounded-lg shadow-md space-y-4 text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        <select
          name="productId"
          value={form.productId}
          onChange={handleChange}
          className="bg-[#1e1e1e] p-2 rounded border border-gray-700"
        >
          <option value="">Selecciona un producto</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          name="quantity"
          type="number"
          min="1"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Cantidad"
          className="bg-[#1e1e1e] p-2 rounded border border-gray-700"
        />
      </div>

      <input
        name="note"
        value={form.note}
        onChange={handleChange}
        placeholder="Nota (opcional)"
        className="w-full bg-[#1e1e1e] p-2 rounded border border-gray-700"
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition duration-200"
        >
          Registrar Entrada
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}
    </form>
  )
}
