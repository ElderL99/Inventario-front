'use client'
import ExitForm from '@/components/forms/ExitForm'
import ExitList from '@/components/dashboard/ExitList'

export default function SalidasPage() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar salida</h1>
      <ExitForm />
      <ExitList />
    </div>
  )
}
