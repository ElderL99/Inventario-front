export async function getProductSummary(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error('Error al obtener productos')

  const data = await res.json()

  const total = data.length
  const inStock = data.filter(p => p.quantity >= 201).length
  const lowStock = data.filter(p => p.quantity >= 1 && p.quantity <= 200).length
  const outOfStock = data.filter(p => p.quantity <= 0).length

  return { total, inStock, lowStock, outOfStock }
}
