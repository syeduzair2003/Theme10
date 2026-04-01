import React from "react";
import Link from "next/link";
import { apiGetTopMerchants } from "@/apis/page_optimization";
import { ArrowRight } from "lucide-react";
import TopMerchants from "./TopMerchants";

interface Props {
  companyId: string;
  mer_slug: string;
  mer_slug_type: string;
}

const PremiumBrand = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
  const merchants = await apiGetTopMerchants(companyId);
  const heading =
    merchants?.data?.top_merchants_widget?.widget_heading || "Premium Brands";
  const subHeading = merchants?.data?.top_merchants_widget?.widget_text;

  if (merchants.data?.merchants?.length > 0) {
    return (
      <section className="bg-[#fffde0] py-16 px-6 relative overflow-hidden">
        {/* Section Top Divider Line - Maroon Gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section Fix */}
          <div className="relative mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="max-w-full">
                <p className="text-[#800000] font-bold text-xs mb-3 uppercase tracking-widest">
                  Trusted by millions
                </p>
                {/* Heading color set to Matte Black for Cream BG contrast */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[1.1] mb-4">
                  {heading}
                </h2>
                {subHeading && (
                  <p className="text-[#1A1A1A]/50 text-base md:text-lg leading-relaxed max-w-full font-medium">
                    {subHeading}
                  </p>
                )}
              </div>

              {/* View All Button - Refined for Branded Look */}
              <Link
                href={`/all-stores/A`}
                className="inline-flex items-center gap-2 text-[#1A1A1A]/60 font-black text-[11px] uppercase tracking-widest hover:text-[#800000] transition-all whitespace-nowrap mt-2 md:mt-4 group no-underline"
                target="_blank"
              >
                <span className="relative pb-1">
                  View all
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#800000] group-hover:w-full transition-all duration-500" />
                </span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1.5 transition-transform duration-500"
                />
              </Link>
            </div>
          </div>

          {/* Brands Grid Rendering */}
          <div className="mt-8">
            <TopMerchants
              merchantData={merchants?.data?.merchants}
              mer_slug_type={mer_slug_type}
              mer_slug={mer_slug}
            />
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default PremiumBrand;
