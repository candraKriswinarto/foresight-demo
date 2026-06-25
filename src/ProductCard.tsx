import { useEffect, useRef } from 'react'
import { ForesightManager } from 'js.foresight'
import type { Product, ProductDetail } from './types'

interface Props {
  product: Product
  onClick: (id: number) => void
  onPrefetched: (id: number, data: ProductDetail) => void
}

export default function ProductCard({ product, onClick, onPrefetched }: Props) {
  // A ref so ForesightJS can observe this specific DOM element
  const cardRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!cardRef.current) return

    // Register this card with ForesightJS.
    // The callback runs when ForesightJS predicts the user
    // is about to interact with this element — before they click.
    const { unregister } = ForesightManager.instance.register({
      element: cardRef.current,
      callback: async () => {
        // This is the same fetch we already use on click,
        // but now it runs ~200-400ms earlier, while the
        // cursor is still moving toward the card.
        const res = await fetch(
          "https://dummyjson.com/products/" + product.id + "?delay=800"
        )
        const data = await res.json()

        // Store the result in the parent cache so the click
        // can use it instantly without fetching again.
        onPrefetched(product.id, data)
      },
    })

    // Always unregister when the component unmounts
    // to avoid memory leaks.
    return () => unregister()
  }, [product.id, onPrefetched])

  return (
    <button
      ref={cardRef}
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
