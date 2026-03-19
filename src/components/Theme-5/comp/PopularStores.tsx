import React from 'react'
import { apiGetTopMerchants } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import { splitHeading } from '@/constants/hooks'
import Link from 'next/link'
import PopularStoresCard from './PopularStoresCard'

interface PopularStoresProps {
  companyId: string;
  slug_type: string;
  mer_slug: string;
}

const PopularStores = async ({ companyId, mer_slug, slug_type }: PopularStoresProps) => {
  const response = (await apiGetTopMerchants(companyId)).data
  const companyDomain = (await cookieService.get("domain")).domain
  const stores = response?.merchants || []
  const featuredStore = stores[0]
  const gridStores = stores.slice(1, 7)
  const secondFeaturedStore = stores[7]
  const remainingStores = stores.slice(8)


  const [first, second] = splitHeading(response?.top_merchants_widget?.widget_heading || "GetTopDiscounts: Verified Coupon Codes & Deals for Thousands of Brands")

  return (
    <section className="py-12 md:py-20 bg-[#fafafa] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-24 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 border-l-4 border-indigo-600 pl-4 md:pl-6">
          <div>
            <div className='flex justify-between items-center'>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight" style={{ width: '70%' }}>
                {first} <span className="text-indigo-600">{second}</span>
              </h2>
              <Link
                href='/all-stores/A'
                className="hidden md:flex w-max group items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all mt-2 whitespace-nowrap">
                View All Stores
                <span className="p-1 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            <p className="text-sm font-medium md:text-lg text-slate-500 mt-2">{response?.top_merchants_widget?.widget_text}</p>
          </div>

        </div>

        {/* Unified Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
          {/* 1. Primary Featured Store (1 card) */}
          <PopularStoresCard store={featuredStore} companyDomain={companyDomain} variant="featured" merSlug={mer_slug} slugType={slug_type} />

          {/* 2. Grid Stores (Limited to 12 cards) */}
          {[...gridStores, ...remainingStores].slice(0, 12).map((store, index) => (
            <PopularStoresCard
              key={index}
              store={store}
              companyDomain={companyDomain}
              variant="grid"
              merSlug={mer_slug}
              slugType={slug_type}
            />
          ))}

          {/* 3. Secondary Featured Store (1 card) */}
          <PopularStoresCard store={secondFeaturedStore} companyDomain={companyDomain} variant="secondary" merSlug={mer_slug} slugType={slug_type} />
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden flex justify-center mt-8">
          <Link
            href='/all-stores/A'
            className="w-max group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap">
            View All Stores
            <span className="p-1 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PopularStores