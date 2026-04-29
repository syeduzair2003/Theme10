import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {
    discardHTMLTags,
    getBaseImageUrl,
    getCurrencySymbol,
    getFinalDiscountTag,
    getMerchantHref,
    getRandomRating,
    getRandomStoreSeoTitle
} from '@/constants/hooks';
import RenderRating from '@/components/Theme-11/comp/RenderRating';
import { OffersOffer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import cookieService from '@/services/CookiesService';
import OfferDuration from '@/components/Theme-11/comp/OfferDuration';
import { faArrowRight, faCheck, FontAwesomeIcon, faBolt } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    domain: string;
    productDetailUrl?: string | null;
}

const CouponCard = ({ offer, mer_slug_type, mer_slug, domain, productDetailUrl }: Props) => {
    const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
    const product = offer?.offer || offer;
    const merchant = offer?.merchant;

    const imageSrc = product?.product_image
        ? getBaseImageUrl(domain, product?.product_image, "")
        : getBaseImageUrl(domain, merchant?.merchant_logo, "");

    const rating = getRandomRating(product?.rating);

    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    const isCoupon = !!product?.coupon_code;

    return (
        <div className="group relative flex flex-col md:flex-row items-center bg-white rounded-[2rem] p-3 md:p-5 border border-gray-100 shadow-sm hover:shadow-[0_20px_60px_rgba(139,201,74,0.2)] transition-all duration-500 overflow-hidden w-full">

            {/* ── Visual Accent: Dashed Divider for Desktop ── */}
            <div className="hidden md:block absolute right-[28%] top-0 bottom-0 w-px border-r border-dashed border-gray-200 py-4" />

            {/* ── Image & Badge Sector ── */}
            <div className="relative w-full md:w-[180px] h-[120px] md:h-[140px] flex-shrink-0 bg-gray-50 rounded-2xl overflow-hidden p-4 group-hover:bg-white transition-colors duration-500">
                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
                        className="object-contain"
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                </div>

                {/* Dynamic Badge */}
                {finalDiscountTag && (
                    <div className="absolute top-2 left-2 bg-[#ff912f] text-white px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-[#ff912f40]">
                        <FontAwesomeIcon icon={faBolt} className="w-2 h-2" />
                        {finalDiscountTag}
                    </div>
                )}
            </div>

            {/* ── Content Sector ── */}
            <div className="flex flex-col flex-1 px-0 md:px-8 mt-4 md:mt-0 text-center md:text-left min-w-0">
                {/* Info Bar */}
                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                        <span className="w-1 h-1 rounded-full bg-[#8bc94a]" />
                        {merchant?.merchant_name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8bc94a] bg-[#8bc94a10] px-2 py-0.5 rounded-full">
                        <FontAwesomeIcon icon={faCheck} className="w-2 h-2" />
                        Verified Offer
                    </div>
                </div>

                {/* Title */}
                <div className="mb-2">
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link href={productDetailUrl} className="no-underline">
                            <h3 className="text-[15px] md:text-[17px] font-extrabold text-gray-900 leading-tight line-clamp-2 m-0 group-hover:text-[#8bc94a] transition-colors">
                                {discardHTMLTags(product?.offer_title)}
                            </h3>
                        </Link>
                    ) : (
                        <h3 className="text-[15px] md:text-[17px] font-extrabold text-gray-900 leading-tight line-clamp-2 m-0 group-hover:text-[#8bc94a] transition-colors">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}
                </div>

                {/* Meta Row: Rating & Expiry */}
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mt-auto">
                    <div className="flex items-center gap-1.5">
                       <OfferDetailsToggle
                        domain={domain}
                        imageSrc={product?.product_image}
                        merchantHref={merchantHref}
                        offer={product}
                        type='anchor'
                        merchantImg={offer?.merchant?.merchant_logo}
                    />
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-200" />
                </div>
            </div>

            {/* ── Action Sector ── */}
            <div className="w-full md:w-[25%] flex flex-col items-center justify-center pt-5 md:pt-0 mt-5 md:mt-0 border-t border-gray-50 md:border-t-0 space-y-3">

                {/* Price Display */}
                {(salePrice > 0 || originalPrice > 0) ? (
                    <div className="flex flex-col items-center">
                        {salePrice > 0 && (
                            <span className="text-xl font-black text-gray-900">
                                {getCurrencySymbol(product?.currency)}{salePrice}
                            </span>
                        )}
                        {originalPrice > 0 && (
                            <span className="text-xs text-gray-400 line-through font-bold">
                                {getCurrencySymbol(product?.currency)}{originalPrice}
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <span className="text-[11px] font-black text-[#ff912f] uppercase tracking-widest bg-[#ff912f10] px-3 py-1 rounded-full">
                            Limited Time
                        </span>
                    </div>
                )}

                {/* Main CTA */}
                {isCoupon ? (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="relative w-full max-w-[200px] py-3.5 rounded-2xl bg-gray-900 flex items-center justify-center overflow-hidden group/btn no-underline transition-all duration-300 hover:shadow-xl hover:shadow-gray-200"
                    >
                        <span className="text-[11px] font-extrabold text-white uppercase tracking-[0.15em] transition-transform duration-300 group-hover/btn:-translate-y-12">
                            Show Coupon
                        </span>
                        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-12 group-hover/btn:translate-y-0 transition-transform duration-300 bg-[#ff912f]">
                            <span className="text-[12px] font-black text-white uppercase tracking-widest mb-0.5">
                                {product?.coupon_code?.trim().split(' ')[0].slice(0, 10)}
                            </span>
                            <span className="text-[8px] font-bold text-white/90 uppercase tracking-widest">Click to Copy</span>
                        </div>
                    </OfferOutUrl>
                ) : (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="w-full max-w-[200px] py-3.5 rounded-2xl bg-[#8bc94a] text-white text-[11px] font-extrabold uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-[#ff912f] transition-all duration-300 no-underline shadow-lg shadow-[#8bc94a30] hover:shadow-[#ff912f30]"
                    >
                        Get Deal
                        <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </OfferOutUrl>
                )}


            </div>

            {/* Hover Decor */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8bc94a08] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#ff912f08] transition-colors duration-1000" />
        </div>
    );
}

export default CouponCard;
