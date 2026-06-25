import type { Product } from './types'

interface Props {
  product: Product
  onClick: (id: number) => void
}

export default function ProductCard({ product, onClick }: Props) {
  return (
    <button
      onClick={() => onClick(product.id)}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow text-left w-full"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{product.title}</h3>
        <p className="text-sm text-gray-600 mt-1">${product.price}</p>
      </div>
    </button>
  )
}
