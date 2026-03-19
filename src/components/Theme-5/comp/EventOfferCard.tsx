import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
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
    productDetailUrl?: string | null;
}

const EventOfferCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, productDetailUrl }: Props) => {
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col justify-between relative hover:shadow-lg transition-all duration-300 group">
            {product?.offer_type?.name === "product" && (discountPercent ?? 0) > 0 && (
                <div className="absolute top-2 right-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded rounded-full text-[10px] font-extrabold shadow-sm z-10">
                    {finalDiscountTag}
                </div>
            )}

            <div className="flex-1">
                {product?.offer_type?.name === "product" && (
                    <div className="mb-3">
                        <OfferDuration endDate={product?.end_date} />
                    </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 border border-slate-200 rounded-xl flex items-center justify-center p-2 bg-slate-50 flex-shrink-0">
                        <Image
                            src={(product?.offer_type?.name === "product" && product?.product_image) ? getBaseImageUrl(domain, product?.product_image, '') : imageUrl}
                            alt={merchant_name}
                            className="w-full h-full object-contain"
                            height={64}
                            width={64}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        {product?.is_detail === 1 ? (
                            (productDetailUrl && (
                                <Link href={productDetailUrl}>
                                    <h4 className="text-slate-900 font-bold text-sm hover:text-indigo-600 transition-colors line-clamp-2">
                                        {discardHTMLTags(product?.offer_title)}
                                    </h4>
                                </Link>
                            ))
                        ) : (
                            <h4 className="text-slate-900 font-bold text-sm line-clamp-2">
                                {discardHTMLTags(product?.offer_title)}
                            </h4>
                        )}
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

                <div className="space-y-3 mb-4">
                    {product?.offer_type?.name !== "product" && (
                        <OfferDuration endDate={product?.end_date} />
                    )}

                    {product?.offer_type?.name === "product" && (product?.original_price || product?.sale_price) && (
                        <div className="flex items-center gap-3">
                            {product?.sale_price && (
                                <span className="font-black text-indigo-600 text-lg">
                                    {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                </span>
                            )}
                            {product?.original_price && (
                                <span className="line-through text-sm text-slate-500">
                                    {getCurrencySymbol(product?.currency)}{product?.original_price}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex justify-center">
                    {product?.coupon_code ? (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            // Back to basics: Slate-900 -> Indigo-600
                            customClass="bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-extrabold text-[11px] tracking-widest uppercase transition-all duration-300 w-full text-center shadow-sm active:scale-95"
                        >
                            <span>SHOW CODE</span>
                        </OfferOutUrl>
                    ) : (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl font-extrabold text-[11px] tracking-widest uppercase transition-all duration-300 w-full text-center shadow-sm active:scale-95"
                        >
                            <span>
                                {product?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                            </span>
                        </OfferOutUrl>
                    )}
                </div>

                <Link href={merchantHref} className="block text-center">
                    <small className="text-slate-500 font-bold text-[10px] uppercase tracking-wider hover:text-indigo-600 transition-colors">
                        {getRandomStoreSeoTitle(merchant_name)}
                    </small>
                </Link>
            </div>
        </div>
    );
};

export default EventOfferCard;