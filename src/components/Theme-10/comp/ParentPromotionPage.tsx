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
    {/* --- LUXURY DETAIL HERO SECTION (REDESIGNED) --- */}
<section className="pt-10 pb-12 px-0 md:px-0">
  <div className="w-full mx-auto bg-[#FDFBE7] rounded-[2.5rem] overflow-hidden relative border border-[#EADDCA] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]">
    
    {/* Background Accents (Subtle Textures) */}
    <div className="absolute top-0 right-0 w-[40%] h-full bg-[#800000]/[0.02] -skew-x-12 translate-x-20 pointer-events-none" />
    <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-[#800000]/10 rounded-tl-3xl pointer-events-none" />

    <div className="relative z-10 p-10 md:p-20">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
        
        {/* Left Side: Title & Path */}
        <div className="max-w-3xl">
          {/* Minimal Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 group">
            <Link href="/" className="no-underline text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-[#800000] transition-colors">Home</Link>
            <span className="text-[10px] text-[#EADDCA]">•</span>
            <Link href={`/${companyData?.promotion_slug}`} className="no-underline text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-[#800000] transition-colors">Promotions</Link>
          </nav>

          {/* Status Badge + Title */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#800000]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#800000]">Active Campaign</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-[#1A1A1A] leading-[1.05] tracking-tighter">
              {promotion?.promotion?.name}
            </h1>
          </div>
        </div>

        {/* Right Side: Description in a Focus Box */}
        {promotion?.promotion?.description && (
          <div className="lg:max-w-md w-full">
            <div className="relative p-8 bg-white/50 backdrop-blur-sm rounded-[2rem] border border-white shadow-sm">
              {/* Decorative Quote Mark */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#800000] rounded-2xl flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M14.017 21H7.01701V14.5C7.01701 12.0147 9.03173 10 11.517 10H12.017" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div className="text-slate-600 text-base md:text-lg leading-relaxed font-medium">
                <MerchantDetailsShort
                  details={promotion?.promotion?.description}
                />
              </div>

              {/* Bottom Decorative Line */}
              <div className="mt-6 w-full h-[1px] bg-gradient-to-r from-[#800000]/20 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Elegant Bottom Footer Strip */}
    <div className="h-2 w-full bg-[#800000]" />
  </div>
</section>

      <div className="container mx-auto px-6 space-y-32">
  {/* --- PREMIUM BENTO GRID CATEGORIES --- */}
  {subPromotions?.length > 0 && (
    <section>
      <div className="flex flex-col mb-12 relative">
        <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#800000] opacity-50 rounded-full"></div>
        <span className="text-[#800000] font-black text-[11px] uppercase tracking-[0.4em] mb-3 pl-2">
          Curated Collections
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tighter pl-2">
          Explore Sub-Promotions
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {subPromotions.map((item: SubPromotion, index: number) => (
          <Link
            key={index}
            href={getPromotionHref(item, companyData?.promotion_slug)}
            className="group relative h-[350px] overflow-hidden rounded-[3rem] border border-[#EADDCA] transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(128,0,0,0.15)]"
          >
            <Image
              src={getBaseImageUrl(
                companyDomain?.domain,
                item?.category_image,
                "",
              )}
              alt={item?.category_name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
            />
            {/* Elegant Maroon Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent p-12 flex flex-col justify-end">
              <h3 className="text-white text-4xl font-black tracking-tight mb-4 group-hover:-translate-y-2 transition-transform duration-500">
                {item.category_name}
              </h3>
              <div className="flex items-center gap-3 text-[#FDFBE7] font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-[#800000] px-4 py-2 rounded-full">View Offers</span>
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )}

  {/* --- TOP RATED DEALS GRID --- */}
  <section>
    <div className="flex items-end justify-between mb-16 pb-8 border-b-2 border-[#EADDCA]">
      <div>
        <h2 className="text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase italic">
          Top Rated Deals
        </h2>
        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mt-2">Premium curated selections</p>
      </div>
      <div className="hidden md:flex items-center gap-3 bg-[#FDFBE7] px-4 py-2 rounded-full border border-[#800000]/10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#800000] animate-pulse"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#800000]">
          Verified Offers
        </span>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {allOffers?.map((item, index) => (
        <OfferCardThree
          key={index}
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
      ))}
    </div>
  </section>

  {/* --- FEATURED BRANDS SECTION --- */}
  <section className="bg-[#FDFBE7] rounded-[4rem] p-16 border border-[#EADDCA] relative overflow-hidden shadow-sm">
    {/* Minimalist Top Border Accent */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#800000] rounded-b-full"></div>
    
    <h2 className="text-2xl font-black text-[#1A1A1A] text-center mb-20 uppercase tracking-[0.4em]">
      Featured <span className="text-[#800000]">Brands</span>
    </h2>
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-16 gap-x-10">
      {allOffers?.map((item, index) => (
        <div key={index} className="hover:scale-110 transition-transform duration-500">
          <SidebarRoundMerchantCard
            merSlug={companyData?.store_slug}
            slugType={companyData?.slug_type}
            merchant={item?.merchant}
          />
        </div>
      ))}
    </div>
  </section>

  {/* --- FULL DETAILS FOOTER --- */}
  {showFullDetailsSection && (
    <div className="bg-white p-12 rounded-[3rem] border border-[#EADDCA] shadow-inner relative">
      <div className="absolute top-0 left-10 -translate-y-1/2 bg-[#800000] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
        Merchant Terms & Info
      </div>
      <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-headings:text-[#1A1A1A] prose-strong:text-[#800000]">
        <MerchantDetailsFull details={promotion?.promotion?.description} />
      </div>
    </div>
  )}
</div>
    </div>
  );
};

export default ParentPromotionPage;
