"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Offer, OffersOffer } from '@/services/dataTypes'
import RenderRating from './RenderRating'
import OfferModal from './OfferModal'
import SimpleOfferModal from './SimpleOfferModal'
import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import { apiOfferDetails } from '@/apis/offers'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import OfferDuration from './OfferDuration'
import SocialMediaShare from './SocialMediaShare'

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
                    if (renderCount === 1) setShowModal(true);
                }
            } catch (error) {}
        };
        fetchOfferDetails();
        return () => { cancelled = true; };
    }, [awaited_p_id, companyId]);

    const originalPrice = product?.offer?.original_price ? parseFloat(product?.offer?.original_price) : 0;
    const salePrice = product?.offer?.sale_price ? parseFloat(product?.offer?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0 ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : null;
    const finalDiscountTag = getFinalDiscountTag(product?.offer?.offer_title || product?.offer?.offer_detail, discountPercent);

    return (
        <div className="group relative mb-8">
            {/* Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[2rem] blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative flex flex-col lg:flex-row bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden border border-gray-100">
                
                {/* --- Left Part: The Visuals (Ticket Stub) --- */}
                <div className="lg:w-1/4 bg-gray-50/50 p-6 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-dashed border-gray-200">
                    {/* Circle Cuts (Ticket Effect) */}
                    <div className="hidden lg:block absolute -top-4 -right-4 w-8 h-8 bg-slate-50 rounded-full border border-gray-100 shadow-inner"></div>
                    <div className="hidden lg:block absolute -bottom-4 -right-4 w-8 h-8 bg-slate-50 rounded-full border border-gray-100 shadow-inner"></div>

                    <div className="relative w-28 h-28 lg:w-32 lg:h-32 bg-white rounded-3xl p-4 shadow-sm group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                        <Image
                            src={getBaseImageUrl(domain, product?.offer?.product_image || product?.merchant?.merchant_logo, "")}
                            alt="Offer"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </div>
                    
                    {finalDiscountTag && (
                        <div className="mt-4 px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-200">
                            {finalDiscountTag}
                        </div>
                    )}
                </div>

                {/* --- Middle Part: Content --- */}
                <div className="lg:w-2/4 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                        <OfferDuration endDate={product?.offer?.end_date} />
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">• Verified</span>
                    </div>

                    <h4 className="text-xl lg:text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {discardHTMLTags(product?.offer?.offer_title?.replaceAll('_', ' '))}
                    </h4>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                            <RenderRating rating={getRandomRating(product.offer?.rating)} />
                            <span className="ml-2 text-xs font-bold text-amber-700">{getRandomRating(product?.offer?.rating)}</span>
                        </div>
                        <SocialMediaShare offerUrl={`/${product?.offer?.url}`} offerTitle={product?.offer?.offer_title} merchantHref={merchantHref} unique_id={product?.offer?.unique_id} domain={domain} />
                    </div>

                    {product?.offer?.offer_type?.name === "product" && (
                        <div className="mt-6 flex items-center gap-3">
                            <span className="text-3xl font-black text-blue-600 tracking-tighter">
                                {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.sale_price}
                            </span>
                            <span className="text-sm font-medium text-gray-400 line-through decoration-red-400">
                                {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.original_price}
                            </span>
                        </div>
                    )}
                </div>

                {/* --- Right Part: Call to Action --- */}
                <div className="lg:w-1/4 p-8 bg-gray-50/30 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-gray-100">
                    <div className="w-full space-y-3">
                        {product?.offer?.coupon_code ? (
                            <OfferOutUrl
                                unique_id={product?.offer?.unique_id}
                                outUrl={product?.offer?.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass="relative w-full h-16 bg-white border-2 border-dashed border-blue-400 rounded-2xl flex flex-col items-center justify-center group/btn overflow-hidden transition-all hover:border-blue-600"
                            >
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-1 group-hover/btn:opacity-0 transition-opacity">Coupon Code</span>
                                <span className="text-blue-700 font-mono font-black text-lg group-hover/btn:opacity-0 transition-opacity">
                                    {product?.offer?.coupon_code.trim().slice(0, 8)}
                                </span>
                                <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white font-black text-sm tracking-widest translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
                                    REVEAL CODE
                                </div>
                            </OfferOutUrl>
                        ) : (
                            <OfferOutUrl 
                                unique_id={product.offer.unique_id}
                                outUrl={product.offer.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass="no-underline w-full h-16 bg-gray-900 text-white font-black rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:-translate-y-1 shadow-xl hover:shadow-blue-200 transition-all duration-300 active:scale-95 text-sm tracking-widest uppercase"
                            >
                                {product?.offer?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                            </OfferOutUrl>
                        )}
                        <p className="text-[10px] text-center text-gray-400 font-medium italic">* No registration required</p>
                    </div>
                </div>
            </div>

            {/* Modal Logic (Unchanged) */}
            {showModal && p_data != null && !ads_campaign && (
                <OfferModal data={p_data} companyId={companyId} onClose={() => setShowModal(false)} domain={domain} merchantHref={merchantHref} />
            )}
            {(showModal && ads_campaign && p_data != null) && (
                <SimpleOfferModal data={p_data} onClose={() => setShowModal(false)} domain={domain} merchantHref={merchantHref} finalDiscountTag={finalDiscountTag} />
            )}
        </div>
    )
}

export default OffersListView;