'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBaseImageUrl, calculateOfferDuration, getOfferType, discardHTMLTags } from '@/constants/hooks'
import ProductDetailsModal from './ProductDetailsModal'

interface PopularCouponsCardProps {
  item: any
  companyDomain: string
}

const PopularCouponsCard = ({ item, companyDomain }: PopularCouponsCardProps) => {
  const type = item?.product_image ? "product" : "merchant"
  const imageSrc = type === "product"
    ? getBaseImageUrl(companyDomain, item?.product_image, "")
    : getBaseImageUrl(companyDomain, item.merchant?.merchant_logo, "")

  // Normalize data structure
  const offer = item?.offer || item
  const title = offer?.offer_title || item?.offer_title
  const description = offer?.description || item?.description
  const tags = offer?.tags || item?.tags || []
  const offerType = offer?.offer_type?.name || item?.offer_type?.name
  const endDate = offer?.end_date || item?.end_date
  const discount = offer?.discount || item?.discount
  const url = offer?.url || item?.url || '#'

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100/40 transition-all duration-500 flex flex-col overflow-hidden">
      <div className="p-8 flex-grow">
        {/* Brand & Discount Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 p-2.5 flex items-center justify-center border border-slate-100 shadow-inner">
              <Image
                src={imageSrc}
                alt={item.merchant?.merchant_name || 'Brand'}
                width={56}
                height={56}
                className="max-h-full max-w-full object-contain transition-all duration-500"
              />
            </div>
            <div>
              <span className="block text-sm font-bold text-slate-900">
                {item.merchant?.merchant_name || 'Store'}
              </span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                Verified Offer
              </span>
            </div>
          </div>

          {discount && (
            <div className="bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black tracking-wide">
              {discount}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2 min-h-[3.5rem]">
          {discardHTMLTags(title)}
        </h3>

        {/* Description */}
        {/* {description && (
          <p className="text-sm text-slate-600 mb-4">
            {discardHTMLTags(description)}
          </p>
        )} */}

        <div className="mb-4">
          <ProductDetailsModal
            product={offer}
            merchantName={item?.merchant?.merchant_name}
            merchantLogo={imageSrc}
            domain={companyDomain}
          />
        </div>

        {/* Tags */}
        {tags && Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-50">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            {getOfferType(offerType)}
          </div>
          <span>•</span>
          <span>{calculateOfferDuration(endDate)}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-8 pb-8">
        <Link
          href={url}
          className="w-full bg-[#0F172A] text-white py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:bg-[#4F46E5] transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
        >
          View Details
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default PopularCouponsCard