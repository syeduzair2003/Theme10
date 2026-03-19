import React from 'react'
import { apiGetTopCategories } from '@/apis/page_optimization'
import cookieService from '@/services/CookiesService'
import HomeCategoriesCard from './HomeCategoriesCard'
import { splitHeading } from '@/constants/hooks'

interface HomeCategoriesProps {
  companyId?: string
  slug_type?: string
  cat_slug?: string
}

const HomeCategories = async ({ companyId }: HomeCategoriesProps) => {
  if (!companyId) return null

  const response = await apiGetTopCategories(companyId)
  const cookieData = await cookieService.get("domain")
  const companyDomain = cookieData?.domain

  const [firstHalf, secondHalf] = splitHeading("Discover Deals in Every Category")

  const categories = response?.data?.categories?.slice(0, 8) || []

  if (!categories.length) return null

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Minimalist Header */}
        <div className="mb-12 border-l-4 border-indigo-600 pl-6">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {firstHalf} <span className="text-indigo-600">{secondHalf}</span>
          </h2>
          <p className="mt-3 text-lg text-slate-500 font-medium">Curated deals, organized by what you love.</p>
        </div>

        {/* Pinterest Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {categories.map((category, index) => (
            <HomeCategoriesCard
              key={index}
              category={category}
              companyDomain={companyDomain}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HomeCategories