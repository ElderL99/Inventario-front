'use client'

import { Box, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

export default function DashboardSummary({ totals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryCard
        icon={<Box size={20} />}
        label="Total Products"
        value={totals.total}
      />
      <SummaryCard
        icon={<CheckCircle size={20} className="text-green-400" />}
        label="In Stock"
        value={totals.inStock}
      />
      <SummaryCard
        icon={<AlertTriangle size={20} className="text-yellow-400" />}
        label="Low Stock"
        value={totals.lowStock}
      />
      <SummaryCard
        icon={<XCircle size={20} className="text-red-400" />}
        label="Out of Stock"
        value={totals.outOfStock}
      />
    </div>
  )
}

function SummaryCard({ icon, label, value }) {
  return (
    <div className="bg-[#222] rounded-xl p-4 flex items-center gap-4 shadow">
      <div className="bg-[#333] p-2 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
