import React from 'react'
import { apiGetTopMerchants } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import RoundedMerchantCard from './RoundedMerchantCard'

interface RoundedMerchantHomeProps {
  companyId: string
  mer_slug_type: string
  mer_slug: string
}

const RoundedMerchantHome = async ({ companyId, mer_slug, mer_slug_type }: RoundedMerchantHomeProps) => {
  const response = await apiGetTopMerchants(companyId)
  const companyDomain = (await cookieService.get("domain")).domain
  const merchants = response?.data?.merchants || []

  return (
    <section className="py-24 bg-white relative">
      {/* Soft background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-indigo-50/30 blur-3xl rounded-full opacity-50 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 mb-12 border-l-4 border-indigo-600 pl-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Cashback <span className="text-indigo-600">Rewards</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">Get paid to shop at your favorite destinations.</p>
          </div>

          <button className="group flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-2xl font-bold transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 active:scale-95">
            View All Merchants
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Elegant Merchant Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {merchants.slice(0, 12).map((merchant: any, index: number) => (
            <RoundedMerchantCard
              key={index}
              merchant={merchant}
              companyDomain={companyDomain}
              merSlug={mer_slug}
              slugType={mer_slug_type}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RoundedMerchantHome