'use client'

import { Box, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

export default function DashboardSummary({ totals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        icon={<Box size={20} className="text-blue-400" />}
        label="Total Productos"
        value={totals.total}
      />
      <SummaryCard
        icon={<CheckCircle size={20} className="text-green-400" />}
        label="En Stock"
        value={totals.inStock}
      />
      <SummaryCard
        icon={<AlertTriangle size={20} className="text-yellow-400" />}
        label="Bajo Stock"
        value={totals.lowStock}
      />
      <SummaryCard
        icon={<XCircle size={20} className="text-red-400" />}
        label="Agotados"
        value={totals.outOfStock}
      />
    </div>
  )
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-[#222] rounded-xl p-4 flex items-center gap-4 shadow hover:shadow-lg transition-all">
      <div className="bg-[#333] p-3 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  )
}
