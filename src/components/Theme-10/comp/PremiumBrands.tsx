import React from "react";
import Link from "next/link";
import { apiGetTopMerchants } from "@/apis/page_optimization";
import { ArrowRight } from "lucide-react";
import TopMerchantsCarousel from "./TopMerchantsCarousel";
import StoreCard from "./StoreCard"; // Yahan import hoga kyunki ye server component hai

interface Props {
  companyId: string;
  mer_slug: string;
  mer_slug_type: string;
}

const PremiumBrand = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
  const merchants = await apiGetTopMerchants(companyId);
  
  const heading = merchants?.data?.top_merchants_widget?.widget_heading || "Premium Brands";
  const subHeading = merchants?.data?.top_merchants_widget?.widget_text;

  if (merchants.data?.merchants?.length > 0) {
    // 1. Pehle cards ki array server-side par hi taiyar kar lo
    const merchantCards = merchants.data.merchants.map((merchant: any, index: number) => (
      <StoreCard
        key={index}
        merchant={merchant}
        mer_slug={mer_slug}
        mer_slug_type={mer_slug_type}
      />
    ));

    return (
      <section className="bg-[#fffde0] py-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div className="max-w-4xl">
                <p className="text-[#800000] font-bold text-[10px] md:text-xs mb-3 uppercase tracking-[0.2em]">Trusted by millions</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-[1.1] mb-4">{heading}</h2>
                {subHeading && <p className="text-[#1A1A1A]/60 text-sm md:text-base leading-relaxed max-w-3xl font-medium">{subHeading}</p>}
              </div>

              <Link
                href={`/all-stores/A`}
                className="no-underline group relative overflow-hidden inline-flex items-center justify-center gap-3 rounded-full bg-[#FFFDF5] min-w-[160px] px-8 py-3.5 text-[11px] font-black text-[#1A1A1A] border border-[#EADDCA] shadow-[0_4px_12px_rgba(128,0,0,0.05)] transition-all duration-500 hover:border-[#800000] hover:text-[#FFFDF5] uppercase tracking-widest whitespace-nowrap lg:mb-2"
                target="_blank"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#800000] to-[#520000] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center justify-center gap-2 w-full">
                  View all
                  <ArrowRight size={14} className="stroke-[3px] transition-all duration-500 group-hover:translate-x-1.5 group-hover:scale-110" />
                </span>
              </Link>
            </div>
          </div>

          <div className="mt-8">
            {/* 2. Ab Carousel ko ye array bhej do. Slider client ka hoga, lekin cards server ke! */}
            <TopMerchantsCarousel>
              {merchantCards}
            </TopMerchantsCarousel>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default PremiumBrand;