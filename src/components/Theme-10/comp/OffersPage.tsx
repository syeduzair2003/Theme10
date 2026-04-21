import React from "react";
import { apiGetMetaData } from "@/apis/user";
import { apiGetSimilarMerchants, apiMerchantDetails } from "@/apis/merchant";
import { Merchant } from "@/services/dataTypes";
import { apiOfferBanners, apiSpecificOffers } from "@/apis/offers";
import CategorySidebar from "./CategorySidebar";
import TagsSidebar from "./TagsSidebar";
import LazyLoadingOffers from "./LazyLoadingOffers";
import Link from "next/link";
import RenderRating from "./RenderRating";
import StoreCard from "./StoreCard";
import {
  discardHTMLTags,
  filterOfferBanners,
  getBaseImageUrl,
  getLastUpdateDate,
  getRandomRating,
  getRandomStoreSeoTitle,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import VerticalOfferBanner from "./VerticalOfferBanner";
import MerchantFaqsAccordion from "./MerchantFaqsAccordion";
import Accordion from "react-bootstrap/Accordion";
import MerchantDetailsShort from "./MerchantDetailsShort";
import MerchantDetailsFull from "./MerchantDetailsFull";
import Image from "next/image";
import { apiNavCategory } from "@/apis/page_optimization";
import { faArrowRight, faGreaterThan } from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MerchantSchemaScripts from "@/components/shared/SchemaScripts/MerchantSchemaScripts";

interface Props {
  merchant_id: string;
  slug: string[];
  product_id: Promise<string>;
  company_id: string;
  store_slug: string;
  category_slug: string;
  slug_type: string;
  ads_campaign: boolean;
}

const OffersPage = async ({
  merchant_id,
  product_id,
  slug,
  company_id,
  store_slug,
  category_slug,
  slug_type,
  ads_campaign,
}: Props) => {
  const [
    awaited_p_id,
    bannerResponse,
    categories,
    offers,
    similarMerchantsRes,
    cookieDomain,
    metaRes,
    merchantDetailsRes,
  ] = await Promise.all([
    product_id,
    apiOfferBanners(merchant_id, company_id),
    apiNavCategory(company_id),
    apiSpecificOffers(merchant_id, company_id, 1),
    apiGetSimilarMerchants(company_id, merchant_id),
    cookieService.get("domain"),
    apiGetMetaData(
      JSON.stringify(slug),
      (await cookieService.get("domain")).domain,
    ),
    apiMerchantDetails(merchant_id, company_id),
  ]);

  const companyDomain = cookieDomain.domain;
  const similarMerchant = similarMerchantsRes?.data;
  const filteredVerticalBanners = filterOfferBanners(
    bannerResponse?.data?.offers || [],
    10,
    2000,
    10,
    2000,
  );

  const meta = metaRes?.data;
  const merchant_details = {
    ...merchantDetailsRes,
    mer_meta_title: meta?.meta_title,
    mer_meta_desc: meta?.meta_description,
  };
  const [heading, details] = splitHeadingFromDetails(
    merchant_details?.data?.merchant_detail,
  );

  return (
    <div className="bg-[#fffde0] min-h-screen font-sans">
      {/* --- THE ELITE SIGNATURE HERO (PRO BALANCED) --- */}
<section className="relative bg-[#FDFCF0] pt-32 pb-12 overflow-hidden border-b border-[#800000]/10">
  {/* Luxury Ambient Orbs */}
  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#800000]/[0.03] rounded-full blur-[140px] -mr-40 -mt-40 pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D1C7A7]/[0.15] rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

  <div className="container mx-auto px-6 lg:px-20 relative z-10">
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start"> 
      
      {/* Left Content Area */}
      <div className="w-full lg:w-[55%] space-y-8"> 
        <nav className="inline-flex items-center gap-3 text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">
          <Link href="/" className="hover:text-[#800000] transition-colors">Home</Link>
          <div className="w-1 h-1 rounded-full bg-[#800000]"></div>
          <Link href="/all-stores/A" className="hover:text-[#800000] transition-colors uppercase">{store_slug}</Link>
          <div className="w-1 h-1 rounded-full bg-[#800000]"></div>
          <span className="text-[#800000]">{merchant_details?.data?.merchant_name}</span>
        </nav>

        {/* Heading & Description */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.1] tracking-tighter uppercase">
            {heading ? discardHTMLTags(heading) : (
              <>Exclusive <span className="text-[#800000] font-serif italic lowercase tracking-normal font-normal">Savings</span> <br /> For {merchant_details?.data?.merchant_name}</>
            )}
          </h1>

          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-md italic border-l-2 border-[#800000]/10 pl-5">
            Hand-curated selection of premium vouchers and seasonal offers for an optimized shopping experience.
          </p>
        </div>

        {/* --- MOVED STATS: Filling the empty space --- */}
        <div className="flex flex-wrap items-center gap-8 pt-4">
           <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#800000] border border-[#800000]/5 group-hover:bg-[#800000] group-hover:text-white transition-all duration-300">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-wider">Active Deals</span>
                 <span className="text-[9px] font-medium text-slate-400 italic">Verified Today</span>
              </div>
           </div>

           <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#800000] border border-[#800000]/5 group-hover:bg-[#800000] group-hover:text-white transition-all duration-300">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-wider">Trusted Store</span>
                 <span className="text-[9px] font-medium text-slate-400 italic">Authentic Partner</span>
              </div>
           </div>
        </div>
      </div>

      {/* --- THE ULTRA-SLEEK COMPACT CARD --- */}
      <div className="w-full lg:w-[38%] relative group">
        <div className="absolute -inset-1 bg-[#800000]/[0.05] rounded-[2.3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <div className="relative bg-white rounded-[2.2rem] border-2 border-[#800000]/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:border-[#800000]/20">
          <div className="flex flex-col">
            {/* Header / Logo Area */}
            <div className="relative h-28 flex items-center justify-center bg-[#FDFCF0]/60 border-b border-[#800000]/5">
              <div className="relative w-20 h-20 transform group-hover:scale-110 transition-transform duration-700">
                <Image
                  className="object-contain"
                  alt={merchant_details?.data?.merchant_name}
                  src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                  fill
                  sizes="120px"
                  priority
                />
              </div>
              <div className="absolute top-4 right-5 flex items-center gap-1.5 px-2 py-1 bg-white rounded-full border border-[#800000]/10">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[7px] font-black tracking-widest text-[#800000] uppercase">Verified</span>
              </div>
            </div>

            {/* Merchant Identity Only */}
            <div className="p-6 pb-8 space-y-4 bg-white">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[8px] font-black text-[#800000] uppercase tracking-[0.3em] mb-0.5 opacity-60">Brand Identity</p>
                  <h4 className="text-xl md:text-2xl font-black text-[#1A1A1A] tracking-tighter uppercase truncate leading-none">
                    {merchant_details?.data?.merchant_name}
                  </h4>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xl font-black text-[#1A1A1A] tracking-tighter">{getRandomRating(merchant_details?.data?.rating)}</span>
                  <div className="flex text-amber-400 text-[7px] gap-0.5 mt-1">
                    <RenderRating rating={getRandomRating(merchant_details?.data?.rating)} />
                  </div>
                </div>
              </div>

              {details && details !== null && (
                <p className="text-slate-500 text-[12px] leading-relaxed font-medium italic border-l-2 border-[#800000]/10 pl-3 line-clamp-3">
                  <MerchantDetailsShort details={details} />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

    {/* --- MAIN CONTENT SECTION (ELITE RESPONSIVE) --- */}
<section className="py-12 bg-[#FDFCF0]/30">
  <div className="container mx-auto px-4 lg:px-20">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      
      {/* --- RIGHT CONTENT AREA (OFFERS) --- */}
      {/* lg:order-2 desktop par right rahega, magar mobile par ye automatically pehle show hoga */}
      <main className="lg:col-span-8 order-1 lg:order-2 space-y-10">
        
        {/* Offers Loop */}
        <div className="space-y-6">
          {offers?.data?.offers.length > 0 ? (
            <div className="relative">
              {/* Subtle Label for Content */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-[#800000]/10"></div>
                <span className="text-[10px] font-black text-[#800000] uppercase tracking-[0.3em] bg-white px-4 py-1 rounded-full border border-[#800000]/5 shadow-sm">
                  Available Vouchers
                </span>
                <div className="h-[1px] flex-1 bg-[#800000]/10"></div>
              </div>

              <LazyLoadingOffers
                initialOffers={offers?.data?.offers}
                companyId={company_id}
                merchantId={merchant_id}
                awaited_p_id={awaited_p_id}
                mer_slug_type={slug_type}
                mer_slug={store_slug}
                offerBanner={bannerResponse?.data?.offers}
                domain={companyDomain}
                merchantName={merchant_details?.data?.merchant_name}
                pagination={offers?.data?.pagination}
                ads_campaign={ads_campaign}
              />
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-[#800000]/10">
              <div className="text-[#800000]/20 mb-6">
                <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-400 tracking-tight">
                No active offers found for this store.
              </h3>
            </div>
          )}
        </div>

        {/* FAQs Section */}
        {merchant_details.data?.faqs.length > 0 && (
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-[#800000]/5 p-8 md:p-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-2 h-8 bg-[#800000] rounded-full"></div>
              <h3 className="text-2xl md:text-3xl font-black text-[#1A1A1A] tracking-tighter uppercase">
                Expert <span className="text-[#800000] font-serif italic lowercase tracking-normal font-normal">Insights</span> & FAQs
              </h3>
            </div>
            <div className="custom-accordion-wrapper elite-accordion">
              <Accordion defaultActiveKey="0" flush>
                {merchant_details?.data?.faqs.map((faqs, i) => (
                  <MerchantFaqsAccordion key={i} faq={faqs} index={i} />
                ))}
              </Accordion>
            </div>
          </div>
        )}

        {/* Full Description */}
        {details && details !== null && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#800000]/5 p-8 md:p-12 prose prose-slate max-w-none prose-headings:text-[#1A1A1A] prose-headings:font-black prose-a:text-[#800000]">
             <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-black text-[#800000] uppercase tracking-[0.4em]">Store Biography</span>
             </div>
            <MerchantDetailsFull details={details} />
          </div>
        )}
      </main>

      {/* --- LEFT SIDEBAR --- */}
      {/* lg:order-1 desktop par left rahega, mobile par niche chala jayega (order-2) */}
      <aside className="lg:col-span-4 order-2 lg:order-1 space-y-8">

        {/* Similar Stores */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#800000]/5 p-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDFCF0] rounded-full -mr-16 -mt-16 pointer-events-none"></div>
          
          <h4 className="text-lg font-black text-[#1A1A1A] mb-8 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-1.5 h-5 bg-[#800000] rounded-full"></span>
            Discover Similar
          </h4>
          
          {similarMerchant && (
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {similarMerchant?.slice(0, 5).map(
                (merchant: Merchant) =>
                  merchant.unique_id !== merchant_id &&
                  merchant?.merchant_name?.length < 20 && (
                    <div key={merchant.unique_id} className="hover:scale-[1.05] transition-all duration-500">
                      <StoreCard
                        merchant={merchant}
                        mer_slug={store_slug}
                        mer_slug_type={slug_type}
                      />
                    </div>
                  ),
              )}
            </div>
          )}
          
          <div className="mt-10 pt-6 border-t border-slate-50">
            <Link href={`/all-stores/A`} className="flex items-center justify-between group no-underline bg-[#FDFCF0] p-4 rounded-2xl border border-[#800000]/5 transition-all hover:bg-[#800000] hover:text-white">
              <span className="font-black text-[10px] uppercase tracking-widest transition-colors group-hover:text-white text-[#1A1A1A]">
                Explore Gallery
              </span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Category & Tags */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-[#800000]/5 p-8">
          <div className="elite-sidebar-styles">
            <CategorySidebar categories={categories.data} cat_slug={category_slug} slug_type={slug_type} />
            <div className="my-8 border-t border-slate-50"></div>
            <TagsSidebar company_id={company_id} merchant_id={merchant_id} />
          </div>
        </div>

        {/* Banner */}
        {offers.data?.offers?.length > 0 && filteredVerticalBanners?.length > 0 && (
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <VerticalOfferBanner
              bannerResponse={bannerResponse?.data?.offers}
              domain={companyDomain}
              mer_slug={store_slug}
              slug_type={slug_type}
              merchantId={merchant_id}
              companyId={company_id}
              pagination={bannerResponse?.data?.pagination}
            />
          </div>
        )}
      </aside>

    </div>
  </div>
</section>

      <MerchantSchemaScripts
        domain={companyDomain}
        mer_slug={store_slug}
        slug_type={slug_type}
        merchant_detail={merchant_details}
      />
    </div>
  );
};

export default OffersPage;
