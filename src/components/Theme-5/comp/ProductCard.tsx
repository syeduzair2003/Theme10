import React from 'react'
import Link from 'next/link'
import { getBaseImageUrl } from '@/constants/hooks'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  image: string
  price: number
  original_price?: number
  discount?: string
  rating?: number
  reviews_count?: number
  merchant: {
    name: string
    logo: string
    slug: string
  }
}

interface Props {
  product: Product
  companyDomain: string
}

const ProductCard: React.FC<Props> = ({ product, companyDomain }) => {
  const type = product.image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, product.image, "")
    : getBaseImageUrl(companyDomain, product.merchant.logo, "")

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
        <div className="relative">
          <div className="h-36 md:h-48 bg-gradient-to-br from-gray-50 to-blue-50">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=${product.name}`
              }}
            />
          </div>
          {product.discount && (
            <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-xs font-semibold">
              {product.discount}
            </div>
          )}
          <div className="absolute top-2 right-2 md:top-3 md:right-3">
            <Image
              src={getBaseImageUrl(companyDomain, product.merchant.logo, "")}
              alt={product.merchant.name}
              fill
              className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white p-1 shadow-md"
            />
          </div>
        </div>

        <div className="p-3 md:p-4">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-2 line-clamp-2">{product.name}</h3>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-base md:text-lg font-bold text-purple-600">${product.price}</span>
              {product.original_price && (
                <span className="text-xs md:text-sm text-gray-500 line-through">${product.original_price}</span>
              )}
            </div>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">by {product.merchant.name}</p>

          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-all duration-200">
            View Product
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard