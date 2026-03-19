import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl } from '@/constants/hooks'

interface CategoryPageCardProps {
  category: any
  companyDomain: string
}

const CategoryPageCard = ({ category, companyDomain }: CategoryPageCardProps) => {
  const imageSrc = getBaseImageUrl(companyDomain, category.category_image, "/api/placeholder/400/300")

  return (
    <Link href={`/category/${category.slug}`} className="group">
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <Image
            src={imageSrc}
            alt={category.name}
            fill
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Deal Count Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-xs font-bold text-slate-900">
              {category.deals || '0'} Deals
            </span>
          </div>

          {/* Category Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="text-xl font-black text-white mb-2 leading-tight">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium">Active Now</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-slate-500">
                {category.deals || '0'} available deals
              </p>
            </div>

            {/* Arrow Icon */}
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CategoryPageCard