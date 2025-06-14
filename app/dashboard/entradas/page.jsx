'use client'
import EntryForm from '@/components/forms/EntryForm'
import EntryList from '@/components/dashboard/EntryList'

export default function EntradasPage() {
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Registrar entrada</h1>
      <EntryForm />
      <EntryList />
    </div>
  )
}
