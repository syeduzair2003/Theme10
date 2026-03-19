import React from 'react';
import Image from "next/image";
import { 
    calculateOfferDuration, 
    discardHTMLTags, 
    getBaseImageUrl, 
    getCurrencySymbol, 
    getFinalDiscountTag, 
    getRandomStoreSeoTitle 
} from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { faCalendarDays, faArrowRightLong, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    product: Offer;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
}

const OfferCardThree = async ({ product, merchantHref, domain, merchant_name, merchant_logo }: Props) => {
    const type = product?.offer_type?.name;
    const imageSrc = type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const offerTitle = product?.offer_title || discardHTMLTags(product?.offer_detail || 'Amazing Offer Available');
    const offerBadgeText = getFinalDiscountTag(offerTitle, discountPercent) || "LIMITED";
    const expiryDateText = product?.end_date ? calculateOfferDuration(product?.end_date) : null;

    return (
        <div className="group relative mt-10 mb-4">
            {/* --- Floating Image Layer --- */}
            <div className="absolute -top-10 left-6 z-20 w-24 h-24 rounded-3xl bg-white shadow-2xl shadow-indigo-200 border border-slate-50 flex items-center justify-center p-3 group-hover:-translate-y-2 transition-transform duration-500">
                <div className="relative w-full h-full">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant_name)}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* --- Main Content Card --- */}
            <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-6 pt-16 hover:border-indigo-500/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full">
                
                {/* Badge Overlay */}
                <div className="absolute top-6 right-8">
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-indigo-100/50">
                        {offerBadgeText}
                    </span>
                </div>

                <div className="flex flex-col flex-grow">
                    {/* Merchant Name */}
                    <Link href={merchantHref} className="no-underline mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors">
                            {merchant_name}
                        </span>
                    </Link>

                    {/* Offer Title */}
                    <h3 className="text-slate-900 font-extrabold text-xl leading-snug mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                        {offerTitle}
                    </h3>

                    {/* Price Section */}
                    {type === "product" && (
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                {getCurrencySymbol(product?.currency)}{product?.sale_price}
                            </span>
                            <span className="text-sm text-slate-300 line-through font-medium">
                                {getCurrencySymbol(product?.currency)}{product?.original_price}
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="mt-auto pt-6 border-t border-slate-50 space-y-5">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-slate-400">
                            <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                {expiryDateText ? expiryDateText : 'Active'}
                            </span>
                         </div>
                         <OfferDetailsToggle domain={domain} imageSrc={imageSrc} merchantHref={merchantHref} offer={product} type='anchor' />
                    </div>

                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="no-underline w-full group/btn relative h-14 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.2)] active:scale-[0.98]"
                    >
                        {/* Button Animation Layer */}
                        <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-500 group-hover/btn:w-full"></div>
                        
                        <span className="relative z-10 flex items-center gap-3 text-white font-black text-[11px] uppercase tracking-[0.2em]">
                            {product?.coupon_code ? "Show Coupon" : "Get Deal"}
                            <FontAwesomeIcon icon={faArrowRightLong} className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </span>
                    </OfferOutUrl>
                </div>

                {/* Background Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-indigo-50/30 rounded-br-[2.5rem] rounded-tl-[5rem] -z-10 transition-colors group-hover:bg-indigo-100/50"></div>
            </div>
        </div>
    );
};

export default OfferCardThree;