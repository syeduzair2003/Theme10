import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBaseImageUrl, getFinalDiscountTag, discardHTMLTags } from '@/constants/hooks'
import ProductDetailsModal from './ProductDetailsModal'

interface TrendingProductsCardProps {
  product: any
  companyDomain: string
}  

const TrendingProductsCard = ({ product, companyDomain }: TrendingProductsCardProps) => {
  const type = product.offer?.banner_image || product.offer?.offer_image_url ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, product.offer?.banner_image || product.offer?.offer_image_url || "/placeholder.png", "")
    : getBaseImageUrl(companyDomain, product.merchant?.merchant_logo, "")

  const originalPrice = product.offer?.original_price ? parseFloat(product.offer.original_price) : 0
  const salePrice = product.offer?.sale_price ? parseFloat(product.offer.sale_price) : 0
  const discountPercent = originalPrice > 0 && salePrice > 0
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : null

  const finalDiscountTag = getFinalDiscountTag(
    product.offer?.offer_title || product.offer?.offer_detail,
    discountPercent,
  )
  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100 p-2 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:border-indigo-100">
      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-50">
        <Image
          src={imageSrc}
          alt={product.offer?.offer_title?.toString() || "Product"}
          width={400}
          height={400}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Discount Badge */}
        {finalDiscountTag && (
          <div className="absolute top-4 right-4">
            <span className="bg-indigo-600 top-2 right-2 text-white px-3 py-1 rounded-xl text-xs font-black shadow-lg">
              {finalDiscountTag}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {product.offer?.offer_title}
        </h3>

        <div className="mb-4">
          <ProductDetailsModal
            product={product?.offer}
            merchantName={product?.merchant?.merchant_name}
            merchantLogo={getBaseImageUrl(companyDomain, product?.merchant?.merchant_logo, '')}
            domain={companyDomain}
          />
        </div>

        {/* Action Button */}
        <Link
          href={product.offer?.url || '#'}
          className="w-full bg-[#0F172A] text-white py-3.5 rounded-2xl font-bold transition-all duration-300 shadow-[0_10px_20px_rgba(15,23,42,0.1)] hover:bg-[#4F46E5] hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] transform active:scale-95 text-center block"
        >
          View Deal
        </Link>
      </div>
    </div>
  )
}

export default TrendingProductsCard