import React from 'react'
import Image from "next/image";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { Calendar, Tag, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';

const EventOfferCard = ({ product, merchantHref, domain, merchant_name, merchant_logo }: any) => {
    const type = product?.offer_type?.name;
    const imageSrc = type === "product"
        ? getBaseImageUrl(domain, product?.product_image, "")
        : getBaseImageUrl(domain, merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;
    const finalDiscountTag = getFinalDiscountTag(product?.offer_title || product?.offer_detail, discountPercent);

    return (
        /* --- Compact Wrapper: Reduced padding to p-4 and rounded-xl for a tighter look --- */
        <div className="group relative bg-white rounded-xl border border-[#EADDCA] flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-[#800000]/30 overflow-hidden text-center p-4">
            
            {/* --- Top Badges: Shifted for space --- */}
            <div className="absolute top-2 left-2 right-2 z-20 flex justify-between items-start pointer-events-none">
                {finalDiscountTag && (
                    <div className="bg-[#800000] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        <Sparkles size={10} fill="white" className="inline mr-1" />
                        {finalDiscountTag}
                    </div>
                )}
                
                {product?.coupon_code && (
                    <div className="bg-[#1A1A1A] text-white p-1 rounded shadow-sm">
                        <Tag size={10} />
                    </div>
                )}
            </div>

            {/* --- Image Section: Height reduced to w-24 h-24 to fix card height --- */}
            <div className="relative w-24 h-24 mx-auto mt-4 mb-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <Image
                    src={imageSrc}
                    alt={getRandomStoreSeoTitle(merchant_name)}
                    fill
                    className="object-contain drop-shadow-sm p-1"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* --- Content Body --- */}
            <div className="flex flex-col flex-grow">
                
                {/* Brand Info: Tight margin */}
                <div className="flex flex-col items-center mb-1">
                    <Link href={merchantHref} className="text-[9px] font-bold text-slate-400 hover:text-[#800000] uppercase tracking-widest transition-colors">
                        {merchant_name}
                    </Link>
                </div>

                {/* Offer Title: Font size 13px and min-height adjusted for 2 lines only */}
                <h5 className="text-[13px] font-bold text-[#1A1A1A] leading-tight mb-2 line-clamp-2 min-h-[32px]">
                    {discardHTMLTags(product?.offer_title)}
                </h5>

                {/* Duration/Expiry: Smaller layout */}
                <div className="flex items-center justify-center gap-1 text-[8px] font-bold text-slate-400 mb-3 uppercase">
                    <Calendar size={10} className="text-[#800000]" />
                    {calculateOfferDuration(product?.end_date)}
                </div>

                {/* --- Pricing: Clean and Compact --- */}
                <div className="mt-auto mb-3">
    {type === "product" ? (
        <div className="flex items-center justify-center gap-2">
            {/* Sale Price Check */}
            {product?.sale_price && (
                <span className="text-xl font-black text-[#1A1A1A] tracking-tighter">
                    {getCurrencySymbol(product?.currency)}{product?.sale_price}
                </span>
            )}

            {/* Original Price Check */}
            {product?.original_price && (
                <span className="text-[10px] text-slate-400 line-through decoration-[#800000]/20">
                    {getCurrencySymbol(product?.currency)}{product?.original_price}
                </span>
            )}
        </div>
    ) : (
        <div className="inline-flex items-center justify-center gap-1 text-[#800000] font-bold text-[9px] bg-[#FDFBE7] px-2 py-0.5 rounded border border-[#800000]/10">
            <Sparkles size={9} fill="#800000" />
            VERIFIED
        </div>
    )}
</div>

                {/* --- Action Buttons: Original Logic --- */}
                <div className="relative group/btn w-full">
                    {product?.coupon_code ? (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="no-underline w-full bg-[#1A1A1A] !text-white py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#800000] transition-all duration-300"
                        >
                            <span className="!text-white">Copy Code</span>
                            <ArrowUpRight size={12} className="!text-white" />
                        </OfferOutUrl>
                    ) : (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="no-underline w-full bg-[#800000] !text-white py-2.5 rounded-lg font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-all duration-300 shadow-sm"
                        >
                            <span className="!text-white">{type === "product" ? "Buy Now" : "Get Deal"}</span>
                            <ExternalLink size={12} className="!text-white" />
                        </OfferOutUrl>
                    )}
                </div>

                {/* Footer Tag */}
                <p className="mt-3 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                    Verified {merchant_name} Deals
                </p>
            </div>
            
            {/* Decorative bottom line on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#800000] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
    );
}

export default EventOfferCard;