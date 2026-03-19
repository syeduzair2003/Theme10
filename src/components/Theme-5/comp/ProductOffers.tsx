import React from 'react'
import { apiGetAllProducts } from '@/apis/user'
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { OffersOffer } from '@/services/dataTypes'
import Pagination from './Pagination'
import EventOfferCard from './EventOfferCard'

interface ProductOffersProps {
  page?: string
  company_id: string
  mer_slug: string
  mer_slug_type: string
  category_id?: string
  slug?: string[]
}

const ProductOffers = async ({ page, company_id, mer_slug, mer_slug_type, category_id, slug }: ProductOffersProps) => {
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const offers = (await apiGetAllProducts(company_id, category_id, currentPage.toString(), 30)).data
  const totalPages = offers?.pagination?.last_page || 0
  const domain = (await cookieService.get("domain")).domain

  const cleanedSlug = slug?.length
    ? slug.filter((s, i) => {
      if (s === "page" && !isNaN(Number(slug[i + 1]))) return false
      if (i > 0 && slug[i - 1] === "page" && !isNaN(Number(s))) return false
      return true
    })
    : []

  const baseUrl = cleanedSlug.length
    ? `/all-products/${cleanedSlug.join("/")}`
    : `/all-products`

  return (
    <section className='py-18 bg-[#fafafa] relative overflow-hidden'>
      <div className="space-y-8">
        <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers && offers?.offers?.length > 0 ? (
            offers?.offers?.map((item: OffersOffer, i: number) => (
              <div key={i} className="w-full">
                <EventOfferCard
                  product={item?.offer}
                  merchantHref={getMerchantHref(item.merchant, mer_slug, mer_slug_type)}
                  domain={domain}
                  merchant_name={item.merchant?.merchant_name}
                  merchant_logo={item.merchant?.merchant_logo}
                  productDetailUrl={item?.offer?.slug ? getProductDetailHref(item.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-red-600">No Offers Found</h3>
                <p className="text-slate-500 mt-2">Check back later for new deals</p>
              </div>
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      </div>
    </section>
  )
}

export default ProductOffers