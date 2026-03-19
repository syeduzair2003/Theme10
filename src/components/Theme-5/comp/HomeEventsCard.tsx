import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getBaseImageUrl, getFinalDiscountTag, getMerchantHref, getProductDetailHref, discardHTMLTags, calculateOfferDuration } from '@/constants/hooks'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import ProductDetailsModal from './ProductDetailsModal'

interface HomeEventsCardProps {
  item: any
  companyDomain: string
  index: number
  storeSlug?: string
  slugType?: string
}

const HomeEventsCard = ({ item, companyDomain, index, storeSlug, slugType }: HomeEventsCardProps) => {
  const type = item?.offer?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, item?.offer?.product_image, "")
    : getBaseImageUrl(companyDomain, item?.merchant?.merchant_logo, "")

  const originalPrice = item?.offer?.original_price ? parseFloat(item?.offer?.original_price) : 0;
  const salePrice = item?.offer?.sale_price ? parseFloat(item?.offer?.sale_price) : 0;
  const discountPercent = originalPrice > 0 && salePrice > 0
    ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
    : null;

  const finalDiscountTag = getFinalDiscountTag(
    item?.offer?.offer_title || item?.offer?.offer_detail,
    discountPercent,
  );

  const merchantHref = getMerchantHref(item?.merchant, storeSlug || '', slugType || '')
  const productDetailUrl = item?.offer?.slug
    ? getProductDetailHref(item?.merchant, slugType || '', item?.offer?.slug, item?.offer?.category?.slug)
    : null

  return (
    <div className="group relative h-[400px] md:h-[500px] bg-white rounded-2xl md:rounded-[2.5rem] p-3 md:p-4 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Inner Image Container */}
      <div className="relative aspect-square w-full rounded-xl md:rounded-[2rem] overflow-hidden bg-white">
        <Image
          src={imageSrc}
          alt={(item?.offer?.offer_title || item?.merchant?.merchant_name)}
          fill
          className="w-full h-full object-contain p-4 md:p-6 transition-all duration-700 group-hover:scale-110"
        />
        {finalDiscountTag && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded rounded-full text-[9px] md:text-[10px] font-extrabold shadow-sm z-10">
            {finalDiscountTag}
          </div>
        )}
        <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1 rounded-full shadow-sm z-10">
          <p className="text-[9px] md:text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">
            {item.merchant.merchant_name}
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4 md:mt-6 px-1 md:px-2">
        <h4 className="text-base md:text-lg font-bold text-slate-800 leading-[1.2] tracking-tight line-clamp-2 group-hover/title:text-indigo-600 transition-colors duration-300">
          {discardHTMLTags(item.offer.offer_title)}
        </h4>

        {item?.offer?.end_date && (
          <div className="mt-2 inline-flex items-center gap-1.5 md:gap-2 bg-slate-100 text-slate-900 px-2 py-1 md:px-3 md:py-1.5 rounded-lg">
            <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] md:text-xs font-bold text-slate-900">{calculateOfferDuration(item?.offer?.end_date)}</span>
          </div>
        )}

        <div className="mt-2 ">
          <ProductDetailsModal
            product={item?.offer}
            merchantName={item?.merchant?.merchant_name}
            merchantLogo={getBaseImageUrl(companyDomain, item?.merchant?.merchant_logo, '')}
            domain={companyDomain}
          />
        </div>

        {/* Hidden CTA that slides up on hover */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <OfferOutUrl
            unique_id={item?.offer?.unique_id}
            outUrl={item?.offer?.url}
            merchantHref={merchantHref}
            domain={companyDomain}
            customClass="w-full block text-center py-3 md:py-4 bg-slate-900 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-xl active:scale-95"
          >
            Grab Deal
          </OfferOutUrl>
        </div>
      </div>
    </div>
  )
}

export default HomeEventsCard