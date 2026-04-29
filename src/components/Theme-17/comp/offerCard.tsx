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
import SocialMediaShare from './SocialMediaShare';
import OfferDetailsToggle from './OfferDetailsToggle';
import { faArrowRight, faCheck, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    type?: string;
    productDetailUrl?: string | null;
}

const OfferCard = async ({ offer, mer_slug_type, mer_slug, type, productDetailUrl }: Props) => {
    const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
    const domain = (await cookieService.get("domain")).domain;
    const product = offer?.offer || offer;
    const isProduct = type === "product" || product?.offer_type?.name?.toLowerCase() === "product";

    const imageSrc =
        (isProduct && product?.product_image)
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");

    const rating = getRandomRating(offer?.offer?.rating);

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
        <div className="group relative flex flex-col bg-white rounded-[2rem] p-4 border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_rgba(139,201,74,0.15)] transition-all duration-500 h-full overflow-hidden">
            {/* ── Top Header: Discount & Verified ── */}
            <div className="flex items-center justify-between mb-3">
                {finalDiscountTag ? (
                    <div className="bg-[#ff912f20] text-[#ff912f] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {finalDiscountTag}
                    </div>
                ) : (
                    <div className="bg-[#8bc94a20] text-[#8bc94a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                        <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />
                        Verified
                    </div>
                )}

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <SocialMediaShare
                        offerUrl={`/${product?.url}`}
                        offerTitle={product?.offer_title}
                        merchantHref={merchantHref}
                        unique_id={product?.unique_id}
                        domain={domain}
                    />
                </div>
            </div>

            {/* ── Image Container ── */}
            <div className="relative aspect-[16/10] w-full mb-4 bg-gray-50 rounded-[1.5rem] overflow-hidden flex items-center justify-center p-6 group-hover:bg-white transition-colors duration-500">
                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(offer?.merchant?.merchant_name)}
                        className="object-contain"
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                    />
                </div>
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-grow text-center">
                <Link href={merchantHref} className="no-underline">
                    <span className="text-[10px] font-bold text-gray-400 capitalize tracking-wider mb-1 block group-hover:text-[#ff912f] transition-colors">
                        {offer?.merchant?.merchant_name}
                    </span>
                </Link>

                <div className="h-10 mb-2">
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link href={productDetailUrl} className="no-underline">
                            <h3 className="text-[14px] font-extrabold text-gray-900 leading-tight line-clamp-2 m-0 group-hover:text-[#ff912f] transition-colors">
                                {discardHTMLTags(product?.offer_title)}
                            </h3>
                        </Link>
                    ) : (
                        <h3 className="text-[14px] font-extrabold text-gray-900 leading-tight line-clamp-2 m-0 group-hover:text-[#ff912f] transition-colors">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-3">
                    <RenderRating rating={rating} />
                    <span className="text-[10px] text-gray-400 font-bold">({rating})</span>
                </div>

                {/* Price Info for Products */}
                {(isProduct || salePrice > 0 || originalPrice > 0) && (salePrice > 0 || originalPrice > 0) && (
                    <div className="flex items-center justify-center gap-3 mb-4">
                        {salePrice > 0 && (
                            <span className="text-lg font-black text-[#8bc94a]">
                                {getCurrencySymbol(product?.currency)}{salePrice}
                            </span>
                        )}
                        {originalPrice > 0 && (
                            <span className="text-xs text-gray-400 line-through">
                                {getCurrencySymbol(product?.currency)}{originalPrice}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* ── Footer Actions ── */}
            <div className="mt-auto space-y-2 pt-2">
                <div className="flex justify-center border-t border-gray-50 pt-2">
                    <OfferDetailsToggle
                        domain={domain}
                        imageSrc={product?.product_image}
                        merchantHref={merchantHref}
                        offer={product}
                        type='anchor'
                        merchantImg={offer?.merchant?.merchant_logo}
                    />
                </div>

                {isCoupon ? (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="relative w-full py-3 rounded-xl bg-gray-900 flex items-center justify-center overflow-hidden group/btn no-underline transition-all duration-300 hover:shadow-lg hover:shadow-gray-200"
                    >
                        <span className="text-[11px] font-black text-white uppercase tracking-widest transition-transform duration-300 group-hover/btn:-translate-y-12">
                            Show Coupon
                        </span>
                        <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-12 group-hover/btn:translate-y-0 transition-transform duration-300 bg-[#ff912f]">
                            <span className="text-[11px] font-black text-white uppercase tracking-widest">
                                {product?.coupon_code?.trim().split(' ')[0].slice(0, 8)}
                            </span>
                            <span className="text-[8px] font-bold text-white/80 uppercase">Click to Copy</span>
                        </div>
                    </OfferOutUrl>
                ) : (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="w-full py-3 rounded-xl bg-[#8bc94a] text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#ff912f] transition-all duration-300 no-underline shadow-lg shadow-[#8bc94a20] hover:shadow-[#ff912f20]"
                    >
                        {isProduct ? "Buy Now" : "Get Deal"}
                        <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </OfferOutUrl>
                )}
            </div>

            {/* Subtle Gradient Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#8bc94a40] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
    );
}

export default OfferCard;
