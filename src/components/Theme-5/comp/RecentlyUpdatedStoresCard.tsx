import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks'

interface RecentlyUpdatedStoresCardProps {
  store: any
  companyDomain: string
  merSlug: string
  slugType: string
}

const RecentlyUpdatedStoresCard = ({ store, companyDomain, merSlug, slugType }: RecentlyUpdatedStoresCardProps) => {
  const type = store?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, store?.product_image, "")
    : getBaseImageUrl(companyDomain, store.merchant_logo, "")
  const merchantHref = getMerchantHref(store, merSlug, slugType)

  return (
    <>
      <Link href={merchantHref} className="group relative block">
  <div className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 overflow-hidden">
    
    {/* Reduced height from h-40 to h-28 and padding from p-6 to p-4 */}
    <div className="relative h-28 bg-slate-50 flex items-center justify-center p-4 group-hover:bg-indigo-50 transition-colors">
      {/* Scaled down the logo container slightly to fit the smaller height */}
      <div className="relative w-20 h-20">
        <Image
          src={imageSrc}
          alt={store.merchant_name}
          fill
          className="object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div> 
    </div>

    {/* Reduced padding from p-4 to p-3 */}
    <div className="p-3">
      <h3 className="text-sm font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
        {store.merchant_name}
      </h3>

      <div className="flex items-center justify-between">
        {store.cashback_rate ? (
          <div className="bg-indigo-50 text-indigo-600 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md">
            {store.cashback_rate}
          </div>
        ) : (
          <span className="text-[10px] text-slate-500 font-medium">New Deals</span>
        )}

        {/* Updated Arrow: Starts slightly hidden/shifted and slides in on hover */}
        <svg 
          className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-indigo-600 transition-all duration-300 ease-out" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</Link>
    </>
  )
}

export default RecentlyUpdatedStoresCard