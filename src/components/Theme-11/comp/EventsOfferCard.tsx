import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  calculateOfferDuration,
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomStoreSeoTitle,
} from '@/constants/hooks';
import { Offer, ProductData } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { faCalendarDays, faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
  product: Offer | ProductData;
  domain: string;
  merchantHref: string;
  merchant_name: string;
  merchant_logo: string;
  productDetailUrl?: string | null;
}

const EventsOfferCard = ({
  product,
  merchantHref,
  domain,
  merchant_name,
  merchant_logo,
  productDetailUrl,
}: Props) => {
  // --- Logic remains identical to preserve functionality ---
  const type = product?.offer_type?.name;
  const imageSrc =
    type === 'product'
      ? getBaseImageUrl(domain, product?.product_image, '')
      : getBaseImageUrl(domain, merchant_logo, '');

  const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
  const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;
  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent
  );

  const isCoupon = !!product?.coupon_code;

  return (
    <div className="flex flex-col h-[480px] w-full bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden">

      {/* ── Fixed Image Section ── */}
      <div className="relative h-48 m-3 mb-0 rounded-2xl bg-gray-50 flex items-center justify-center p-6 overflow-hidden">
        {/* Discount Badge - Floating Style */}
        {finalDiscountTag && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-3 py-1 text-[11px] font-black italic uppercase tracking-tighter text-white bg-[#ff912f] rounded-lg shadow-lg">
              {finalDiscountTag}
            </span>
          </div>
        )}

        <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
          <Image
            src={imageSrc}
            alt={getRandomStoreSeoTitle(merchant_name)}
            className="object-contain"
            fill
            sizes="300px"
            unoptimized
          />
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category/Merchant Label */}
        <Link
          href={merchantHref}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8bc94a] mb-2 no-underline hover:text-[#ff912f] transition-colors"
        >
          {merchant_name}
        </Link>

        {/* Title - Fixed height via line-clamp */}
        <div className="h-12 mb-3">
          {product?.is_detail === 1 && productDetailUrl ? (
            <Link
              href={productDetailUrl}
              className="oswald text-base font-bold text-gray-900 leading-tight line-clamp-2 no-underline group-hover:text-[#ff912f] transition-colors"
            >
              {discardHTMLTags(product?.offer_title)}
            </Link>
          ) : (
            <h3 className="oswald text-base font-bold text-gray-900 leading-tight line-clamp-2 m-0 group-hover:text-[#ff912f] transition-colors">
              {discardHTMLTags(product?.offer_title)}
            </h3>
          )}
        </div>

        {/* Price & Timer Row */}
        <div className="flex items-center justify-between mt-auto mb-5">
          <div className="flex flex-col">
            {type === 'product' && (salePrice > 0 || originalPrice > 0) ? (
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-gray-900">
                  {getCurrencySymbol(product?.currency)}{salePrice}
                </span>
                {originalPrice > 0 && (
                  <span className="text-xs text-gray-400 line-through decoration-[#ff912f]">
                    {getCurrencySymbol(product?.currency)}{originalPrice}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs font-semibold text-[#8bc94a] bg-[#8bc94a10] px-2 py-0.5 rounded-md">Verified Offer</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
            <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3 text-[#ff912f]" />
            <span>{calculateOfferDuration(product?.end_date)}</span>
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className="space-y-3">

          <div className="flex justify-center border-t border-gray-50 pt-2">
            <OfferDetailsToggle
              domain={domain}
              imageSrc={product?.product_image}
              merchantHref={merchantHref}
              offer={product}
              type="anchor"
              merchantImg={merchant_logo}
            />
          </div>
          {isCoupon ? (
            <OfferOutUrl
              unique_id={product?.unique_id}
              outUrl={product?.url}
              merchantHref={merchantHref}
              domain={domain}
              customClass="relative w-full py-3 rounded-xl border-2 border-[#8bc94a] bg-[#8bc94a10] flex items-center justify-center group/btn overflow-hidden transition-all no-underline"
            >
              <span className="text-[12px] font-black text-[#8bc94a] uppercase tracking-widest">
                {product?.coupon_code?.trim().split(' ')[0].slice(0, 4)}...
              </span>
              <div className="absolute inset-0 bg-[#8bc94a] flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                <span className="text-[11px] font-bold text-white uppercase tracking-widest">Copy Code</span>
              </div>
            </OfferOutUrl>
          ) : (
            <OfferOutUrl
              unique_id={product?.unique_id}
              outUrl={product?.url}
              merchantHref={merchantHref}
              domain={domain}
              customClass="w-full py-3 rounded-xl bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.1em] flex items-center justify-center gap-2 hover:bg-[#8bc94a] transition-all no-underline shadow-lg shadow-gray-200 hover:shadow-[#8bc94a20]"
            >
              {type === 'product' ? 'Buy Product' : 'Claim Deal'}
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </OfferOutUrl>
          )}

        </div>
      </div>
    </div>
  );
};

/**
 * ── Container Wrapper ──
 * This mimics the Bootstrap container and grid layout.
 * Use this in your page component.
 */
export const EventsGrid = ({ children, cols = 4 }: { children: React.ReactNode, cols?: number }) => {
  const gridCols = cols === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4';
  
  return (
    <div className="max-w-[1320px] mx-auto px-4 py-4">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gridCols} gap-8`}>
        {children}
      </div>
    </div>
  );
};

export default EventsOfferCard;