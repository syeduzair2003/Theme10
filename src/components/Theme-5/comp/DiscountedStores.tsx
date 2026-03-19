import React from 'react'
import { apiGetTopCashbackMerchants } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import { getBaseImageUrl, getMerchantHref, splitHeading } from '@/constants/hooks'
import Image from 'next/image'
import Link from 'next/link'

interface RoundedMerchantHomeProps {
  companyId: string
  mer_slug_type: string
  mer_slug: string
}

const DiscountedStoresSection = async ({ companyId, mer_slug, mer_slug_type }: RoundedMerchantHomeProps) => {
  const response = await apiGetTopCashbackMerchants(companyId)
  const companyDomain = (await cookieService.get("domain")).domain
  const merchants = response?.data?.merchants || []
  const heading = response?.data?.cashback_merchants_widget?.widget_heading || "Our Discounted Stores"
  const widgetText = response?.data?.cashback_merchants_widget?.widget_text
  const displayMerchants = merchants.slice(0, 6)

  if (displayMerchants?.length > 0) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-l-4 border-indigo-600 pl-6">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                {splitHeading(heading)[0]} <span className="text-indigo-600">{splitHeading(heading)[1]}</span>
              </h2>
              {widgetText && (
                <p className="text-lg text-slate-500 font-medium">{widgetText}</p>
              )}
            </div>
            <Link
              href="/all-stores/A"
              className="hidden md:flex w-max group items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap">
              View all stores
              <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
            {displayMerchants.map((merchant: any, index: number) => (
              <Link
                key={merchant.unique_id || index}
                href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                className="group relative flex flex-col"
              >
                {/* Discount Badge - Subtle Overlay */}
                {merchant?.discount_tag && (
                  <span className="absolute top-0 left-0 z-10 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded-sm transform -translate-y-1/2">
                    {merchant?.discount_tag}
                  </span>
                )}

                {/* Logo Box */}
                <div className="aspect-square bg-slate-50 rounded-xl flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-slate-100 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 border border-slate-300">
                  <Image
                    src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                    alt={merchant.merchant_name}
                    width={100}
                    height={100}
                    className="object-contain w-full h-full mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Merchant Info */}
                <div className="mt-4 text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Store
                  </p>
                  <p className="text-sm font-medium text-slate-800">
                    {merchant.merchant_name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>
    )
  }

  return null
}

export default DiscountedStoresSection
