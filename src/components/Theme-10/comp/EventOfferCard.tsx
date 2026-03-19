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
        <div className="group relative bg-white rounded-[2.5rem] border border-slate-100 flex flex-col h-full transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] hover:-translate-y-2 overflow-hidden">
            
            {/* --- Top Floating Badges --- */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
                {finalDiscountTag && (
                    <div className="bg-[#2563eb] text-white text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-lg shadow-rose-200 uppercase tracking-widest flex items-center gap-1.5 animate-pulse-slow">
                        <Sparkles size={12} fill="white" />
                        {finalDiscountTag}
                    </div>
                )}
                
                {product?.coupon_code && (
                    <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-100">
                        <Tag size={14} />
                    </div>
                )}
            </div>

            {/* --- Image Section with Gradient Background --- */}
            <div className="relative aspect-square w-full p-6 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
                <div className="relative w-full h-full transform transition-all duration-700 group-hover:scale-110 ease-out flex items-center justify-center">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant_name)}
                        fill
                        className="object-contain drop-shadow-xl p-4"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
                
                {/* Decorative Blur Effect on Hover */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 blur-[50px] rounded-full group-hover:bg-blue-400/20 transition-all duration-700" />
            </div>

            {/* --- Content Body --- */}
            <div className="px-6 pb-6 pt-2 flex flex-col flex-grow">
                
                {/* Merchant Brand Info */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                        <Image src={getBaseImageUrl(domain, merchant_logo, "")} alt="logo" width={14} height={14} className="object-contain" />
                    </div>
                    <Link href={merchantHref} className="text-[11px] font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-widest transition-colors">
                        {merchant_name}
                    </Link>
                </div>

                {/* Offer Title */}
                <h5 className="text-[16px] font-bold text-slate-900 leading-[1.4] mb-4 group-hover:text-indigo-700 transition-colors line-clamp-2 min-h-[44px]">
                    {discardHTMLTags(product?.offer_title)}
                </h5>

                {/* Price & Duration Row */}
                <div className="flex items-end justify-between mb-6 mt-auto">
                    <div>
                        {type === "product" && (
                            <div className="flex flex-col">
                                {product?.original_price && (
                                    <span className="text-[12px] text-slate-400 line-through decoration-rose-300">
                                        {getCurrencySymbol(product?.currency)}{product?.original_price}
                                    </span>
                                )}
                                <span className="text-2xl font-black text-slate-900 tracking-tight">
                                    {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                </span>
                            </div>
                        )}
                        {type !== "product" && (
                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                                Verified Deal
                            </div>
                        )}
                    </div>

                    {/* Expiry Badge */}
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-full border border-slate-100">
                            <Calendar size={12} className="text-indigo-500" />
                            {calculateOfferDuration(product?.end_date)}
                        </div>
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="relative group/btn">
    {product?.coupon_code ? (
        <OfferOutUrl
            unique_id={product?.unique_id}
            outUrl={product?.url}
            merchantHref={merchantHref}
            domain={domain}
            // Add !text-white here
            customClass="no-underline w-full bg-slate-900 !text-white py-4 rounded-[1.25rem] font-bold text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200"
        >
            {/* Span par important text white lagaya taake Link ka default color override ho jaye */}
            <span className="!text-white">Copy Code</span>
            <ArrowUpRight size={14} className="!text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </OfferOutUrl>
    ) : (
        <OfferOutUrl
            unique_id={product?.unique_id}
            outUrl={product?.url}
            merchantHref={merchantHref}
            domain={domain}
            customClass="no-underline w-full bg-indigo-600 !text-white py-4 rounded-[1.25rem] font-bold text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-indigo-100"
        >
            <span className="!text-white">{type === "product" ? "Buy Product" : "Get Deal"}</span>
            <ExternalLink size={14} className="!text-white group-hover/btn:scale-110 transition-transform" />
        </OfferOutUrl>
    )}
</div>
            </div>
            
            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    );
}

export default EventOfferCard