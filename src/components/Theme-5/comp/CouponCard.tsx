import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import Image from 'next/image';
import React from 'react';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import OfferDuration from './OfferDuration';
import Link from 'next/link';
import ProductDetailsModal from './ProductDetailsModal';

interface Props {
    product: Offer;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
    pageType?: string;
    productDetailUrl?: string | null;
}

const CouponCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, pageType, productDetailUrl }: Props) => {
    const rating = getRandomRating(product?.rating);
    const imageUrl = getBaseImageUrl(domain, merchant_logo, '');
    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;
    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    return (
        /* Parent wrapper should have: w-80 snap-y snap-mandatory overflow-y-auto */
        <div className="group/card bg-white rounded-2xl md:rounded-[2rem] border border-slate-200 shadow-sm p-3 md:p-5 h-full flex flex-col relative hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-500 overflow-hidden">

            {/* Discount Badge - Floating Style */}
            {product?.offer_type?.name === "product" && (discountPercent ?? 0) > 0 && (
                <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-lg shadow-indigo-200 animate-pulse">
                    {finalDiscountTag}
                </div>
            )}

            {/* Header: Logo & Title Stacking */}
            <div className="flex flex-col gap-3 md:gap-5 mb-4 md:mb-6 group/card text-left">
                {/* Image Container: Premium Slate Squircle */}
                <div className="relative w-full h-32 md:h-48 border border-slate-100 rounded-xl md:rounded-[2rem] flex items-center justify-center p-4 md:p-6 bg-slate-50 overflow-hidden transition-all duration-700 group-hover/card:bg-white group-hover/card:border-indigo-100 group-hover/card:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.08)]">
                    {/* Subtle Background Glow on Hover */}
                    <div className="absolute inset-0 bg-indigo-50/0 group-hover/card:bg-indigo-50/30 transition-colors duration-500" />

                    <Image
                        src={(product?.offer_type?.name === "product" && product?.product_image) ? getBaseImageUrl(domain, product?.product_image, '') : imageUrl}
                        alt={merchant_name}
                        className="relative z-10 w-full h-full object-contain mix-blend-multiply group-hover/card:scale-110 transition-transform duration-700"
                        height={120}
                        width={120}
                    />
                </div>

                {/* Content Area: Left-Aligned Editorial Style */}
                <div className="relative pl-3 md:pl-6 min-w-0">
                    <div className="flex flex-col gap-1">
                        {product?.is_detail === 1 && productDetailUrl ? (
                            <Link href={productDetailUrl}>
                                <h4 className="text-slate-900 font-black text-sm md:text-lg leading-[1.1] hover:text-indigo-600 transition-colors line-clamp-2 uppercase tracking-tighter italic">
                                    {discardHTMLTags(product?.offer_title)}
                                </h4>
                            </Link>
                        ) : (
                            <h4 className="text-slate-900 font-black text-sm md:text-lg leading-[1.1] truncate ">
                                {discardHTMLTags(product?.offer_title)}
                            </h4>
                        )}

                        <p className="text-[11px] font-medium text-slate-400 leading-relaxed line-clamp-1 mt-1 uppercase tracking-widest">
                            Authorized by {merchant_name}
                        </p>

                        <div className="mt-2">
                            <ProductDetailsModal
                                product={product}
                                merchantName={merchant_name}
                                merchantLogo={imageUrl}
                                domain={domain}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle: Pricing & Duration - Glass Style */}
            <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-xl md:rounded-2xl p-2 md:p-3 mb-3 md:mb-5 border border-slate-100 transition-colors group-hover/card:border-indigo-100">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {product?.offer_type?.name === "product" && (product?.sale_price || product?.original_price) ? (
                            <>
                                {product?.sale_price && (
                                    <span className="font-black text-indigo-600 text-lg md:text-xl tracking-tight">
                                        {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                    </span>
                                )}
                                {product?.original_price && (
                                    <span className="line-through text-[11px] text-slate-400 -mt-1 font-medium">
                                        {getCurrencySymbol(product?.currency)}{product?.original_price}
                                    </span>
                                )}
                            </>
                        ) : (
                            null
                        )}
                    </div>
                    <OfferDuration endDate={product?.end_date} />
                </div>
            </div>

            {/* Action Area: Button & Rating */}
            <div className="mt-auto space-y-4">
                {product?.coupon_code ? (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs transition-all hover:bg-indigo-700 flex items-center justify-center gap-2 group/btn relative overflow-hidden shadow-md shadow-indigo-100"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                        <span className="uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                            Get Coupon
                        </span>
                    </OfferOutUrl>
                ) : (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3 rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center uppercase tracking-widest group/btn"
                    >
                        <span className="group-hover/btn:scale-110 transition-transform">
                            {product?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                        </span>
                    </OfferOutUrl>
                )}
            </div>

            {/* Footer: Store SEO */}
            {pageType !== 'events' && (
                <div className="mt-5 pt-4 border-t border-dashed border-slate-200 text-center">
                    <Link href={merchantHref}>
                        <p className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-1">
                            <span>Visit</span>
                            <span className="text-slate-900 font-black">{merchant_name}</span>
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CouponCard;