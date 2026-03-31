import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularOffers } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import CouponCard from './CouponCard';
import { getMerchantHref, splitHeading } from '@/constants/hooks';
import { FlipReveal, Reveal } from './MotionWrapper'; // Wrappers import karein

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
        <section className="bg-[#fffde0] py-20 px-6 lg:px-12 relative overflow-hidden">
    {/* Section Top Divider - Maroon Gradient for Cream BG */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />

    {/* Background Decorative Element - Maroon Glow */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EADDCA]/30 blur-[150px] rounded-full -mr-48 -mt-48 animate-pulse pointer-events-none"></div>
    
    <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-16">
            {/* Header: Reveal from Left */}
            <Reveal x={-30} y={0}>
                <div className="flex items-center gap-3 mb-4">
                    {/* Line changed to Maroon */}
                    <span className="h-[2px] w-12 bg-[#800000]"></span>
                    {/* Text changed to Cream for visibility on black */}
                    <span className="text-[#1A1A1A] font-bold uppercase tracking-[0.3em] text-xs">Verified Savings</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-[#800000] drop-shadow-[0_0_10px_rgba(128,0,0,0.3)] leading-tight mb-6">
                    {firstHalf || "Today's"}{" "}
                    {/* Gradient changed to Maroon and Light Maroon */}
                    <span className="text-[#1A1A1A]">
                        {secondHalf || "Deals"}
                    </span>
                </h2>
            </Reveal>

            {/* Content: Reveal with Delay */}
            <Reveal delay={0.2}>
                {/* Paragraph text changed to a softer Cream/Grey for readability */}
                <p className="text-[#1A1A1A]/60 max-w-full text-lg font-medium leading-relaxed">
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