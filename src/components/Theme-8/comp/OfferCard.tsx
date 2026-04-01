import React from "react";
import Image from "next/image";
import { Copy, Star, ExternalLink } from "lucide-react";
import { 
    discardHTMLTags, 
    getBaseImageUrl, 
    getFinalDiscountTag, 
    getMerchantHref, 
    getRandomRating, 
    getRandomStoreSeoTitle 
} from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { OffersOffer } from '@/services/dataTypes';
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    type?: string;
    productDetailUrl?: string | null;
}

const OfferCard = async ({ offer, mer_slug_type, mer_slug, type, productDetailUrl }: Props) => {
    const domainData = await cookieService.get("domain");
    const domain = domainData?.domain;
    
    const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
    const product = offer?.offer || offer;

    const imageSrc = type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");
    
    const rating = getRandomRating(offer?.offer?.rating);
    const brandName = offer?.merchant?.merchant_name || "Store";
    
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    const gradients = [
        'from-green-500 to-emerald-600',
        'from-blue-500 to-indigo-600',
        'from-purple-500 to-pink-600',
        'from-orange-500 to-red-600',
    ];  
    const randomGradient = gradients[brandName.length % gradients.length];

    return (
        <div className="group relative h-full">
            <div className={`relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl h-full border border-white/10 transition-all duration-500  before:absolute before:inset-0 before:bg-black/40 before:rounded-[2.5rem]`}>
                <div className="absolute inset-0 z-0 overflow-hidden">
                
                    <div className="relative h-[60%] w-full">
                        {imageSrc && (
                            <Image
                                src={imageSrc}
                                alt={brandName}
                                fill
                                className="object-contain p-12 transition-transform duration-700 group-hover:scale-125"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        )}
                    </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${randomGradient} opacity-60`} />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

                {/* Top Section */}
                <div className="relative z-20">
                    <Link href={merchantHref} className="no-underline">
                        <p className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-white transition-colors">
                            {brandName}
                        </p>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                        <Star size={10} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-white/60 text-[10px] font-bold">{rating}</span>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="relative z-20 mt-auto mb-4">
                    {finalDiscountTag && (
                        <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg mb-3 border border-white/10">
                            {finalDiscountTag}
                        </span>
                    )}
                    
                    {product?.is_detail === 1 && productDetailUrl ? (
                        <Link href={productDetailUrl}>
                            <h3 className="text-white text-xl font-bold leading-tight mb-2 line-clamp-3 hover:text-blue-300 transition-colors">
                                {discardHTMLTags(product?.offer_title)}
                            </h3>
                        </Link>
                    ) : (
                        <h3 className="text-white text-xl font-bold leading-tight mb-2 line-clamp-3">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}

                    <p className="text-gray-300 text-xs font-medium line-clamp-1 mb-3">
                        {getRandomStoreSeoTitle(brandName)}
                    </p>

                    {/* View Details Toggle (Re-added) */}
                    <OfferDetailsToggle
                        domain={domain}
                        imageSrc={imageSrc}
                        merchantHref={merchantHref}
                        offer={product}
                        type="anchor"
                        buttonClass="text-white/40 text-[11px] font-semibold hover:text-white transition-all underline underline-offset-4"
                    />
                </div>

                {/* Bottom Section (CTA) */}
                <div className="relative z-20">
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="no-underline w-full !bg-white !text-black py-4 rounded-2xl !font-extrabold flex items-center justify-center gap-2 shadow-lg hover:!bg-blue-600 hover:!text-white transition-all duration-300 overflow-hidden relative group/btn"
                    >
                        {product?.coupon_code ? (
                            <div className="flex items-center gap-2">
                                <Copy size={16} className="transition-transform group-hover/btn:rotate-12" />
                                <div className="flex items-center">
                                    <span className="tracking-wider uppercase text-[10px] opacity-60 mr-1">CODE:</span>
                                    <span className="tracking-wider uppercase text-sm font-black">
                                        {product.coupon_code.trim().slice(0, 8)}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ExternalLink size={16} />
                                <span className="tracking-wider uppercase text-sm !font-extrabold">
                                    {type === "product" ? "Buy Now" : "Get Deal"}
                                </span>
                            </>
                        )}
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;