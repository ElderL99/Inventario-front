'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('token')
    if (stored) {
      setToken(stored)
      try {
        const decoded = jwtDecode(stored) 
        setUser(decoded.user)
      } catch (err) {
        console.error('Error decoding token:', err)
        setUser(null)
      }
    }
    setLoading(false)
  }, [])

  const login = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    try {
      const decoded = jwtDecode(newToken)
      setUser(decoded.user)
    } catch (err) {
      console.error('Token inválido', err)
      setUser(null)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
