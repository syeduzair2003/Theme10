import React from "react";
import { apiGetPopularDeals } from "@/apis/page_optimization";
import { splitHeading } from "@/constants/hooks";
import OfferCard from "./OfferCard";
import { Reveal } from "./MotionWrapper"; // Import the wrapper

interface Props {
  companyId: string;
  mer_slug_type: string;
  mer_slug: string;
}

const FeaturedDeals = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
  // Server-side Data Fetching
  const response = await apiGetPopularDeals(companyId);
  const bestOffers = response.data;

  if (!bestOffers?.offers?.length) return null;

  const [firstHalf, secondHalf] = splitHeading(
    bestOffers?.popular_deals_widget?.widget_heading,
  );
  const content = bestOffers?.popular_deals_widget?.widget_text;
  const count = 6;

  return (
    <section className="bg-[#1A1A1A] py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Animation */}
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <p className="text-[#800000] font-black text-xs mb-3 uppercase tracking-[0.3em] opacity-90">
                Handpicked for you
              </p>
              <h2 className="text-5xl md:text-6xl font-black text-[#FFFDF5] mb-4 tracking-tighter">
                {firstHalf ? firstHalf : `Featured`}{" "}
                <span className="text-[#800000] drop-shadow-[0_0_15px_rgba(128,0,0,0.3)]">
                  {secondHalf ? secondHalf : `Deals`}
                </span>
              </h2>
              <p className="text-[#FFFDF5]/60 text-lg max-w-2xl leading-relaxed font-medium">
                {content}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Grid with Individual Reveal for each card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestOffers?.offers?.slice(0, count)?.map((item: any, i: number) => (
            <Reveal key={i} delay={i * 0.1}>
              {" "}
              {/* Har card thoda late aayega */}
              <OfferCard
                offer={item}
                mer_slug_type={mer_slug_type}
                mer_slug={mer_slug}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDeals;
