'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function useProducts({ name = '', category = '' } = {}) {
  const { token } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return

    const fetchProducts = async () => {
      try {
        setLoading(true)
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products/search`)
        if (name) url.searchParams.append('name', name)
        if (category) url.searchParams.append('category', category)

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error('Error al cargar productos')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [token, name, category])

  return { products, loading, error }
}
