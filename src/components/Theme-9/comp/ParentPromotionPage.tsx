import {
  apiGetPromotionOffers,
  apiGetSubPromotion,
} from "@/apis/page_optimization";
import { apiCompanyUpdatedData } from "@/apis/user";
import {
  cleanHtmlContent,
  extractFirstSentences,
  getBaseImageUrl,
  getMerchantHref,
  getPromotionHref,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { MerchantWithOffers, Offer, SubPromotion } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";
import { stripHtml } from "string-strip-html";
import MerchantDetailsShort from "./MerchantDetailsShort";
import MerchantDetailsFull from "./MerchantDetailsFull";
import OfferCardThree from "./OfferCardThree";
import SidebarRoundMerchantCard from "./SidebarRoundMerchantCard";
import Image from "next/image";

const ParentPromotionPage = async ({ params }: { params: string }) => {
  const slug = params;
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  const [promotion, subPromotions] = await Promise.all([
    apiGetPromotionOffers(companyData?.unique_id, slug).then((res) => res.data),
    apiGetSubPromotion(companyData?.unique_id, slug).then((res) => res.data),
  ]);

  const allOffers =
    promotion?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({ offer, merchant })),
    ) || [];

  const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || "");
  const plainDesc = stripHtml(cleanDesc).result;
  const shortDesc = extractFirstSentences(plainDesc);
  const showFullDetailsSection = plainDesc.length > shortDesc.length + 5;

  return (
    <div className="bg-[#fffde0] min-h-screen pb-20">
      {/* HERO SECTION */}
      <section className="pt-10 pb-12 px-0 md:px-0">
        <div className="w-full mx-auto bg-[#FDFBE7] rounded-[2.5rem] overflow-hidden relative border border-[#EADDCA] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
          <div className="absolute top-0 right-0 w-[40%] h-full bg-[#800000]/[0.02] -skew-x-12 translate-x-20 pointer-events-none" />
          <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#800000]/10 rounded-tl-3xl pointer-events-none" />

          <div className="relative z-10 p-10 md:p-20">
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
              {/* Left Side: Title & Path */}
              <div className="max-w-3xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 mb-8 group">
                  <Link
                    href="/"
                    className="no-underline text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-[#800000] transition-colors"
                  >
                    Home
                  </Link>
                  <span className="text-[10px] text-[#EADDCA]">•</span>
                  <Link
                    href={`/${companyData?.promotion_slug}`}
                    className="no-underline text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-[#800000] transition-colors"
                  >
                    Promotions
                  </Link>
                </nav>

                {/* Status Badge + Title */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#800000]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse"></span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#800000]">
                      Active Campaign
                    </span>
                  </div>

                  <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-[1.05] tracking-tighter">
                    {promotion?.promotion?.name}
                  </h1>
                </div>
              </div>

              {/* Right Side: Description */}
              {promotion?.promotion?.description && (
                <div className="lg:max-w-md w-full">
                  <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-white shadow-sm">
                    <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#800000] rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path
                          d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M14.017 21H7.01701V14.5C7.01701 12.0147 9.03173 10 11.517 10H12.017"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <div className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                      <MerchantDetailsShort
                        details={promotion?.promotion?.description}
                      />
                    </div>

                    <div className="mt-6 w-full h-[1px] bg-gradient-to-r from-[#800000]/20 to-transparent"></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h-2 w-full bg-[#800000]" />
        </div>
      </section>

      <div className="container mx-auto px-6">
        {/* BENTO GRID CATEGORIES */}
        {subPromotions?.length > 0 && (
          <section className="py-12 mb-12">
            <div className="flex flex-col mb-10 relative">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-[1.5px] bg-[#800000]"></div>
                <span className="text-[#1A1A1A] font-black text-[9px] uppercase tracking-[0.4em]">
                  Curated Collection
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter leading-none">
                Explore{" "}
                <span className="text-[#800000] italic">Collections</span>
              </h2>
            </div>

            {/* ASYMMETRIC GRID */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
              {subPromotions.map((item: SubPromotion, index: number) => {
                const isWide = index % 3 === 0;

                return (
                  <Link
                    key={index}
                    href={getPromotionHref(item, companyData?.promotion_slug)}
                    className={`group relative overflow-hidden rounded-[2rem] border border-[#EADDCA] transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(128,0,0,0.12)] 
            ${isWide ? "md:col-span-7 h-[280px]" : "md:col-span-5 h-[280px]"}`}
                  >
                    <Image
                      src={getBaseImageUrl(
                        companyDomain?.domain,
                        item?.category_image,
                        "",
                      )}
                      alt={item?.category_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Cleaner Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/20 to-transparent transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                      <h3 className="text-white text-2xl lg:text-3xl font-black tracking-tight mb-4 leading-tight transform group-hover:-translate-y-1 transition-transform duration-500">
                        {item.category_name}
                      </h3>

                      {/* Button */}
                      <div className="flex items-center gap-3 text-[#FDFBE7]">
                        <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-[#800000] group-hover:border-[#800000] transition-all duration-500">
                          <span className="text-sm">→</span>
                        </div>
                        <span className="font-bold text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500">
                          View Deals
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* TOP RATED DEALS SECTION */}
        <section className="py-20 px-4 md:px-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />

          {/* MAIN CONTAINER */}
          <div className="container mx-auto bg-[#FDFBE7]/40 rounded-[4rem] border border-[#EADDCA]/60 p-8 md:p-16 shadow-[0_40px_100px_-30px_rgba(128,0,0,0.05)] relative overflow-hidden mt-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/[0.03] rounded-bl-full -z-10"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#800000]/[0.02] rounded-tr-full -z-10"></div>

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-1 bg-[#800000] rounded-full"></div>
                  <span className="text-[#800000] font-black text-[10px] uppercase tracking-[0.4em]">
                    Premium Picks
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter italic leading-none">
                  Top Rated{" "}
                  <span className="text-[#800000] not-italic">Deals</span>
                </h2>
                <p className="text-slate-500 text-xs font-bold tracking-widest uppercase mt-3 pl-1 opacity-80">
                  Handpicked for quality & value
                </p>
              </div>

              {/* Verified Badge */}
              <div className="mt-8 md:mt-0 flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl border-2 border-[#800000]/10 shadow-sm transition-transform hover:scale-105 duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-[#800000] animate-pulse"></div>
                <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
                  Verified <span className="text-[#800000]">Offers</span>
                </span>
              </div>
            </div>

            {/* OPTIMIZED GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-2 relative z-10">
              {allOffers?.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-500 hover:scale-[1.02]"
                >
                  <OfferCardThree
                    product={item?.offer}
                    merchantHref={getMerchantHref(
                      item.merchant,
                      companyData?.store_slug,
                      companyData?.slug_type,
                    )}
                    domain={companyDomain.domain}
                    merchant_name={item.merchant?.merchant_name}
                    merchant_logo={item.merchant?.merchant_logo}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED BRANDS SECTION */}
        <section className="relative py-24 px-4 md:px-10 overflow-hidden mt-8">
          {/* Divider Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-80" />

          <div className="container mx-auto bg-white/60 backdrop-blur-xl rounded-[5rem] border border-[#EADDCA]/40 py-16 relative shadow-[0_50px_100px_-40px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#800000]/[0.03] rounded-full blur-2xl -z-10"></div>

            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#800000]/[0.03] rounded-full blur-2xl -z-10"></div>

            {/* Header Section */}
            <div className="flex flex-col items-center mb-12 relative z-10 text-center px-6">
              <div className="inline-flex items-center gap-4 mb-4">
                <span className="w-10 h-[1px] bg-[#800000]/20"></span>
                <span className="text-[#800000] font-black text-[9px] uppercase tracking-[0.5em]">
                  Global Partners
                </span>
                <span className="w-10 h-[1px] bg-[#800000]/20"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">
                Featured{" "}
                <span className="text-[#800000] not-italic">Brands</span>
              </h2>
              <div className="mt-6 w-10 h-1 bg-[#800000] rounded-full opacity-20"></div>
            </div>

            {/* BRANDS GRID CONTAINER */}
            <div className="relative w-full px-8 md:px-16">
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-12 py-6">
                {allOffers?.map((item, index) => (
                  <div key={index} className="flex-none">
                    <SidebarRoundMerchantCard
                      merSlug={companyData?.store_slug}
                      slugType={companyData?.slug_type}
                      merchant={item?.merchant}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* MERCHANT TERMS & INFO SECTION */}
        {showFullDetailsSection && (
          <div className="relative py-20 max-w-5xl mx-auto px-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/40 via-[#800000]/10 to-transparent opacity-80" />

            {/* HEADER BADGE */}
            <div className="absolute top-20 left-8 md:left-12 -translate-y-1/2 z-20">
              <div className="bg-[#800000] text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_15px_30px_-5px_rgba(128,0,0,0.3)] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Merchant Terms <span className="text-white/40 ml-1">&</span>{" "}
                Info
              </div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="bg-[#FDFBE7]/40 backdrop-blur-sm px-8 md:px-14 py-8 rounded-[3.5rem] border border-[#EADDCA]/60 shadow-[inset_0_2px_15px_rgba(234,221,202,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#800000]/[0.02] rounded-bl-full -z-10"></div>

              <div className="flex flex-col md:flex-row gap-10">
                <div className="hidden md:flex flex-col items-center gap-4 py-2">
                  <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#800000]/30"></div>
                  <div className="w-8 h-8 rounded-full border border-[#800000]/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse"></div>
                  </div>
                  <div className="w-[1px] flex-grow bg-gradient-to-t from-transparent to-[#800000]/30"></div>
                </div>

                {/* Right Side: Content Area */}
                <div className="flex-grow pt-4">
                  <div
                    className="prose prose-slate max-w-none 
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-sm prose-p:mb-4
            prose-headings:text-[#1A1A1A] prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase prose-headings:mt-6
            prose-strong:text-[#800000] prose-strong:font-black
            prose-li:text-slate-600 prose-li:text-sm prose-li:mb-1
            prose-a:text-[#800000] prose-a:font-bold prose-a:no-underline hover:prose-a:underline"
                  >
                    <MerchantDetailsFull
                      details={promotion?.promotion?.description}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentPromotionPage;
