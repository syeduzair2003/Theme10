import React from 'react'
import Link from 'next/link'

interface CategoryData {
  id: number
  name: string
  url: string
  offers_count?: number
}

interface CategorySidebarProductProps {
  categories: CategoryData[]
  pageSlug: string
  categoryName?: string
}

const CategorySidebarProduct = ({ categories, pageSlug, categoryName }: CategorySidebarProductProps) => {
  return (
    <div className="space-y-4">
      {/* <h4 className="text-lg font-bold text-slate-900 mb-6">Categories</h4> */}
      <div className="space-y-2">
        {categories?.map((category) => {
          const cleanedUrl = category.url.replace(/^\/?category\//, "")
          const isActive = categoryName?.toLowerCase() === category.name.toLowerCase()

          return (
            <Link
              key={category.id}
              href={`/${pageSlug}/${cleanedUrl}`}
              className={`flex items-center justify-between p-3 rounded-xl transition-all ${isActive
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
              <span className="capitalize">{category.name}</span>
              {category.offers_count && (
                <span className={`text-xs px-2 py-1 rounded-full ${isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-slate-100 text-slate-500'
                  }`}>
                  {category.offers_count}
                </span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CategorySidebarProduct