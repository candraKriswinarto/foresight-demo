import { useEffect, useState } from 'react'
import type { Product, ProductDetail } from './types'
import ProductCard from './ProductCard'
import ProductDetailPanel from './ProductDetailPanel'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<ProductDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(r => r.json())
      .then(data => setProducts(data.products))
  }, [])

  function handleCardClick(id: number) {
    if (id === selectedId) return
    setSelectedId(id)
    setPanelOpen(true)
    setDetailLoading(true)
    setSelectedDetail(null)

    fetch(`https://dummyjson.com/products/${id}?delay=800`)
      .then(r => r.json())
      .then(data => {
        setSelectedDetail(data)
        setDetailLoading(false)
      })
  }

  function handleClose() {
    setPanelOpen(false)
  }

  useEffect(() => {
    if (!panelOpen && selectedId) {
      const timer = setTimeout(() => {
        setSelectedId(null)
        setSelectedDetail(null)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [panelOpen, selectedId])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b z-30">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Product Catalog</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </main>

      {selectedId && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${panelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={handleClose}
          />
          <div
            className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${panelOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <ProductDetailPanel
              detail={selectedDetail}
              loading={detailLoading}
              onClose={handleClose}
            />
          </div>
        </>
      )}
    </div>
  )
}
