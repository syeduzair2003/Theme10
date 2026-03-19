import React from 'react'
import Image from "next/image";
import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import { OffersOffer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import cookieService from '@/services/CookiesService';

import Link from 'next/link';


interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    type?: string;
    productDetailUrl?: string | null;
}

const OffersCard = async ({ offer, mer_slug_type, mer_slug, type, productDetailUrl }: Props) => {
    const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
    const domain = (await cookieService.get("domain")).domain;
    const product = offer?.offer || offer;

    const imageSrc = type === "product"
        ? getBaseImageUrl(domain, product?.product_image, "")
        : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    const endDate = product?.end_date;
    const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

    return (
        <div className="w-full h-full">
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-6 h-full flex flex-col relative">
                {(type === "product" || finalDiscountTag) && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded-full text-[10px] font-extrabold z-10">
                        {finalDiscountTag}
                    </div>
                )}

                <div className="bg-slate-50 rounded-lg p-6 mb-4 flex items-center justify-center min-h-[150px]">
                    <Image
                        src={imageSrc}
                        alt={product?.offer_title || "Product"}
                        height={150}
                        width={230}
                        className="object-contain max-h-[150px]"
                    />
                </div>

                {daysLeft !== null && daysLeft > 0 && (
                    <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg mb-3 w-fit">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xs font-bold text-slate-700">{daysLeft} days left</span>
                    </div>
                )}

                <div className="mb-2">
                    <span className="text-xs text-slate-500 font-bold">By </span>
                    <Link href={merchantHref} className="text-xs text-slate-700 font-bold hover:text-indigo-600">
                        {getRandomStoreSeoTitle(offer?.merchant?.merchant_name)}
                    </Link>
                </div>

                <div className="flex-grow mb-4">
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link href={productDetailUrl}>
                            <p className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-indigo-600">
                                {discardHTMLTags(product?.offer_title)}
                            </p>
                        </Link>
                    ) : (
                        <p className="text-sm font-bold text-slate-900 line-clamp-2">
                            {discardHTMLTags(product?.offer_title)}
                        </p>
                    )}

                    {type === "product" && (
                        <div className="flex items-center gap-3 mt-3">
                            {offer?.offer?.sale_price && (
                                <span className="text-lg font-bold text-indigo-600">
                                    {getCurrencySymbol(offer?.offer?.currency)}{offer?.offer?.sale_price}
                                </span>
                            )}
                            {offer?.offer?.original_price && (
                                <span className="text-sm text-slate-400 line-through">
                                    {getCurrencySymbol(offer?.offer?.currency)}{offer?.offer?.original_price}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    {product?.coupon_code ? (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="group relative w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center overflow-hidden"
                        >
                            <span className="group-hover:opacity-0 transition-opacity">
                                {(() => {
                                    if (!product?.coupon_code) return "";
                                    const code = product.coupon_code.trim();
                                    const spaceIndex = code.indexOf(" ");
                                    const endIndex = spaceIndex !== -1 ? spaceIndex : 5;
                                    return code.slice(0, endIndex);
                                })()}
                            </span>
                            <span className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs transition-all hover:bg-indigo-700 flex items-center justify-center gap-2 group/btn relative overflow-hidden shadow-md shadow-indigo-100">
                                Show Coupon
                            </span>
                        </OfferOutUrl>
                    ) : (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center"
                        >
                            {type === "product" ? "Buy Now" : "Get Deal"}
                        </OfferOutUrl>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OffersCard
