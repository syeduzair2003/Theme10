import React from "react";
import Image from "next/image";
import Link from "next/link";
import { apiGetMerchantsAlphabetically } from "@/apis/merchant";
import cookieService from "@/services/CookiesService";
import MerchantCard from "./MerchantCard";
import { getMerchantHref } from "@/constants/hooks";
import { MerchantResponse } from "@/services/dataTypes";
import { notFound } from "next/navigation";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import MerchantPageSchema from "@/components/shared/SchemaScripts/MerchantPageSchema";
import Pagination from "./Pagination";
import { Reveal, ScaleReveal } from "./MotionWrapper";

interface Props {
  store_slug: string;
  slug_type: string;
  company_id: string;
  slug: string;
  page?: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 32;

const AllStoresPage = async ({
  store_slug,
  slug_type,
  company_id,
  slug,
  page,
}: Props) => {
  // --- CORE LOGIC (FULL & SECURE) ---
  const cookieData = await cookieService.get("domain");
  const companyDomain = cookieData?.domain || "";
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const apiSlug = slug === "other" ? "#" : slug;

  if (slug.length > 1 && slug !== "other") {
    return notFound();
  }

  const response = await apiGetMerchantsAlphabetically(
    company_id,
    apiSlug,
    PAGE_SIZE,
    currentPage,
  );
  const merchantData: MerchantResponse = response?.data;

  const filteredMerchants =
    slug === "other"
      ? merchantData?.merchants?.filter(
          (item) =>
            !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()),
        )
      : merchantData?.merchants?.filter((item) =>
          item.merchant_name?.toUpperCase().startsWith(slug.toUpperCase()),
        );

  const totalPages = merchantData?.pagination.last_page;
  const paginatedMerchants = (filteredMerchants || [])
    .sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
    .slice(0, PAGE_SIZE);

  return (
    <main className="min-h-screen bg-[#FDFBE7] pb-16">
      {/* --- HERO BANNER SECTION (Exact Event Page Style Card) --- */}
      {/* --- HERO BANNER SECTION (Compact Width & Top Overflow) --- */}
      <section className="relative w-full">
        <Reveal y={0}>
          {/* max-w-7xl lagaya hai taaki width kam ho jaye aur mx-auto se center mein rahay */}
          <div className="max-w-6xl mx-auto relative overflow-hidden bg-[#FDFBE7] rounded-b-[2.5rem] md:rounded-b-[4.5rem] border-x border-b-2 border-[#EADDCA]/80 pt-32 pb-14 md:pt-30 md:pb-12 shadow-sm px-8 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              
              <div className="max-w-xl text-center md:text-left mb-6">
                {/* --- BREADCRUMBS --- */}
                <nav className="flex justify-center md:justify-start mb-4" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
                    <li>
                      <Link href="/" className="no-underline hover:text-[#800000] transition-colors">HOME</Link>
                    </li>
                    <span className="text-[#800000] opacity-40">•</span>
                    <li>
                      <Link href="/all-stores/A" className="no-underline hover:text-[#800000] transition-colors">ALL STORES</Link>
                    </li>
                    <span className="text-[#800000] opacity-40">•</span>
                    <li className="text-[#800000]">{slug}</li>
                  </ol>
                </nav>

                <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Popular <br className="hidden md:block" />
                  <span className="text-[#800000]">Merchants</span>
                </h1>
              </div>

              {/* --- RIGHT SIDE IMAGE (Geometric Layers) --- */}
              <div className="hidden md:block relative w-60 h-60 lg:w-64 lg:h-64 group">
                <div className="absolute inset-0 bg-[#EADDCA] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-[1.5rem] rounded-bl-[1.5rem] transform rotate-6 group-hover:rotate-12 transition-transform duration-700 shadow-inner" />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-tl-[1.5rem] rounded-br-[1.5rem] rounded-tr-[3rem] rounded-bl-[3rem] border-2 border-white transform -rotate-3 group-hover:-rotate-6 transition-transform duration-700 shadow-lg" />
                <div className="absolute inset-3 bg-white rounded-[2rem] shadow-sm flex items-center justify-center overflow-hidden border-4 border-white z-10 group-hover:scale-105 transition-transform duration-500 p-6">
                  <Image
                    src="/themes/Theme_3/images/banner-illus-8.png"
                    alt="Store illustration"
                    fill
                    className="object-contain p-2"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

     {/* ALPHABET NAVIGATION */}
<div className="mt-16 mb-12 container mx-auto px-4 flex flex-col items-center">
  <Reveal y={10}>
    <div className="text-center mb-8 group/head">
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-[2px] bg-[#800000] mb-4 transition-all duration-500 group-hover/head:w-20" />
        <h2 className="flex flex-col items-center gap-1">
          <span className="text-[10px] md:text-xl font-light text-slate-500 tracking-[0.15em] uppercase">
            Find Coupons by
          </span>
          <span className="text-lg md:text-3xl font-black text-[#1A1A1A] tracking-tighter uppercase italic leading-none">
            Store <span className="not-italic text-[#800000]">— A-Z Store List</span>
          </span>
        </h2>
      </div>
    </div>
  </Reveal>

  <Reveal y={20} delay={0.2}>
    <div className="w-full flex justify-center group/nav">
      <div 
        className="
          flex items-center bg-white/95 backdrop-blur-md p-1.5 border border-[#EADDCA] shadow-lg transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          
          /* Mobile View */
          w-[92%] max-w-[350px] overflow-x-auto no-scrollbar rounded-full px-3
          
          /* Desktop (md) View Fix: 'group-hover/nav' use kiya hai specifically */
          md:w-fit md:max-w-[62px] md:group-hover/nav:max-w-[1200px] md:overflow-hidden md:px-2
        "
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* SECTION 1: ACTIVE LETTER */}
        <div className="flex items-center shrink-0">
          {ALPHABETS.concat("#").map((alpha) => {
            const isOther = alpha === "#";
            const currentSlug = isOther ? "other" : alpha;
            const isActive = slug.toUpperCase() === currentSlug.toUpperCase();
            
            if (isActive) {
              return (
                <div key={alpha} className="flex items-center shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-full text-[11px] md:text-xs font-black bg-[#800000] text-white shadow-md">
                    {alpha}
                  </div>
                  {/* Desktop Divider - Fades on hover */}
                  <div className="hidden md:block w-[1px] h-4 bg-[#EADDCA] mx-3 transition-opacity duration-300 group-hover/nav:opacity-0" />
                  {/* Mobile Spacer */}
                  <div className="md:hidden w-3 h-4 border-r border-[#EADDCA]/50 mx-2" />
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* SECTION 2: OTHER ALPHABETS */}
        <div className="
          flex items-center gap-1
          /* Mobile: Hamesha visible */
          opacity-100 pr-4
          /* Desktop: Hover reveal logic with group-hover/nav */
          md:opacity-0 md:group-hover/nav:opacity-100 transition-opacity duration-500 delay-150
        ">
          {ALPHABETS.map((alpha) => {
            const isActive = slug.toUpperCase() === alpha.toUpperCase();
            if (isActive) return null;

            return (
              <Link
                key={alpha}
                href={`/all-stores/${alpha}`}
                className="no-underline w-7 h-7 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center rounded-full text-[10px] md:text-[11px] font-black text-slate-400 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
              >
                {alpha}
              </Link>
            );
          })}
          
          {slug.toLowerCase() !== "other" && (
            <Link
              href={`/all-stores/other`}
              className="no-underline w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full text-[10px] md:text-xs font-black text-slate-400 hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              #
            </Link>
          )}
        </div>
      </div>
    </div>
  </Reveal>
</div>

      {/* --- STORES GRID --- */}
      <div className="container mx-auto px-6">
        {paginatedMerchants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {paginatedMerchants.map((item, i) => (
              <ScaleReveal key={i} delay={(i % 12) * 0.05}>
                <MerchantCard
                  merchant_name={item?.merchant_name}
                  merchant_logo={item?.merchant_logo || ""}
                  companyDomain={companyDomain}
                  merchant_href={getMerchantHref(item, store_slug, slug_type)}
                />
              </ScaleReveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-20 bg-white/40 rounded-[2.5rem] border border-[#EADDCA]/60">
              <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">No merchants found</h3>
            </div>
          </Reveal>
        )}

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <Reveal delay={0.4}>
            <div className="mt-16 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={`/all-stores/${slug}`}
              />
            </div>
          </Reveal>
        )}
      </div>

      {/* --- SCHEMA --- */}
      <MerchantPageSchema
        PAGE_SIZE={PAGE_SIZE}
        apiSlug={apiSlug}
        company_id={company_id}
        domain={companyDomain}
        currentPage={currentPage}
        mer_slug={store_slug}
        slug_type={slug_type}
      />
    </main>
  );
};

export default AllStoresPage;