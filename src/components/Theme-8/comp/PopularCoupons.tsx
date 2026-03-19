import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import CouponCard from './CouponCard';
import { getMerchantHref, splitHeading } from '@/constants/hooks';
import { FlipReveal, Reveal } from '../comp/MotionWrapper'; // Wrappers import karein

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const PopularCoupons = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularOffers(companyId);
    const domainData = await cookieService.get("domain");
    const companyDomain = domainData?.domain;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_offer_widget?.widget_heading);

    const content = response?.data?.popular_offer_widget?.widget_text;
    const couponData = response?.data?.offers;
    const count = 6;

    if (!couponData || couponData.length === 0) return null;

    return (
        <section className="bg-[#0F172A] py-20 px-6 lg:px-12 relative overflow-hidden">
            {/* Background Decorative Element - Isko b animate kr skte ho */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48 animate-pulse"></div>
            
            <div className="max-w-[1400px] mx-auto relative z-10">
                <div className="mb-16">
                    {/* Header: Reveal from Left */}
                    <Reveal x={-30} y={0}>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-[2px] w-12 bg-blue-500"></span>
                            <span className="text-blue-400 font-bold uppercase tracking-[0.3em] text-xs">Verified Savings</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                            {firstHalf || "Today's"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{secondHalf || "Deals"}</span>
                        </h2>
                    </Reveal>

                    {/* Content: Reveal with Delay */}
                    <Reveal delay={0.2}>
                        <p className="text-slate-400 max-w-full text-lg font-medium leading-relaxed">
                            {content || "Hand-picked premium discounts from world-class brands, updated every hour."}
                        </p>
                    </Reveal>
                </div>

                {/* Grid: 3D Flip Reveal for Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {couponData.slice(0, count).map((item: OffersOffer, i: number) => (
                        <FlipReveal key={i} delay={i * 0.15}>
                            <CouponCard
                                product={item?.offer}
                                merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                                domain={companyDomain}
                                merchant_logo={item?.merchant?.merchant_logo}
                                merchant_name={item?.merchant?.merchant_name}
                            />
                        </FlipReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default PopularCoupons;