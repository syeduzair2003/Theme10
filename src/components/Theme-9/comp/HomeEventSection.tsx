import { apiGetHomeEventDetails } from "@/apis/user";
import {
  discardHTMLTags,
  getEventsHref,
  getMerchantHref,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { MerchantWithOffers, Offer } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";
import EventOfferCard from "./EventOfferCard";
import { ArrowRight } from "lucide-react";
import { ScaleReveal } from "./MotionWrapper";

interface Props {
  companyId: string;
  mer_slug: string;
  mer_slug_type: string;
}

type MerchantOfferItem = {
  offer: Offer;
  merchant: MerchantWithOffers;
};

const HomeEventSection = async ({
  companyId,
  mer_slug,
  mer_slug_type,
}: Props) => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;
  const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;

  const allOffers: MerchantOfferItem[] =
    eventMerchants?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({
        offer,
        merchant,
      })),
    ) || [];

  const firstHalf = "Recent Event: ";
  const secondHalf = eventMerchants?.event?.name;
  const content = eventMerchants?.event?.description;

  if (allOffers?.length === 0) return null;

  return (
    <section
      className="relative bg-[#fffde0] py-24 px-6 overflow-hidden"
      id="recent-deals-section"
    >
      {/* Section Divider Line (Maroon Gradient) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-4xl">
            <ScaleReveal>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-[2px] w-12 bg-[#1A1A1A]"></span>
                <p className="text-[#800000] font-bold text-sm uppercase tracking-[0.2em] leading-none">
                  Explore Event Deals
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter mb-4">
                <span className="text-[#800000]">{firstHalf}</span>
                {secondHalf || " Trending Deals"}
              </h2>
            </ScaleReveal>

            <ScaleReveal delay={0.2}>
              <p className="text-[#1A1A1A]/60 text-lg leading-relaxed max-w-3xl font-medium">
                {discardHTMLTags(content)}
              </p>
            </ScaleReveal>
          </div>

          <ScaleReveal delay={0.3}>
            <Link
              href={getEventsHref(eventMerchants?.event, mer_slug_type)}
              className="no-underline group relative overflow-hidden flex items-center gap-3 rounded-full bg-[#FFFDF5] px-8 py-3.5 text-sm font-black text-[#1A1A1A] border border-[#EADDCA] shadow-[0_4px_12px_rgba(128,0,0,0.05)] transition-all duration-500 hover:border-[#800000] hover:text-[#FFFDF5]"
            >
              <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#800000] to-[#520000] transition-transform duration-500 ease-out group-hover:translate-y-0" />

              <span className="relative z-10 flex items-center gap-2 tracking-tight">
                View Collection
                <ArrowRight
                  size={18}
                  className="stroke-[3px] transition-all duration-500 group-hover:translate-x-2 group-hover:scale-110"
                />
              </span>
            </Link>
          </ScaleReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allOffers.slice(0, 8).map((item, i) => (
            <ScaleReveal key={i} delay={i * 0.1}>
              <EventOfferCard
                product={item?.offer}
                merchantHref={getMerchantHref(
                  item.merchant,
                  mer_slug,
                  mer_slug_type,
                )}
                domain={companyDomain}
                merchant_name={item.merchant?.merchant_name}
                merchant_logo={item.merchant?.merchant_logo}
              />
            </ScaleReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeEventSection;
