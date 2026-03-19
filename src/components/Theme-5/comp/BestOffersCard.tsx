'use client';

import React from 'react'
import Image from 'next/image'
import { getBaseImageUrl, discardHTMLTags } from '@/constants/hooks'
import ProductDetailsModal from './ProductDetailsModal'

interface BestOffersCardProps {
  item: any
  companyDomain: string
}

const BestOffersCard = ({ item, companyDomain }: BestOffersCardProps) => {
  const type = item?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, item?.product_image, "")
    : getBaseImageUrl(companyDomain, item.merchant?.merchant_logo, "")
  return (
    <div className="w-[280px] mx-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative z-20">
      <div className="p-4 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center gap-1">
          <Image
            src={imageSrc}
            alt= "null"
            width={64}
            height={64}
            className="w-16 h-16 rounded-xl object-contain bg-slate-50 p-2 shadow-sm"
          />

          <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest truncate w-20">
            {item.merchant?.merchant_name || 'Store'}
          </span>
        </div>
      </div>

      <div className="p-5 h-32 flex flex-col justify-center relative z-30">
        <h3 className="text-md font-bold text-slate-800 leading-tight line-clamp-2 hover:text-indigo-600 transition-colors">
          {discardHTMLTags(item?.offer_title || 'Great Deal')}
        </h3>
        <div className="mt-2 relative z-40">
          <ProductDetailsModal
            product={item}
            merchantName={item?.merchant?.merchant_name || ''}
            merchantLogo={imageSrc}
            domain={companyDomain}
          />
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-dashed border-slate-200">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (item?.url) window.open(item.url, '_blank');
          }}
          className="flex items-center justify-center gap-2 w-full bg-[#0F172A] text-white py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_10px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:bg-[#4F46E5] transform hover:-translate-y-0.5 active:scale-95"
        >
          Get This Deal
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default BestOffersCard