import React from 'react';
import Link from 'next/link';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import TopMerchants from './TopMerchants';

interface Props {
  companyId: string;
  mer_slug: string;
  mer_slug_type: string;
}

const MerchantsCarousel = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
  const merchants = await apiGetTopMerchants(companyId);

  const widget = merchants?.data?.top_merchants_widget;
  const merchantList = merchants?.data?.merchants;

  if (!merchantList || merchantList.length === 0) return null;

  const heading = widget?.widget_heading ?? 'Verified Stores & Brands';
  const subText = widget?.widget_text ?? 'Curated coupon codes from your favourite retailers';
  const [firstWord, restWords] = splitHeading(heading);

  return (
    <section
      aria-label="Top Merchants Section"
      className="relative w-full py-12 md:py-16 lg:py-20"
      style={{
        background:
          'linear-gradient(180deg, #f4fbee 0%, #ffffff 40%, #fffcf8 100%)',
      }}
    >
      {/* ── Subtle horizontal rule ── */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #d4f0b0 30%, #ffd4a8 70%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4">
        {/* ── Section header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

          {/* Left Side: flex-1 and min-w-0 allow this to fill the width until it hits the button */}
          <div className="flex-1 min-w-0">

            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-[3px] h-4 rounded-full inline-block"
                style={{ background: '#8bc94a' }}
                aria-hidden="true"
              />
              <span
                className="text-[10px] font-bold uppercase tracking-widest"
                style={{ color: '#ff912f' }}
              >
                Trusted Partners
              </span>
            </div>

            {/* Heading - Size remains text-xl md:text-2xl */}
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
              {firstWord && (
                <span style={{ color: '#8bc94a' }}>{firstWord} </span>
              )}
              <span className="text-gray-800">{restWords || heading}</span>
            </h2>

            {/* Sub-text */}
            {subText && (
              <p className="mt-1 text-[13px] text-gray-400 leading-relaxed m-0">
                {subText}
              </p>
            )}
          </div>

          {/* Right: View All button - shrink-0 ensures the button never gets squashed */}
          <div className="flex items-start pt-1 shrink-0">
            <Link
              href="/all-stores/A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-4 py-2 rounded-full border transition-all duration-200 group"
              style={{
                borderColor: '#e8e8e8',
                color: '#ff912f',
                background: '#ffffff',
              }}
            >
              View All Brands
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
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

        {/* ── Thin gradient divider ── */}
        <div
          className="w-full h-px mb-6"
          style={{
            background:
              'linear-gradient(90deg, #8bc94a30, #ff912f30, #8bc94a30)',
          }}
          aria-hidden="true"
        />

        {/* ── Merchant card grid ── */}
        <TopMerchants
          merchantData={merchantList}
          mer_slug={mer_slug}
          mer_slug_type={mer_slug_type}
        />
      </div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
        style={{
          background:
            'linear-gradient(0deg, rgba(255,255,255,0.9) 0%, transparent 100%)',
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export default MerchantsCarousel;