import React from 'react'
import { apiGetMultiProductOffers } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import TrendingProductsCard from './TrendingProductsCard'
import Link from 'next/link'

interface TrendingProductsProps {
  companyId: string
  mer_slug_type?: string
  mer_slug?: string
}

const TrendingProducts = async ({ companyId }: TrendingProductsProps) => {
  const response = await apiGetMultiProductOffers(companyId)
  const companyDomain = (await cookieService.get("domain")).domain
  const firstSection = response?.data?.first
  const secondSection = response?.data?.second
  const offers = [
    ...(firstSection?.offers || []),
    ...(secondSection?.offers || [])
  ]


  if (!offers.length) return null

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="mb-12 border-l-4 border-indigo-600 pl-6">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Trending <span className="text-indigo-600">Products</span>
            </h2>
            <p className="text-lg font-medium text-slate-500 mt-4 leading-relaxed">
              The communitys most-wanted items with verified price drops.
            </p>
          </div>
          <Link href="/all-products" className="hidden md:flex ml-auto w-max group items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap animate-fade-in-up animation-delay-300">
            View Products
            <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.slice(0, 8).map((product: any, index: number) => (
            <TrendingProductsCard
              key={index}
              product={product}
              companyDomain={companyDomain}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingProducts