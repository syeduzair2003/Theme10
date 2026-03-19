import React from 'react'
import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from '@/apis/page_optimization'
import { getLastUpdateDate } from '@/constants/hooks'
import Link from 'next/link'
import ProductOffers from './ProductOffers'
import CategorySidebarProduct from './CategorySidebarProduct'
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard'
import AllProductsMerchantCard from './AllProductsMerchantCard'
import AllProductsHeroCard from './AllProductsHeroCard'
import { Merchant } from '@/services/dataTypes'
import AllProductsSchema from '@/components/shared/SchemaScripts/AllProductSchema'
import cookieService from '@/services/CookiesService'

interface AllProductsLayoutProps {
  page: string
  companyId: string
  storeSlug: string
  slugType: string
  categoryId?: string
  slug?: string[]
  categoryName?: string
}

const AllProductsLayout = async ({ page, companyId, storeSlug, slugType, categoryId, slug, categoryName }: AllProductsLayoutProps) => {
  const [categories, merchants, suggestedMerchants] = await Promise.all([
    apiGetProductCategories(companyId, categoryId).then(res => res.data),
    apiGetProductCategoryMerchant(companyId, categoryId).then(res => res.data),
    apiGetProductSuggestedMerchant(companyId, categoryId).then(res => res.data),
  ])

  const domain = (await cookieService.get("domain")).domain

  const safeSlug = slug ?? []
  const cleanedSlug = safeSlug?.filter(
    (s, i) => !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page"))
  )

  const paths: { href: string; label: string }[] = cleanedSlug?.map((segment, index) => {
    const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`
    const label = segment.replace(/-/g, " ")
    return { href, label }
  })

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. Dynamic Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-20">
            <div className="lg:w-3/5 space-y-6 md:space-y-8 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.05]">
                {categoryName ? (
                  <>{categoryName} <span className="text-indigo-500">Products</span></>
                ) : (
                  <>All <span className="text-indigo-400">Products</span></>
                )}
              </h1>
              <nav className="inline-flex items-center px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 backdrop-blur-md flex-wrap">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-3 opacity-30">/</span>
                <Link href="/all-products" className="text-indigo-400 hover:text-white">Products</Link>
                {paths?.map((p, i) => (
                  <React.Fragment key={i}>
                    <span className="mx-3 opacity-30">/</span>
                    <span className="capitalize">{p.label}</span>
                  </React.Fragment>
                ))}
              </nav>
            </div>
            <AllProductsHeroCard />
          </div>
        </div>
      </section>

      {/* 2. Trending Merchants */}
      {merchants?.length > 0 && (
        <section className="relative pb-16 z-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-6 md:p-8 lg:p-12 border border-slate-100">
              <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-7 tracking-tight">
                Trending Merchants in <span className='text-indigo-600'>All Products</span>
              </h3>
              <div className="flex overflow-x-auto gap-4 md:gap-6 no-scrollbar pb-4">
                {merchants?.map((merchant: Merchant, i: number) => (
                  <AllProductsMerchantCard
                    key={i}
                    merchant={merchant}
                    domain={domain}
                    slugType={slugType}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Main Catalog Layout */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 py-4 border-slate-200/60">
            <div className="flex items-center gap-3">
              <div className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-600 leading-none">
                All deals in this category are hand-tested. Last verified on: <span className="text-slate-900">{getLastUpdateDate(1)}</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-slate-900 border border-indigo-500/30 px-3 py-1 rounded-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-indigo-100">
                  Live / 24H Remaining
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
            {/* Main Content - Shows first on mobile */}
            <div className="flex-1 order-1 xl:order-2">
              <div className="bg-gray-100 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 border border-slate-200 min-h-[800px]">
                <ProductOffers
                  category_id={categoryId}
                  page={page}
                  company_id={companyId}
                  mer_slug={storeSlug}
                  mer_slug_type={slugType}
                  slug={slug}
                />
              </div>
            </div>

            {/* Sidebar - Shows after main content on mobile */}
            {(categories?.length > 0 || suggestedMerchants?.length > 0) && (
              <div className="w-full xl:w-64 xl:flex-shrink-0 xl:sticky xl:top-24 xl:self-start space-y-6 md:space-y-8 order-2 xl:order-1">
                {/* Categories - order-2 on mobile */}
                {categories?.length > 0 && (
                  <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 shadow-sm">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                      categories <span className="h-px flex-grow bg-slate-100"></span>
                    </h4>
                    <CategorySidebarProduct
                      categories={categories}
                      pageSlug="all-products"
                      categoryName={categoryName}
                    />
                  </div>
                )}

                {/* Related Stores - order-3 on mobile */}
                {suggestedMerchants?.length > 0 && (
                  <div className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg shadow-indigo-100">
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                      Related Stores <span className="h-px flex-grow bg-slate-100"></span>
                    </h4>
                    <div className="space-y-3">
                      {suggestedMerchants?.slice(0, 5).map((merchant: Merchant) => (
                        <SidebarRoundMerchantCard
                          key={merchant.unique_id}
                          merchant={merchant}
                          merSlug={storeSlug}
                          slugType={slugType}
                        />
                      ))}
                    </div>
                    <Link href="/all-stores/A" className="mt-6 flex items-center justify-between group text-slate-600 hover:text-slate-900 transition-colors">
                      <span className="text-xs font-bold">View all stores</span>
                      <div className="p-2 bg-slate-100 rounded-full group-hover:bg-slate-200 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {page !== '1' && (
        <AllProductsSchema
          company_id={companyId}
          categoryName={categoryName}
          category_id={categoryId}
          categoryUrl={cleanedSlug.join('/')}
        />
      )}
    </div>
  );
}
export default AllProductsLayout
