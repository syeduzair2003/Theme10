import React from 'react'
import Image from "next/image";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { Calendar, Tag, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { Offer, ProductData } from '@/services/dataTypes';
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
    product: Offer | ProductData;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const EventOfferCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, productDetailUrl }: Props) => {
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
        <div className="group relative bg-white rounded-[2rem] border border-slate-100 flex flex-col h-full transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 overflow-hidden">
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                {finalDiscountTag && (
                    <div className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-blue-100 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles size={10} fill="white" />
                        {finalDiscountTag}
                    </div>
                )}
                
                {product?.coupon_code && (
                    <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-50">
                        <Tag size={12} />
                    </div>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full p-8 overflow-hidden bg-slate-50/50">
                <div className="relative w-full h-full transform transition-transform duration-700 group-hover:scale-105 ease-out">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant_name)}
                        fill
                        className="object-contain drop-shadow-md"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Brand Info */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                        <Image src={getBaseImageUrl(domain, merchant_logo, "")} alt="brand" width={14} height={14} className="object-contain" />
                    </div>
                    <Link href={merchantHref} className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-wider transition-colors truncate">
                        {merchant_name}
                    </Link>
                </div>

                {/* Title */}
                <div className="mb-3">
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link href={productDetailUrl} className="text-base font-bold text-slate-900 leading-tight hover:text-blue-600 transition-colors line-clamp-2 no-underline block">
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ) : (
                        <p className="text-base font-bold text-slate-900 leading-tight line-clamp-2 m-0">
                            {discardHTMLTags(product?.offer_title)}
                        </p>
                    )}
                </div>

                <OfferDetailsToggle
                    domain={domain}
                    imageSrc={imageSrc}
                    merchantHref={merchantHref}
                    offer={product}
                    type="anchor"
                    buttonClass="text-slate-400 text-xs font-semibold hover:text-blue-500 transition mb-4 block"
                />

                {/* Bottom Row (Price + Date) */}
                <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-50">
                    <div>
                        {type === "product" ? (
                            <div className="flex flex-col">
                                {product?.original_price && (
                                    <span className="text-[11px] text-slate-400 line-through">
                                        {getCurrencySymbol(product?.currency)}{product?.original_price}
                                    </span>
                                )}
                                <span className="text-xl font-black text-slate-900">
                                    {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                </span>
                            </div>
                        ) : (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                ACTIVE DEAL
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                        <Calendar size={12} className="text-slate-300" />
                        {calculateOfferDuration(product?.end_date)}
                    </div>
                </div>

                {/* Button Section */}
                <div className="mt-5">
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass={`no-underline w-full py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-slate-100 border-none ${
                            product?.coupon_code 
                            ? 'bg-slate-900 hover:bg-blue-600 text-white !text-white' 
                            : 'bg-blue-600 hover:bg-slate-900 text-white !text-white'
                        }`}
                    >
                        <span>{product?.coupon_code ? "Copy Code" : (type === "product" ? "Buy Product" : "Get Deal")}</span>
                        {product?.coupon_code ? <ArrowUpRight size={14} /> : <ExternalLink size={14} />}
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
}

export default EventOfferCard;