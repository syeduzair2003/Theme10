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
      {/* --- THE ELITE SIGNATURE HERO (PRO UPDATED) --- */}
      <section className="relative bg-[#FDFCF0] pt-36 pb-20 overflow-hidden border-b border-[#800000]/10">
        {/* Luxury Ambient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#800000]/[0.03] rounded-full blur-[140px] -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D1C7A7]/[0.15] rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-10">
              <nav className="inline-flex items-center gap-4 text-[9px] font-black tracking-[0.3em] uppercase text-slate-400">
                <Link
                  href="/"
                  className="hover:text-[#800000] transition-colors"
                >
                  Home
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
                <Link
                  href="/all-stores/A"
                  className="hover:text-[#800000] transition-colors uppercase"
                >
                  {store_slug}
                </Link>
                <div className="w-1.5 h-1.5 rounded-full bg-[#800000]"></div>
                <span className="text-[#800000]">
                  {merchant_details?.data?.merchant_name}
                </span>
              </nav>

              {/* Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-black text-[#1A1A1A] leading-[1.1] tracking-tighter uppercase">
                  {heading ? (
                    discardHTMLTags(heading)
                  ) : (
                    <>
                      Exclusive{" "}
                      <span className="text-[#800000] font-serif italic lowercase tracking-normal font-normal">
                        Savings
                      </span>{" "}
                      <br />
                      For {merchant_details?.data?.merchant_name}
                    </>
                  )}
                </h1>

                <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-md italic border-l-2 border-[#800000]/10 pl-6">
                  Hand-curated selection of premium vouchers and seasonal offers
                  for an optimized shopping experience.
                </p>
              </div>
            </div>

            {/* RIGHT Grid */}
            <div className="w-full lg:w-1/2 relative">
              <div className="grid grid-cols-2 gap-5">
                {/* Card 1: Offers */}
                <div className="bg-white p-8 rounded-[2rem] border border-[#800000]/5 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between h-40 hover:border-[#800000]/20 transition-all duration-500 group">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-[#800000] transition-colors">
                    Total Offers
                  </p>
                  <div className="space-y-1">
                    <h3 className="text-5xl font-black text-[#1A1A1A] tracking-tighter">
                      {offers?.data?.offers.length || "0"}
                    </h3>
                    <p className="text-[9px] font-bold text-[#800000] uppercase tracking-tighter">
                      Active Today
                    </p>
                  </div>
                </div>

                {/* Card 2: Status */}
                <div className="bg-white p-8 rounded-[2rem] border border-[#800000]/5 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between h-40">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    Feed Status
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100 text-[9px] font-black w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      VERIFIED
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 italic tracking-tight">
                      Security Guaranteed
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="col-span-2 bg-[#1A1A1A] p-8 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] relative overflow-hidden flex items-center justify-between group">
                  <div className="absolute right-0 bottom-0 p-4 opacity-[0.03] text-8xl font-black text-white italic select-none">
                    {merchant_details?.data?.merchant_name?.charAt(0)}
                  </div>

                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-20 h-20 bg-white rounded-2xl p-3 shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                      {merchant_details?.data?.merchant_logo ? (
                        <img
                          src={merchant_details.data.merchant_logo}
                          alt={merchant_details.data.merchant_name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-[#800000] font-serif italic text-4xl">
                          {merchant_details?.data?.merchant_name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-white font-black text-xl tracking-tight uppercase">
                        {merchant_details?.data?.merchant_name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className="w-1 h-1 rounded-full bg-[#800000]"
                            ></div>
                          ))}
                        </div>
                        <span className="text-slate-400 text-[9px] font-black tracking-[0.3em] uppercase">
                          Verified Partner
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block relative z-10 text-right border-l border-white/10 pl-8">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">
                      Trust Score
                    </p>
                    <p className="text-3xl font-black text-[#D1C7A7]">
                      {getRandomRating(merchant_details?.data?.rating)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* --- LEFT SIDEBAR --- */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Merchant Logo Card */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 flex flex-col items-center">
                  <div className="relative w-full aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-6 mb-6">
                    <Image
                      className="object-contain"
                      alt={`${merchant_details?.data?.merchant_name} logo`}
                      src={getBaseImageUrl(
                        companyDomain,
                        merchant_details?.data?.merchant_logo,
                        "",
                      )}
                      fill
                      sizes="(max-w-768px) 100vw, 300px"
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
                    <span className="text-blue-700 font-black text-xl">
                      {getRandomRating(merchant_details?.data?.rating)}
                    </span>
                    <div className="flex text-amber-400 text-sm">
                      <RenderRating
                        rating={getRandomRating(merchant_details?.data?.rating)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar Stores */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                  Similar Stores
                </h4>
                {similarMerchant && (
                  <div className="grid grid-cols-2 gap-4">
                    {similarMerchant?.slice(0, 5).map(
                      (merchant: Merchant) =>
                        merchant.unique_id !== merchant_id &&
                        merchant?.merchant_name?.length < 20 && (
                          <div
                            key={merchant.unique_id}
                            className="hover:scale-[1.02] transition-transform"
                          >
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
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href={`/all-stores/A`}
                    className="flex items-center justify-between group no-underline"
                  >
                    <span className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">
                      See All Stores
                    </span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                <CategorySidebar
                  categories={categories.data}
                  cat_slug={category_slug}
                  slug_type={slug_type}
                />
                <div className="my-8 border-t border-slate-100"></div>
                <TagsSidebar
                  company_id={company_id}
                  merchant_id={merchant_id}
                />
              </div>

              {/* Banner */}
              {offers.data?.offers?.length > 0 &&
                filteredVerticalBanners?.length > 0 && (
                  <div className="rounded-[2rem] overflow-hidden shadow-lg">
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

            {/* --- RIGHT CONTENT AREA --- */}
            <main className="lg:col-span-8 space-y-8">
              {/* Short Description Card */}
              {details && details !== null && discardHTMLTags(details) && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                  <h5 className="text-lg font-bold text-slate-900 mb-4">
                    Quick Information
                  </h5>
                  <div className="text-slate-600 leading-relaxed">
                    <MerchantDetailsShort details={details} />
                  </div>
                </div>
              )}

              {/* Offers Loop */}
              <div className="space-y-6">
                {offers?.data?.offers.length > 0 ? (
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
                ) : (
                  <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200">
                    <div className="text-slate-300 mb-4">
                      <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-400">
                      No active offers found for this store.
                    </h3>
                  </div>
                )}
              </div>

              {/* FAQs Section */}
              {merchant_details.data?.faqs.length > 0 && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                    {merchant_details?.data?.merchant_name} FAQs
                  </h3>
                  <div className="custom-accordion-wrapper">
                    <Accordion defaultActiveKey="0" flush>
                      {merchant_details?.data?.faqs.map((faqs, i) => (
                        <MerchantFaqsAccordion key={i} faq={faqs} index={i} />
                      ))}
                    </Accordion>
                  </div>
                </div>
              )}

              {/* Full Description / SEO Content */}
              {details && details !== null && (
                <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
                  <MerchantDetailsFull details={details} />
                </div>
              )}
            </main>
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
