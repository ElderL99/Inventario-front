'use client'
import EntryForm from '@/components/forms/EntryForm'
import EntryList from '@/components/dashboard/EntryList'
import { useState } from 'react'

export default function EntradasPage() {
  const [refresh, setRefresh] = useState(false)

  const handleSuccess = () => {
    setRefresh(prev => !prev)
    console.log('Entrada registrada con éxito')
  }

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar entrada</h1>
      <EntryForm onSuccess={handleSuccess} />
      <EntryList key={refresh} />
    </div>
  )
}
