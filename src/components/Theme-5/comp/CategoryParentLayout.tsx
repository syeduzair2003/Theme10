import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import CategorySlugMerchantCard from './CategorySlugMerchantCard'
import { apiCategoryWithSub } from '@/apis/user'
import Link from 'next/link'
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, splitHeading } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import VerticalCategoryOfferBanner from './VerticalCategoryOfferBanner'

interface CategorySlugLayoutProps {
  categoryId: string
  categoryName: string
  merchants: any
  categories: any[]
  companyId: string
  storeSlug: string
  slugType: string
}

const CategorySlugLayout = async ({
  categoryId,
  categoryName,
  merchants,
  categories,
  companyId,
  storeSlug,
  slugType
}: CategorySlugLayoutProps) => {
  const categoryData = (await apiCategoryWithSub(companyId)).data;
  const [first, second] = splitHeading(categoryName)
  const domain = (await cookieService.get("domain")).domain;
  // Sort parent categories by name
  categoryData?.sort((a, b) =>
    a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
  );
  return (
    <div className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        {/* Trending Merchants Section */}
        <div className="mb-16">
          <div className="mb-12 border-l-4 border-indigo-600 pl-4 md:pl-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Trending Merchants in <span className="text-indigo-600">{categoryName}</span>
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-slate-500 font-medium">
              Discover the best deals from top merchants in this category
            </p>
          </div>

          {merchants?.merchants?.length > 0 ? (
            <CategorySlugMerchantCard
              merchants={merchants.merchants}
              storeSlug={storeSlug}
              slugType={slugType}
              domain={domain}
            />
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">No Merchants Found</h3>
              <p className="text-slate-500">Check back later for new merchants in this category</p>
            </div>
          )}
        </div>

        {/* Related Deals Section - Merchant Related Deals */}
        <div className="mb-20">
          {/* Header: Minimalist & Clean */}
          <div className="mb-10 mx-0 md:mx-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Related <span className="text-indigo-600">Deals</span>
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Hand-picked savings from verified merchants
              </p>
            </div>
            <div className="h-px flex-grow bg-slate-200 hidden md:block mx-8"></div>
            {/* <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
      View All Merchants →
    </button> */}
          </div>

          {merchants?.merchants?.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8 px-0 md:px-4">
              {/* Related Deals - Left Side */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {merchants.merchants.slice(0, 3).map((merchant: CompanyWiseMerchant, i: number) => (
                    <div
                      key={i}
                      className="group relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 ease-out overflow-hidden"
                    >
                      {/* Top Section */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500 overflow-hidden relative">
                          {merchant.merchant_logo ? (
                            <Image
                              src={getBaseImageUrl(domain, merchant.merchant_logo, '')}
                              alt={merchant.merchant_name}
                              width={100}
                              height={100}
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <span className="text-xl font-bold text-indigo-600">
                              {merchant.merchant_name?.charAt(0)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-100">
                            {Math.floor(Math.random() * 40) + 20}% AVG SAVINGS
                          </span>
                        </div>
                      </div>

                      {/* Title & Info */}
                      <div className="mb-6 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
                            {merchant.merchant_name}
                          </h3>
                        </div>

                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-500 leading-relaxed mb-8 line-clamp-2">
                        Unlock exclusive hardware discounts and verified promo codes for {merchant.merchant_name}.
                      </p>

                      {/* Action Button */}
                      <Link
                        href={getMerchantHref(merchant, storeSlug, slugType)}
                        className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/20 active:scale-[0.98]"
                      >
                        Get Coupons
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Banner Section - Right Side */}
              <div className="hidden lg:block item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth my-2">
                <VerticalCategoryOfferBanner
                  bannerResponse={merchants.offers}
                  domain={domain}
                  mer_slug={storeSlug}
                  slug_type={slugType}
                  categoryId={categoryId}
                  companyId={companyId}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CategorySlugLayout