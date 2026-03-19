import { Merchant, SearchCategories, SearchResponse } from '@/services/dataTypes'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'

interface Props {
  slug_type: string
  mer_slug: string
  cat_slug: string
  searchData: SearchResponse
  query: string
  domain: string
}

const SearchPage = async ({ slug_type, mer_slug, cat_slug, searchData, query, domain }: Props) => {
  const getHref = (store: Merchant) => `/${mer_slug}/${store[slug_type as keyof Merchant] || store.slug}`
  const getCatHref = (category: SearchCategories) => `/${cat_slug}/${category[slug_type as keyof SearchCategories] || category.slug}`
  const companyDomain = await cookieService.get("domain");

  return (
    <section className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-4 md:p-6 lg:p-8">
      {(searchData?.merchants?.length > 0 || searchData?.categories?.length > 0) ? (
        <>
          {/* Stores Section */}
          {searchData?.merchants?.length > 0 && (
            <div className="mb-12 md:mb-16">
              <h2 className="capitalize text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-8">
                &ldquo;{query}&rdquo; <span className="text-slate-400">in Stores</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchData.merchants.map((merchant: any, i: number) => (
                  <div key={i} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
                    <Link href={getHref(merchant)} className="flex flex-col items-center text-center">
                      <div className="w-full h-16 md:h-20 flex items-center justify-center mb-2 md:mb-3 bg-slate-50 rounded-lg md:rounded-xl p-2">
                        <Image
                          src={getBaseImageUrl(domain, merchant.merchant_logo, "")}
                          alt={merchant.merchant_name}
                          width={100}
                          height={70}
                          className="object-contain max-w-full max-h-full"
                        />
                      </div>
                      <p className="text-xs md:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-1 md:mb-2">
                        {merchant.merchant_name}
                      </p>
                      <span className="text-xs text-indigo-600 font-bold flex items-center gap-1">
                        View Merchant
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {searchData?.categories?.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 md:mb-8">
                &ldquo;{query}&rdquo; <span className="text-slate-400">in Categories</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchData.categories.map((category: any) => (
                  <Link
                    key={category.unique_id}
                    href={category?.url}
                    className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-50 flex items-center justify-center mb-3 md:mb-4">
                      <Image
                        src={getBaseImageUrl(domain, category?.category_image, "")}
                        width={32}
                        height={32}
                        alt={category?.name}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors mb-1 md:mb-2 line-clamp-2">
                      {category?.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-medium">
                      {category?.total_offers || 10} Offers Available
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 md:py-20">
          <div className="text-6xl md:text-8xl mb-4 md:mb-6">🔍</div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">No results found</h3>
          <p className="text-sm md:text-base text-slate-600 mb-6 md:mb-8">Try searching with different keywords or browse our categories.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      )}
    </section>
  )
}

export default SearchPage