"use client"
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import { apiOfferDetails } from '@/apis/offers'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import dynamic from 'next/dynamic'

const OfferModal = dynamic(() => import('./OfferModal'), { ssr: false })

interface Props {
    product: OffersOffer,
    companyId: string,
    awaited_p_id?: string,
    mer_slug_type: string,
    mer_slug: string,
    domain: string,
    ads_campaign: boolean,
}

let renderCount = 0;
const OffersListView = ({ product, companyId, awaited_p_id, mer_slug_type, mer_slug, domain, ads_campaign }: Props) => {
    const [p_data, setP_data] = useState<Offer | null>(null);
    const [showModal, setShowModal] = useState(false);
    const merchantHref = getMerchantHref(product.merchant, mer_slug, mer_slug_type);

    useEffect(() => {
        if (!awaited_p_id || !companyId) return;

        let cancelled = false;

        const fetchOfferDetails = async () => {
            try {
                const offer_details = await apiOfferDetails(awaited_p_id, companyId);
                if (!cancelled) {
                    setP_data(offer_details.data);
                    renderCount += 1;
                }
                if (renderCount === 1) {
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Error fetching offer details:", error);
            }
        };

        fetchOfferDetails();

        return () => {
            cancelled = true;
        };
    }, [awaited_p_id, companyId]);

    const originalPrice = product?.offer?.original_price ? parseFloat(product?.offer?.original_price) : 0;
    const salePrice = product?.offer?.sale_price ? parseFloat(product?.offer?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;
    const finalDiscountTag = getFinalDiscountTag(
        product?.offer?.offer_title || product?.offer?.offer_detail,
        discountPercent,
    );

    const endDate = product?.offer?.end_date;
    const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

    return (
        <>
            {showModal && p_data != null && (
                <OfferModal
                    data={p_data}
                    companyId={companyId}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                />
            )}
            <div className="mb-6">
                <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-500 overflow-hidden">
                    <div className="flex flex-col lg:flex-row relative">
                        {/* Product Image - Left Side */}
                        {product?.offer?.offer_type?.name === "product" && product?.offer?.product_image && (
                            <div className="lg:w-64 flex items-center justify-center p-6 lg:border-r border-slate-100 bg-slate-50/50">
                                <div className="relative w-full max-w-[200px] aspect-square">
                                    <Image
                                        src={getBaseImageUrl(domain, product?.offer?.product_image, "")}
                                        alt={product?.offer?.offer_title || "Product"}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="flex-1 p-6 lg:p-8">
                            {finalDiscountTag && (
                                <div className="absolute top-2 right-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded rounded-full text-[10px] font-extrabold shadow-sm z-10">
                                    {finalDiscountTag}
                                </div>
                            )}
                            {/* Duration and Tags */}
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                {daysLeft !== null && daysLeft > 0 && (
                                    <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-xs font-bold text-slate-700">{daysLeft} days left</span>
                                    </div>
                                )}
                                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                </span>
                                <div className="inline-flex items-center gap-1.5 md:gap-2 bg-slate-100 text-slate-900 px-2 py-1 md:px-3 md:py-1.5 rounded-lg">
                                    <svg className="w-3 h-3 md:w-4 md:h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-[10px] md:text-xs font-bold text-slate-900">{calculateOfferDuration(endDate)}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                {discardHTMLTags(product?.offer?.offer_title?.replaceAll('_', ' '))}
                            </h4>

                            {/* Price Info for Products */}
                            {product?.offer?.offer_type?.name === "product" && (
                                <div className="flex items-center gap-4 mb-6">
                                    {product?.offer?.sale_price && (
                                        <span className="text-2xl font-black text-indigo-600">
                                            {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.sale_price}
                                        </span>
                                    )}
                                    {product?.offer?.original_price && (
                                        <span className="text-sm text-slate-400 line-through">
                                            {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.original_price}
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Action Bar */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                                {/* Action Buttons */}
                                <div className="ml-auto flex items-center gap-3">
                                    <button
                                        onClick={async () => {
                                            const offer_details = await apiOfferDetails(product?.offer?.unique_id, companyId);
                                            setP_data(offer_details.data);
                                            setShowModal(true);
                                        }}
                                        className="px-4 py-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl font-bold text-sm transition-all duration-300"
                                    >
                                        View Detail
                                    </button>
                                    {product?.offer?.coupon_code ? (
                                        <OfferOutUrl
                                            unique_id={product?.offer?.unique_id}
                                            outUrl={product?.offer?.url}
                                            merchantHref={merchantHref}
                                            domain={domain}
                                            customClass="group/btn relative px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg overflow-hidden"
                                        >
                                            <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity">
                                                {product?.offer?.coupon_code.trim().split(' ')[0].slice(0, 7)}
                                            </span>
                                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                                Show Coupon
                                            </span>
                                        </OfferOutUrl>
                                    ) : (
                                        <OfferOutUrl
                                            unique_id={product.offer.unique_id}
                                            outUrl={product.offer.url}
                                            merchantHref={merchantHref}
                                            domain={domain}
                                            customClass='px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg'
                                        >
                                            {product?.offer?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                                        </OfferOutUrl>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OffersListView
