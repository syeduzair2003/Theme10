import { OffersOffer } from "@/services/dataTypes";
import React from "react";
import { apiGetPopularProducts } from "@/apis/page_optimization";
// import OffersCard from './OffersCard';
import { splitHeading } from "@/constants/hooks";
import Link from "next/link";
import { faArrowRight, FontAwesomeIcon } from "@/constants/icons";
import ProductCard from "./ProductCard";
import OfferSlider from "./OfferSlider";
import { ArrowRight } from 'lucide-react';

interface Props {
  companyId: string;
  mer_slug_type: string;
  mer_slug: string;
}
const TrendingProducts = async ({
  companyId,
  mer_slug_type,
  mer_slug,
}: Props) => {
  const response = await apiGetPopularProducts(companyId);
  const [firstHalf, secondHalf] = splitHeading(
    response?.data?.home_page_widget?.widget_heading,
  );
  const content = response?.data?.home_page_widget?.widget_text;
  const couponData = response?.data?.offers;
  const count = 8;
  if (couponData?.length > 0) {
    return (
      <section className="bg-[#fffde0] py-20 px-6 lg:px-20 overflow-hidden relative">
            {/* Section Top Divider Line - Premium Maroon Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100" />

            <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              {/* Text changed to Matte Black (#1A1A1A) for Cream BG visibility */}
              <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tight">
                {firstHalf || "Trending"}{" "}
                <span className="text-[#800000] drop-shadow-[0_0_15px_rgba(128,0,0,0.2)]">
                  {secondHalf || "Products"}
                </span>
              </h2>
              {/* Softer Black/Grey for paragraph readability */}
              <p className="text-[#1A1A1A]/50 max-w-2xl text-sm leading-relaxed">
                {content}
              </p>
            </div>
            <Link
  href="/all-products"
  className="group flex items-center gap-3 px-8 py-3.5 border border-[#800000]/40 rounded-full text-[#800000] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#800000] hover:text-white hover:border-transparent hover:shadow-[0_15px_30px_rgba(128,0,0,0.2)] no-underline"
>
  View More Deals
  <ArrowRight 
    size={16} 
    className="transition-transform duration-500 group-hover:translate-x-1.5" 
  />
</Link>
          </div>

          <div className="max-w-7xl mx-auto">
            <OfferSlider>
              {couponData.slice(0, 8).map((item: any, i: number) => (
                <ProductCard
                  key={i}
                  offer={item}
                  mer_slug={mer_slug}
                  mer_slug_type={mer_slug_type}
                  type={item?.offer?.offer_type?.name}
                />
              ))}
            </OfferSlider>
          </div>
        </div>
      </section>
    );
  }
};

export default TrendingProducts;
