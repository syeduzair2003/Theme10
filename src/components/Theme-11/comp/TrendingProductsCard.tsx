import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import {
    calculateOfferDuration,
    discardHTMLTags,
    extractPromoDiscountTag,
    getBaseImageUrl,
} from '@/constants/hooks';
import { OffersOffer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { cookies } from 'next/headers';
import OfferDetailsToggle from './OfferDetailsToggle';
import { faFire, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';

interface Props {
    item: OffersOffer;
    merchantHref: string;
    merchant_logo?: string;
    productDetailUrl?: string | null;
}

const TrendingProductsCard = async ({ item, merchantHref, merchant_logo, productDetailUrl }: Props) => {
    // Note: Assuming this component is server-side since it uses cookies(). If client-side, we should map from parent.
    // Actually, this is rendered inside TrendingMerchants which is server side, but then sliced and mapped.
    const companyDomain = await cookieService.get("domain");

    const product = item?.offer;
    const type = item?.offer?.offer_type?.name; // usually "product" or "coupon"

    const imageSrc = type === "product"
        ? getBaseImageUrl(companyDomain.domain, product?.product_image, "")
        : getBaseImageUrl(companyDomain.domain, merchant_logo || "", "");

    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag =
        extractPromoDiscountTag(product?.offer_title || product?.offer_detail) ||
        (discountPercent ? `${discountPercent}% Off` : null);

    return (
        <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full h-full border border-gray-100 flex-grow">
            {/* Top Image Section */}
            <div className="relative w-full h-[150px] sm:h-[160px] md:h-[180px] bg-gray-50 flex-shrink-0">
                {/* Time Left Ribbon */}
                <div className="absolute top-0 left-0 bg-[#8bc94a] text-white text-[9px] sm:text-[10px] font-bold px-2 sm:px-3 py-1 rounded-br-lg z-10 shadow-sm">
                    {calculateOfferDuration(product?.end_date)}
                </div>
                
                {/* Sale Badge */}
                {finalDiscountTag && (
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#ff912f] text-white text-[10px] sm:text-xs font-bold px-2 py-1 sm:py-1.5 rounded-full z-10 shadow-md flex items-center gap-1">
                        <FontAwesomeIcon icon={faFire} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        {finalDiscountTag}
                    </div>
                )}

                <Image
                    src={imageSrc}
                    alt={product?.offer_title || "Offer"}
                    fill
                    className="object-contain p-3 sm:p-4 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 480px) 80vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 20vw"
                />

                {/* Overlapping Merchant Logo */}
                {merchant_logo && (
                    <div className="absolute -bottom-3 right-2 sm:-bottom-4 sm:right-3 w-[32px] h-[32px] sm:w-[40px] sm:h-[40px] bg-white rounded-full p-1 shadow-sm border border-gray-100 z-10">
                        <div className="relative w-full h-full">
                            <Image
                                src={getBaseImageUrl(companyDomain.domain, merchant_logo, "")}
                                alt="logo"
                                fill
                                className="object-contain rounded-full"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Content Section */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow relative bg-white z-10">
                <div className="flex-grow">
                    {product?.is_detail === 1 && productDetailUrl ? (
                         <Link href={productDetailUrl} className="text-decoration-none group-hover:text-[#8bc94a] transition-colors">
                            <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5 min-h-[2.5rem]">
                                {discardHTMLTags(product?.offer_title)}
                            </h3>
                        </Link>
                    ) : (
                        <h3 className="text-[13px] sm:text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 mb-1.5 min-h-[2.5rem]">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}
                    
                    {/* Prices */}
                    <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
                         {salePrice > 0 && (
                            <span className="text-sm sm:text-base font-bold text-[#ff912f]">
                                ${salePrice.toFixed(2)}
                            </span>
                         )}
                         {originalPrice > 0 && (
                            <span className="text-[10px] sm:text-xs font-medium text-gray-400 line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                         )}
                    </div>
                </div>

                {/* Toggle & Action */}
                <div className="mt-auto border-t border-gray-100 pt-3 sm:pt-4 flex items-center justify-between gap-2">
                    <div className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
                         <OfferDetailsToggle 
                            domain={companyDomain.domain} 
                            imageSrc={product?.product_image} 
                            merchantImg={merchant_logo} 
                            merchantHref={merchantHref} 
                            offer={product} 
                            type='anchor' 
                         />
                    </div>
                    
                    <div className="flex-shrink-0">
                         <div className="inline-block relative">
                             <OfferOutUrl
                                unique_id={product?.unique_id}
                                outUrl={product?.url}
                                merchantHref={merchantHref}
                                domain={companyDomain.domain}
                                customClass="!bg-[#8bc94a] hover:!bg-[#7ab140] !text-white text-[10px] sm:text-[11px] font-bold py-1.5 px-3 sm:px-4 rounded-full transition-colors shadow-sm inline-flex items-center justify-center min-w-[65px] sm:min-w-[75px]"
                            >
                                Get Deal
                            </OfferOutUrl>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingProductsCard;