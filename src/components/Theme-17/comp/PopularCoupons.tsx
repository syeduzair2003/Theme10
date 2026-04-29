import React from 'react';
import Link from 'next/link';
import { apiGetPopularOffers } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import CouponCard from './CouponCard';

interface Props {
  companyId: string;
  mer_slug_type: string;
  mer_slug: string;
}

const PopularCoupons = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
  const response = await apiGetPopularOffers(companyId);
  const domain = (await cookieService.get("domain")).domain;
  
  const widget = response?.data?.popular_offer_widget;
  const couponData = response?.data?.offers;

  if (!couponData || couponData.length === 0) return null;

  const heading = widget?.widget_heading ?? 'Popular Coupons & Deals';
  const subText = widget?.widget_text ?? 'Hand-picked best offers and exclusive discounts for you';
  const [firstWord, restWords] = splitHeading(heading);

  return (
    <section
      aria-label="Popular Coupons Section"
      className="relative w-full overflow-hidden py-12 md:py-16 lg:py-20"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f9fdf5 50%, #ffffff 100%)',
      }}
    >
      {/* ── Top Gradient Line ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #8bc94a40 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* ── Section Header (Merchant Carousel Style) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          
          <div className="flex-1 min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-1 h-5 rounded-full inline-block"
                style={{ background: '#8bc94a' }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-black uppercase tracking-[0.2em]"
                style={{ color: '#ff912f' }}
              >
                Exclusive Savings
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight m-0">
              {firstWord && (
                <span style={{ color: '#8bc94a' }}>{firstWord} </span>
              )}
              <span className="text-gray-800">{restWords || heading}</span>
            </h2>

            {/* Sub-text */}
            {subText && (
              <p className="mt-2 text-[14px] text-gray-400 font-medium leading-relaxed max-w-2xl m-0">
                {subText}
              </p>
            )}
          </div>

          {/* View All Button */}
          <div className="flex items-center shrink-0">
            <Link
              href="/all-stores/A"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-4 py-2 rounded-full border transition-all duration-200 group"
              style={{
                borderColor: '#f0f0f0',
                color: '#ff912f',
                background: '#ffffff',
              }}
            >
              Explore All Offers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Dynamic Divider ── */}
        <div
            className="w-full h-px mb-8 md:mb-12 opacity-20"
            style={{
                background: 'linear-gradient(90deg, transparent, #8bc94a, #ff912f, #8bc94a, transparent)',
            }}
            aria-hidden="true"
        />

        {/* ── Coupon Grid (Horizontal Cards) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {couponData.slice(0, 6).map((offer, index) => (
            <div 
              key={index}
              className="flex justify-center"
            >
              <CouponCard 
                offer={offer}
                mer_slug={mer_slug}
                mer_slug_type={mer_slug_type}
                domain={domain}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Background Accents ── */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#8bc94a0a] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#ff912f08] rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default PopularCoupons;