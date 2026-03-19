import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl } from '@/constants/hooks'

interface HomeCategoriesCardProps {
  category: any
  companyDomain: string
  index: number
}

const HomeCategoriesCard = ({ category, companyDomain, index }: HomeCategoriesCardProps) => {
  const imageSrc = getBaseImageUrl(companyDomain, category.category_image || '', `/api/placeholder/400/${index % 3 === 0 ? '600' : '400'}`)
  return (
    <div className="break-inside-avoid group relative rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-slate-100 border border-slate-100 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-100/50">
      {/* Image Container with Dynamic Heights */}
      <div className={`relative w-full ${index % 3 === 0 ? 'h-64 md:h-80' : index % 2 === 0 ? 'h-72 md:h-96' : 'h-56 md:h-64'} overflow-hidden`}>

        {/* Real Category Image */}
        <Image
          src={imageSrc}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-contain pt-3 px-3 pb-10 md:pt-4 md:px-8 md:pb-20 lg:px-16 lg:pb-28 transition-all duration-700 group-hover:scale-110"
          height={index % 3 === 0 ? 800 : index % 2 === 0 ? 400 : 400}
          width={index % 3 === 0 ? 400 : index % 2 === 0 ? 400 : 400}
        />

        {/* Dark Overlay for Readability (Gradient from bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      </div>

      {/* Floating Content Card */}
      <div className="absolute bottom-3 inset-x-3 md:bottom-4 md:inset-x-4 bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-xl md:rounded-[2rem] border border-white/50 shadow-xl transition-all duration-500 group-hover:bottom-6">
        <div className="flex justify-between items-center">
          <div className="min-w-0">
            <h3 className="font-black text-slate-800 text-sm md:text-base lg:text-lg leading-none mb-1 ">
              {category.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                Active Now
              </span>
            </div>
          </div>

          {/* Action Icon */}
          <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 transition-all duration-500 group-hover:rotate-12">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Invisible Overlay Link */}
      <Link href={`/category/${category.slug}`} className="absolute inset-0 z-20">
        <span className="sr-only">View {category.name}</span>
      </Link>
    </div>
  )
}

export default HomeCategoriesCard