'use client'
import Configuracion from '@/components/dashboard/Configuracion'
import { useAuth } from '@/context/AuthContext'
import { Divide } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ConfiguracionPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user?.role !== 'admin') {
      alert('No tienes permisos para acceder a esta sección')
      router.push('/dashboard')
    }
    
  }, [user])

  return <Configuracion />
}
