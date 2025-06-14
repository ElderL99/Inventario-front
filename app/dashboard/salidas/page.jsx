'use client'
import { useState } from 'react'
import ExitForm from '@/components/forms/ExitForm'
import ExitList from '@/components/dashboard/ExitList'

export default function SalidasPage() {
  const [refresh, setRefresh] = useState(false)

  const handleSuccess = () => {
    setRefresh(prev => !prev)
    console.log('Salida registrada con éxito')
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar salida</h1>
      <ExitForm onSuccess={handleSuccess} />
      <ExitList key={refresh} />
    </div>
  )
}
