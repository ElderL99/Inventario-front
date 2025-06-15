import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportToPDF(data = [], title = 'Reporte', fileName = 'reporte.pdf') {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text(title, 14, 22)

  const headers = Object.keys(data[0] || {}).map((key) => key.toUpperCase())
  const rows = data.map(item => headers.map(h => item[h.toLowerCase()] || ''))

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 30,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [40, 40, 40] }
  })

  doc.save(fileName)
}
