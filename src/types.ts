export interface Product {
  id: number
  title: string
  thumbnail: string
  price: number
}

export interface ProductDetail {
  id: number
  title: string
  description: string
  price: number
  rating: number
  brand: string
  thumbnail: string
  images: string[]
}
