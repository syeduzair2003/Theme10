'use client'
import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks'

interface CategorySlugMerchantCardProps {
  merchants: CompanyWiseMerchant[]
  storeSlug: string
  slugType: string
  domain: string
}

const CategorySlugMerchantCard = ({ merchants, storeSlug, slugType, domain }: CategorySlugMerchantCardProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors"
      >
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors"
      >
        <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div ref={scrollRef} className="flex overflow-x-auto gap-6 px-12 pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">
        {merchants.map((merchant, index) => {
          const merchantHref = getMerchantHref(merchant, storeSlug, slugType)
          const imageSrc = getBaseImageUrl(domain, merchant.merchant_logo, "/api/placeholder/200/120")

          return (
            <div key={index} className="min-w-[300px] snap-center flex-shrink-0">
              <Link href={merchantHref} className="group block">
                <div className="bg-white rounded-[2rem] border border-slate-300 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden">
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                    <Image
                      src={imageSrc}
                      alt={merchant.merchant_name}
                      fill
                      className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                    {merchant.total_offers && (
                      <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {merchant.total_offers} Offers
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1 truncate">
                          {merchant.merchant_name}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 ml-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors">
                      View Deals
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default CategorySlugMerchantCard