import React from 'react'
import { apiGetMetaData } from '@/apis/user';
import { apiGetSimilarMerchants, apiMerchantDetails } from '@/apis/merchant';
import { Merchant } from '@/services/dataTypes';
import { apiOfferBanners, apiSpecificOffers } from '@/apis/offers';
import CategorySidebar from './CategorySidebar';
import TagsSidebar from './TagsSidebar';
import LazyLoadingOffers from './LazyLoadingOffers';
import Link from 'next/link';
import { discardHTMLTags, filterOfferBanners, getBaseImageUrl, getLastUpdateDate, getMerchantHref, splitHeading, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import VerticalOfferBanner from './VerticalOfferBanner';
import Image from 'next/image';
import { apiNavCategory } from '@/apis/page_optimization';
import Footer from './Footer';
import Header from './Header';

interface Props {
  merchant_id: string;
  slug: string[];
  product_id: any;
  company_id: string;
  store_slug: string;
  category_slug: string;
  slug_type: string;
  ads_campaign: any;
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

  const [first, second] = splitHeading(merchant_details?.data?.merchant_name)

  return (
    <>
      <Header
        title={first}
        subtitle={second}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: store_slug, href: '/all-stores/A' },
          { label: merchant_details?.data?.merchant_name }
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-[#FBFDFF] min-h-screen -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* MAIN CONTENT - Shows first on mobile */}
            <main className="flex-1 order-1 lg:order-2">
              <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_40px_80px_-20px_rgba(15,23,42,0.03)] border border-slate-50 p-4 md:p-6 lg:p-8">
                <header className="mb-6 md:mb-8 border-b border-slate-50 pb-4 md:pb-6">
                  <div className="text-left">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter mb-2">
                      Available <span className="text-indigo-600">Inventory</span>
                    </h2>
                    <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                      Digital Vouchers
                    </p>
                  </div>

                  {offers?.data?.offers.length > 0 && (
                    <div className="inline-flex items-center px-3 py-1.5 bg-slate-900 rounded-lg shadow-lg shadow-slate-200 mt-4">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      <p className="text-[9px] font-black text-white uppercase tracking-widest">
                        Live
                      </p>
                    </div>
                  )}
                </header>

                <div className="space-y-6 md:space-y-8">
                  {offers?.data?.offers.length > 0 ? (
                    <LazyLoadingOffers
                      initialOffers={offers?.data?.offers}
                      companyId={company_id}
                      merchantId={merchant_id}
                      awaited_p_id={awaited_p_id}
                      mer_slug_type={slug_type}
                      mer_slug={store_slug}
                      domain={companyDomain}
                      merchantName={merchant_details?.data?.merchant_name}
                      pagination={offers?.data?.pagination} offerBanner={[]} ads_campaign={false} />
                  ) : (
                    <div className="py-16 md:py-24 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 flex flex-col items-center justify-center">
                      <div className="w-12 md:w-16 h-1 bg-indigo-500 mb-4 md:mb-6 rounded-full"></div>
                      <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-widest">No Active Coupons</h3>
                    </div>
                  )}
                </div>
              </div>
            </main>

            {/* SIDEBAR - Shows after main content on mobile */}
            <aside className="lg:w-64 lg:flex-shrink-0 space-y-6 order-2 lg:order-1">
              {/* Merchant Logo Card */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05)] border border-slate-100 p-4 md:p-6 group">
                <div className="relative aspect-square w-full flex items-center justify-center bg-slate-50 rounded-lg md:rounded-xl border border-slate-50 group-hover:bg-indigo-50/30 transition-all duration-500 overflow-hidden">
                  <Image
                    className="group-hover:scale-105 transition-transform duration-700 p-4 md:p-6"
                    alt={merchant_details?.data?.merchant_name}
                    src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                    width={180}
                    height={120}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="mt-4 md:mt-6">
                  <h3 className="text-slate-900 font-black uppercase text-xs md:text-sm tracking-tight mb-1">
                    {merchant_details?.data?.merchant_name}
                  </h3>
                  <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Authorized Retailer
                  </p>
                </div>
              </div>

              {similarMerchant && (
                <div className="pl-0 md:pl-2">
                  <h4 className="text-[12px] md:text-[12px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-4 md:mb-6">
                    Similar Stores
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {similarMerchant?.slice(0, 5).map((merchant: Merchant) =>
                      merchant.unique_id !== merchant_id && (
                        <Link href={getMerchantHref(merchant, store_slug, slug_type)} key={merchant.unique_id} className="group flex items-center gap-3">
                          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 p-2 md:p-2.5 flex items-center justify-center border border-slate-100 shadow-inner">
                            <Image
                              src={getBaseImageUrl(companyDomain, merchant?.merchant_logo, "")}
                              alt={merchant?.merchant_name}
                              width={32}
                              height={32}
                              className="object-contain transition-all"
                            />
                          </div>
                          <span className="text-[10px] md:text-xs font-black text-slate-500 group-hover:text-slate-900 transition-colors uppercase line-clamp-2">
                            {merchant?.merchant_name}
                          </span>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Categories */}
              <CategorySidebar categories={categories.data} cat_slug={category_slug} slug_type={slug_type} />

              {/* Tags Sidebar */}
              <TagsSidebar company_id={company_id} merchant_id={merchant_id} />

              {/* Banner Offers */}
              {offers.data?.offers?.length > 0 && filteredVerticalBanners?.length > 0 && (
                <VerticalOfferBanner bannerResponse={bannerResponse?.data?.offers} domain={companyDomain} mer_slug={store_slug} slug_type={slug_type} merchantId={merchant_id} companyId={company_id} pagination={bannerResponse?.data?.pagination} />
              )}
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default OffersPage
