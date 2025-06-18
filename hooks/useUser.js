import { Urbanist } from 'next/font/google'
import { useState } from 'react'

export function useUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

 

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (userData) => {
  console.log('📤 Enviando datos al backend:', userData)

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  })

  const data = await res.json()
  console.log('🔁 Respuesta del backend:', data)

  if (!res.ok) {
    throw new Error(data.message || 'Error al crear usuario')
  }

  await fetchUsers()
}


  const updateRole = async (id, role) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    })
    await fetchUsers()
  }

  const deleteUser = async (id) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    await fetchUsers()
  }

  return { users, loading, error, fetchUsers, createUser, updateRole, deleteUser }
}
