import type { ProductDetail } from './types'

interface Props {
  detail: ProductDetail | null
  loading: boolean
  onClose: () => void
}

export default function ProductDetailPanel({ detail, loading, onClose }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {loading ? 'Loading...' : detail?.title ?? ''}
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="w-full h-64 bg-gray-200 rounded-lg" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ) : detail ? (
          <div className="space-y-4">
            <img
              src={detail.images[0] ?? detail.thumbnail}
              alt={detail.title}
              className="w-full rounded-lg"
            />
            <h2 className="text-xl font-bold">{detail.title}</h2>
            <p className="text-gray-600 leading-relaxed">{detail.description}</p>
            <div className="text-2xl font-bold">${detail.price}</div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>Rating: {detail.rating}/5</span>
              {detail.brand && <span>Brand: {detail.brand}</span>}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
