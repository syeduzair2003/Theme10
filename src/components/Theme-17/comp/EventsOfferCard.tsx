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
    // --- Logic unchanged ---
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
        <div className="flex flex-col h-[440px] w-full bg-[#0f172a]/40 backdrop-blur-md rounded-[24px] border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group overflow-hidden">
            
            {/* ── Compact Image Section ── */}
            <div className="relative h-40 m-2 rounded-[18px] bg-white/[0.02] flex items-center justify-center p-6 overflow-hidden border border-white/5">
                {/* Slim Discount Badge */}
                {finalDiscountTag && (
                    <div className="absolute top-3 right-3 z-20">
                        <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white bg-indigo-600 rounded-md">
                            {finalDiscountTag}
                        </span>
                    </div>
                )}

                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant_name)}
                        className="object-contain"
                        fill
                        sizes="250px"
                        unoptimized
                    />
                </div>
            </div>

            {/* ── Tightened Content Section ── */}
            <div className="flex flex-col flex-1 px-5 pb-5 pt-2">
                {/* Small Merchant Label */}
                <Link
                    href={merchantHref}
                    className="text-[9px] font-bold uppercase tracking-[0.15em] text-indigo-400 mb-1 no-underline hover:text-white transition-colors"
                >
                    {merchant_name}
                </Link>

                {/* Title - Line clamp 2 with smaller text */}
                <div className="h-10 mb-2">
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link
                            href={productDetailUrl}
                            className="text-[15px] font-bold text-slate-100 leading-tight line-clamp-2 no-underline group-hover:text-indigo-400 transition-colors"
                        >
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ) : (
                        <h3 className="text-[15px] font-bold text-slate-100 leading-tight line-clamp-2 m-0">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}
                </div>

                {/* Price & Timer Row - More compact */}
                <div className="flex items-center justify-between mt-auto mb-4">
                    <div className="flex flex-col">
                        {type === 'product' && (salePrice > 0 || originalPrice > 0) ? (
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-lg font-black text-white">
                                    {getCurrencySymbol(product?.currency)}{salePrice}
                                </span>
                                {originalPrice > 0 && (
                                    <span className="text-[10px] text-slate-500 line-through">
                                        {getCurrencySymbol(product?.currency)}{originalPrice}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <span className="text-[9px] font-bold text-indigo-400/80 uppercase tracking-widest bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/10">
                                Verified Deal
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                        <FontAwesomeIcon icon={faCalendarDays} className="text-indigo-500/70" />
                        <span>{calculateOfferDuration(product?.end_date)}</span>
                    </div>
                </div>

                {/* ── Actions - Optimized spacing ── */}
                <div className="space-y-2.5">
                    <div className="flex justify-center border-t border-white/5 pt-2">
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
                            customClass="relative w-full py-2.5 rounded-xl border border-dashed border-indigo-500/40 bg-indigo-500/5 flex items-center justify-center group/btn overflow-hidden transition-all no-underline"
                        >
                            <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">
                                {product?.coupon_code?.trim().split(' ')[0].slice(0, 4)}...
                            </span>
                            <div className="absolute inset-0 bg-indigo-600 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Copy Code</span>
                            </div>
                        </OfferOutUrl>
                    ) : (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all no-underline"
                        >
                            {type === 'product' ? 'Buy Now' : 'Get Deal'}
                            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </OfferOutUrl>
                    )}
                </div>
            </div>
        </div>
    );
};

export const EventsGrid = ({ children, cols = 4 }: { children: React.ReactNode, cols?: number }) => {
    const gridCols = cols === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4';
    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gridCols} gap-6`}>
                {children}
            </div>
        </div>
    );
};

export default EventsOfferCard;