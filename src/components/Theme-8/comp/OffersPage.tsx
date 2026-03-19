import React from 'react'
import { apiGetMetaData } from '@/apis/user';
import { apiGetSimilarMerchants, apiMerchantDetails } from '@/apis/merchant';
import { Merchant } from '@/services/dataTypes';
import { apiOfferBanners, apiSpecificOffers } from '@/apis/offers';
import CategorySidebar from './CategorySidebar';
import TagsSidebar from './TagsSidebar';
import LazyLoadingOffers from './LazyLoadingOffers';
import Link from 'next/link';
import RenderRating from './RenderRating';
import StoreCard from './StoreCard';
import { discardHTMLTags, filterOfferBanners, getBaseImageUrl, getLastUpdateDate, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import VerticalOfferBanner from './VerticalOfferBanner';
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import Accordion from 'react-bootstrap/Accordion'; 
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import Image from 'next/image';
import { apiNavCategory } from '@/apis/page_optimization';
import { faArrowRight, faGreaterThan } from '@/constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MerchantSchemaScripts from '@/components/shared/SchemaScripts/MerchantSchemaScripts';

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

const OffersPage = async ({ merchant_id, product_id, slug, company_id, store_slug, category_slug, slug_type, ads_campaign }: Props) => {
  const [
    awaited_p_id,
    bannerResponse,
    categories,
    offers,
    similarMerchantsRes,
    cookieDomain,
    metaRes,
    merchantDetailsRes
  ] = await Promise.all([
    product_id,
    apiOfferBanners(merchant_id, company_id),
    apiNavCategory(company_id),
    apiSpecificOffers(merchant_id, company_id, 1),
    apiGetSimilarMerchants(company_id, merchant_id),
    cookieService.get("domain"),
    apiGetMetaData(JSON.stringify(slug), (await cookieService.get("domain")).domain),
    apiMerchantDetails(merchant_id, company_id)
  ]);

  const companyDomain = cookieDomain.domain;
  const similarMerchant = similarMerchantsRes?.data;
  const filteredVerticalBanners = filterOfferBanners(bannerResponse?.data?.offers || [], 10, 2000, 10, 2000);

  const meta = metaRes?.data;
  const merchant_details = {
    ...merchantDetailsRes,
    mer_meta_title: meta?.meta_title,
    mer_meta_desc: meta?.meta_description,
  };
  const [heading, details] = splitHeadingFromDetails(merchant_details?.data?.merchant_detail);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
{/* --- PREMIUM HERO SECTION --- */}
{/* Added 'mt-[-80px]' if header is absolute, but safe way is extra padding 'pt-32' */}
<section className="relative bg-[#1a212e] border-b border-gray-100 pt-32 pb-16 overflow-hidden">
  
  {/* Background Decorative Elements - Subtle glow */}
  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-[120px] -mr-64 -mt-64 z-0"></div>
  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-50/40 rounded-full blur-[100px] -ml-32 -mb-32 z-0"></div>

  <div className="container mx-auto px-4 relative z-10">
    
    {/* Breadcrumbs: Fixed overlap with pt-32 above */}
    <nav className="inline-flex items-center bg-white backdrop-blur-md border border-gray-100 px-3 py-3 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.04)] mb-10 transition-all hover:shadow-md">
      <ol className="flex items-center gap-3 text-[10px] sm:text-[11px] font-black tracking-[0.15em] uppercase p-0 m-0">
        <li>
          <Link href="/" className="text-gray-400 hover:text-blue-600 transition-colors no-underline">Home</Link>
        </li>
        <li className="text-gray-300">
             <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2" />
        </li>
        <li>
          <Link href="/all-stores/A" className="text-gray-400 hover:text-blue-600 transition-colors no-underline capitalize">{store_slug}</Link>
        </li>
        <li className="text-gray-300">
             <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2" />
        </li>
        <li className="text-blue-600 font-extrabold truncate max-w-[120px] sm:max-w-[200px]">
          {merchant_details?.data?.merchant_name}
        </li>
      </ol>
    </nav>

    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
      <div className="max-w-4xl">
        {/* Main Title: Enhanced Line Height */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight mb-8">
          {heading ? (
            discardHTMLTags(heading)
          ) : (
            <>
              Save with <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {merchant_details?.data?.merchant_name}
                <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-600/10 rounded-full"></span>
              </span> Promo Codes
            </>
          )}
        </h1>

        {/* Dynamic Trust Badges: More Spacing */}
        {/* <div className="flex flex-wrap items-center gap-3">
          <div className="group flex items-center gap-2.5 bg-white text-emerald-700 px-4 py-2.5 rounded-xl border border-emerald-100 text-xs font-black shadow-sm transition-all hover:bg-emerald-50">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            VERIFIED TODAY
          </div>
          
          <div className="flex items-center gap-2.5 bg-white text-blue-700 px-4 py-2.5 rounded-xl border border-blue-100 text-xs font-black shadow-sm transition-all hover:bg-blue-50">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            TOP DISCOUNT APPLIED
          </div>

          <div className="flex items-center gap-2 ml-2 text-gray-400 text-[10px] font-bold tracking-widest">
             <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
             UPDATED: <span className="text-gray-900 underline decoration-blue-200 underline-offset-4">{getLastUpdateDate(0)}</span>
          </div>
        </div> */}
      </div>

      {/* Quick Stats: Enhanced Floating Effect */}
      <div className="flex items-center gap-4 sm:gap-8 bg-white backdrop-blur-xl p-6 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] transform transition hover:-translate-y-1">
         <div className="text-center px-2 sm:px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Offers</p>
            <p className="text-3xl font-black text-slate-900">{offers?.data?.offers.length || "0"}</p>
         </div>
         <div className="w-px h-12 bg-gray-100"></div>
         <div className="text-center px-2 sm:px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Rating</p>
            <p className="text-3xl font-black text-blue-600">{getRandomRating(merchant_details?.data?.rating)}</p>
         </div>
         <div className="w-px h-12 bg-gray-100"></div>
         <div className="text-center px-2 sm:px-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Status</p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-black text-emerald-600 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                ACTIVE
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
              {/* Merchant Logo & Rating Card */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-8 flex flex-col items-center">
                  <div className="relative w-full aspect-video bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-6 mb-6">
                    <Image 
                      className="object-contain" 
                      alt={`${merchant_details?.data?.merchant_name} logo`}
                      src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                      fill
                      sizes="(max-w-768px) 100vw, 300px"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-100">
                    <span className="text-blue-700 font-black text-xl">
                      {getRandomRating(merchant_details?.data?.rating)}
                    </span>
                    <div className="flex text-amber-400 text-sm">
                      <RenderRating rating={getRandomRating(merchant_details?.data?.rating)} />
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
                    {similarMerchant?.slice(0, 5).map((merchant: Merchant) =>
                      merchant.unique_id !== merchant_id && merchant?.merchant_name?.length < 20 && (
                        <div key={merchant.unique_id} className="hover:scale-[1.02] transition-transform">
                          <StoreCard
                            merchant={merchant}
                            mer_slug={store_slug}
                            mer_slug_type={slug_type}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link href={`/all-stores/A`} className="flex items-center justify-between group no-underline">
                    <span className="text-slate-900 font-bold group-hover:text-blue-600 transition-colors">See All Stores</span>
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8">
                <CategorySidebar categories={categories.data} cat_slug={category_slug} slug_type={slug_type} />
                <div className="my-8 border-t border-slate-100"></div>
                <TagsSidebar company_id={company_id} merchant_id={merchant_id} />
              </div>

              {/* Banner */}
              {offers.data?.offers?.length > 0 && filteredVerticalBanners?.length > 0 && (
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
                  <h5 className="text-lg font-bold text-slate-900 mb-4">Quick Information</h5>
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
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-400">No active offers found for this store.</h3>
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
  )
}

export default OffersPage