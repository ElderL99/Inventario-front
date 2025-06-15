import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

export function exportToExcel(data, fileName = 'productos.xlsx') {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos')

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, fileName)
}

export function exportProductsToExcel(products) {
  if (!products || products.length === 0) {
    alert('No hay productos para exportar')
    return
  }

  const formattedProducts = products.map(product => ({
    ID: product._id,
    Nombre: product.name,
    Categoría: product.category,
    Ubicación: product.location,
    Cantidad: product.quantity,
    Estado:
      product.quantity === 0
        ? 'Agotado'
        : product.quantity <= 200
        ? 'Bajo'
        : 'Disponible',
    Descripción: product.description || '',
  }))

  exportToExcel(formattedProducts, 'productos.xlsx')
}
