import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks'

interface PopularStoresCardProps {
  store: any
  companyDomain: string
  variant?: 'featured' | 'grid' | 'secondary'
  merSlug: string
  slugType: string
}

const PopularStoresCard = ({ store, companyDomain, variant = 'grid', merSlug, slugType }: PopularStoresCardProps) => {
  const type = store?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, store?.product_image, "")
    : getBaseImageUrl(companyDomain, store?.merchant_logo, "")
  const merchantHref = getMerchantHref(store, merSlug, slugType)

  // --- FEATURED VARIANT (Large 2x2 Block) ---
  if (variant === 'featured') {
    return (
      <Link href={merchantHref} className="col-span-2 row-span-2 group relative">
        <div className="h-full bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-24 h-24 md:w-40 md:h-40">
              <Image
                src={getBaseImageUrl(companyDomain, store?.merchant_logo, "")}
                alt={store.merchant_name}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="mt-2 md:mt-4">
            <h3 className="text-lg md:text-2xl font-bold text-slate-900">{store.merchant_name}</h3>
            <p className="text-slate-500 text-xs md:text-sm">Featured Partner</p>
          </div>
        </div>
      </Link>
    )
  }

  // --- SECONDARY VARIANT (Wide or Bold Block) ---
  if (variant === 'secondary') {
    return (
      <Link href={merchantHref} className="col-span-2 bg-indigo-900 rounded-2xl md:rounded-3xl p-4 md:p-8 relative overflow-hidden group min-h-[120px] md:min-h-[160px] flex items-center justify-between">
        <div className="relative z-10 flex flex-col justify-center">
          <h3 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-4 tracking-tight">{store.merchant_name}</h3>
          <button className="w-max px-4 py-2 md:px-6 md:py-2.5 bg-white text-indigo-900 rounded-lg md:rounded-xl font-bold text-xs md:text-sm shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95">
            View Deals
          </button>
        </div>

        {/* High-Contrast Brand Box */}
        <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 bg-white-300 rounded-xl md:rounded-2xl p-2 md:p-4 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out">
          <div className="relative w-full h-full">
            <Image
              src={imageSrc}
              alt={store.merchant_name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    )
  }

  // --- DEFAULT GRID VARIANT (Standard 1x1 Block) ---
  return (
    <Link
      href={merchantHref}
      className="group bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 flex flex-col items-center justify-center text-center col-span-1"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 relative mb-3 md:mb-4 transition-all duration-300">
        <Image
          src={imageSrc}
          alt={store?.merchant_name}
          fill
          className="object-contain"
        />
      </div>
      <h4 className="font-bold text-slate-800 text-xs md:text-sm group-hover:text-indigo-600 transition-colors w-full">
        {store.merchant_name}
      </h4>
    </Link>
  )
}

export default PopularStoresCard