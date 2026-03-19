import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import { splitHeading } from '@/constants/hooks'
import PopularCouponsCard from './PopularCouponsCard'

interface PopularOffersProps {
  companyId: string
}

const PopularOffers = async ({ companyId }: PopularOffersProps) => {
  const response = (await apiGetPopularOffers(companyId)).data
  const companyDomain = (await cookieService.get("domain")).domain
  const offers = response?.offers || []
  const [first, second] = splitHeading(response?.popular_offer_widget?.widget_heading || "Popular Coupons")

  if (!offers.length) {
    return (
      <section className="py-20 bg-[#FAFAFA]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">No Offers Available</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-l-4 border-indigo-600 pl-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {first} <span className="text-indigo-600">{second}</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              {response?.popular_offer_widget?.widget_text}
            </p>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.slice(0, 6).map((item) => (
            <PopularCouponsCard key={item.id} item={item} companyDomain={companyDomain} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularOffers