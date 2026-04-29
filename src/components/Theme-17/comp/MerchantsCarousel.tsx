import React from 'react';
import Link from 'next/link';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import TopMerchants from './TopMerchants';
import { ArrowRight, Globe } from 'lucide-react';

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
      className="relative w-full py-16 md:py-24 bg-[#020617] overflow-hidden"
    >
      {/* ── Section Divider Line ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Background Subtle Tech Pattern ── */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container relative z-10 mx-auto px-4">
        
        {/* ── Section Header Row ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          <div className="max-w-2xl">
            {/* Eyebrow Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                Partner Network
              </div>
              <div className="h-px w-8 bg-slate-800" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none m-0 uppercase">
              {firstWord && (
                <span className="text-indigo-500">{firstWord} </span>
              )}
              <span className="text-slate-200">{restWords || heading}</span>
            </h2>

            {/* Sub-text */}
            {subText && (
              <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed max-w-lg font-medium">
                {subText}
              </p>
            )}
          </div>

          {/* View All Button - Sleek Dark Version */}
          <div className="shrink-0">
            <Link
              href="/all-stores/A"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-6 py-3 rounded-xl border border-white/10 text-slate-300 bg-white/5 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 group shadow-2xl"
            >
              <span>Explore All Brands</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Content Grid Wrapper ── */}
        <div className="relative">
          {/* Decorative side glow */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-600/10 blur-[80px] pointer-events-none" />
          
          <TopMerchants
            merchantData={merchantList}
            mer_slug={mer_slug}
            mer_slug_type={mer_slug_type}
          />
        </div>

      </div>

      {/* ── Bottom Section Break ── */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default MerchantsCarousel;