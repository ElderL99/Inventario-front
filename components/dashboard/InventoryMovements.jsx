import EntryList from './EntryList'
import ExitList from './ExitList'

export default function InventoryMovements() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-white">
      <div>
        <h2 className="text-xl font-bold mb-2">📥 Entradas recientes</h2>
        <EntryList />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">📤 Salidas recientes</h2>
        <ExitList />
      </div>
    </div>
  )
}
