import {
  apiCompanyUpdatedData,
  apiGetAllPromotion,
  apiGetPromotionCategories,
} from "@/apis/user";
import {
  cleanHtmlContent,
  extractAllOffers,
  extractFirstSentences,
  filterOfferBanners,
  getMerchantHref,
  getPromotionHref,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { MerchantWithOffers, Offer } from "@/services/dataTypes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import EventBanner from "./EventBanner";
import { faChevronRight, faCompass, faFire, faTag } from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MerchantDetailsShort from "./MerchantDetailsShort";
import Banner from "./Banner";
import MerchantDetailsFull from "./MerchantDetailsFull";
import SidebarRoundMerchantCard from "./SidebarRoundMerchantCard";
import VerticalEventOfferBanner from "./VerticalEventOfferBanner";
import OfferCardThree from "./OfferCardThree";
import { stripHtml } from "string-strip-html";
import {
  apiGetPromoOfferBanners,
  apiGetPromotionOffers,
  apiGetSubPromoBanners,
  apiGetSubPromoSuggestedMerchant,
} from "@/apis/page_optimization";
import { faGreaterThan } from "@/constants/icons";
const PromotionOffersPage = async ({ params }: { params: string }) => {
  const slug = params;
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  const [
    promotion,
    banners,
    eventMerchants,
    suggestedPromo,
    promoOfferBanners,
    promoCategories,
  ] = await Promise.all([
    apiGetPromotionOffers(companyData?.unique_id, slug).then((res) => res.data),
    apiGetSubPromoBanners(companyData?.unique_id, slug).then((res) => res.data),
    apiGetSubPromoSuggestedMerchant(companyData?.unique_id, slug).then(
      (res) => res.data,
    ),
    apiGetAllPromotion(companyDomain.domain).then((res) => res.data),
    apiGetPromoOfferBanners(companyData?.unique_id, slug).then(
      (res) => res.data,
    ),
    apiGetPromotionCategories(companyData?.unique_id, slug).then(
      (res) => res.data,
    ),
  ]);

  if (!promotion) return notFound();

  const suggestedCategories = promoCategories?.selected_categories;
  const suggestedPromotions = suggestedPromo?.filter(
    (promo) => promo.slug !== slug,
  );
  const offerBanners = extractAllOffers(promoOfferBanners);
  const filteredVerticalBanners = filterOfferBanners(
    offerBanners || [],
    50,
    2000,
    65,
    2000,
  );
  const filteredOfferBanners = filterOfferBanners(
    offerBanners || [],
    250,
    600,
    100,
    200,
  );

  const allOffers: { offer: Offer; merchant: MerchantWithOffers }[] =
    promotion?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({ offer, merchant })),
    ) || [];

  const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || "");
  const plainDesc = stripHtml(cleanDesc).result;
  const shortDesc = extractFirstSentences(plainDesc);
  const showFullDetailsSection = plainDesc.length > shortDesc.length + 5;

  return (
    <main className="bg-[#fffde0] min-h-screen font-sans">
      <section className="bg-[#fffde0] pt-12 pb-16">
        <div className="container mx-auto px-6">
          {/* HERO SECTION */}
          <div
            className="relative bg-[#FDFBE7] rounded-[3.5rem] pt-12 pb-20 px-10 md:px-16 
                    border border-[#EADDCA] border-b-[6px] border-b-[#800000] 
                    shadow-[0_25px_60px_-15px_rgba(128,0,0,0.08)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-white/30 to-transparent pointer-events-none" />

            {/* CONTENT SECTION */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Breadcrumbs */}
              <nav className="mb-10 w-full border-b border-[#EADDCA]/60 pb-6">
                <ol className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  <li>
                    <Link
                      href="/"
                      className="no-underline hover:text-[#800000] transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="opacity-30">•</li>
                  <li>
                    <Link
                      href={`/${companyData?.promotion_slug}`}
                      className="no-underline hover:text-[#800000] transition-colors"
                    >
                      Promotions
                    </Link>
                  </li>
                </ol>
              </nav>

              {/* Title Section */}
              <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[1.05] tracking-tighter uppercase italic">
                  {promotion?.promotion?.name}
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-6 mt-8 border-t border-[#EADDCA]/60">
                  {/* Status Badge */}
                  <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#800000]/10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#800000]">
                      Active Campaign
                    </span>
                  </div>

                  <div className="hidden md:block h-6 w-px bg-[#EADDCA]"></div>

                  <div className="flex items-center gap-2 text-[#1A1A1A]/70 text-[11px] font-bold uppercase tracking-[0.2em] bg-[#EADDCA]/30 px-4 py-1.5 rounded-full">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 10.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 3v3h2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>{allOffers.length} Deals Found</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EVENT BANNER SECTION */}
          {banners?.length > 0 && (
            <div className="mt-12 w-full rounded-[3rem] overflow-hidden border border-[#EADDCA] shadow-2xl mb-12">
              <EventBanner
                domain={companyDomain.domain}
                banners={banners}
                eventName={promotion?.promotion?.name}
              />
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-6 -mt-10 relative z-20 pb-24">
        <div className="flex flex-col xl:flex-row-reverse gap-12">
          <div className="xl:w-3/4 flex flex-col gap-12">
            {/* Header Info Card */}
            {promotion?.promotion?.description && (
              <div className="bg-white/80 backdrop-blur-md p-8 rounded-[3rem] border border-[#EADDCA] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                  <MerchantDetailsShort
                    details={promotion?.promotion?.description}
                  />
                </div>
              </div>
            )}

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allOffers?.map((item, index) => {
                const isSixth = (index + 1) % 6 === 0;
                const isTwelfth = (index + 1) % 12 === 0;
                const merchantStart = Math.floor(index / 12) * 4;
                const currentMerchants = eventMerchants?.slice(
                  merchantStart,
                  merchantStart + 4,
                );

                return (
                  <React.Fragment key={index}>
                    <div className="transform transition-all duration-500 hover:scale-[1.02]">
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

                    {/* Partner Brands */}
                    {isSixth && !isTwelfth && currentMerchants?.length > 0 && (
                      <div className="col-span-full py-12 px-10 bg-[#FDFBE7] rounded-[3.5rem] border border-[#EADDCA]">
                        <div className="flex items-center justify-between mb-10">
                          <h4 className="text-slate-900 font-black text-xl uppercase tracking-tighter">
                            Premium{" "}
                            <span className="text-[#800000]">Partners</span>
                          </h4>
                          <FontAwesomeIcon
                            icon={faFire}
                            className="text-[#800000] animate-pulse"
                          />
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                          {currentMerchants.map((m, i) => (
                            <SidebarRoundMerchantCard
                              key={i}
                              merchant={m}
                              merSlug={companyData?.store_slug}
                              slugType={companyData?.slug_type}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ads Banner */}
                    {isTwelfth &&
                      filteredOfferBanners[Math.floor(index / 12)] && (
                        <div className="col-span-full rounded-[3rem] overflow-hidden shadow-2xl my-6 border-4 border-white">
                          <Banner
                            data={filteredOfferBanners[Math.floor(index / 12)]}
                            height={120}
                            domain={companyDomain.domain}
                            mer_slug={companyData?.store_slug}
                            slug_type={companyData?.slug_type}
                          />
                        </div>
                      )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* SEO/Details Bottom Section */}
            {showFullDetailsSection && (
              <div className="bg-[#1A1A1A] text-slate-300 p-12 md:p-16 rounded-[4rem] shadow-2xl">
                <h2 className="text-white text-3xl font-black mb-8 italic uppercase">
                  About this <span className="text-[#800000]">Campaign</span>
                </h2>
                <div className="opacity-80">
                  <MerchantDetailsFull
                    details={promotion?.promotion?.description}
                  />
                </div>
              </div>
            )}
          </div>

          {/* LEFT: Sidebar */}
          <aside className="xl:w-1/4">
            <div className="sticky top-10 space-y-10">
              {/* Categories Card */}
              {suggestedCategories?.length > 0 && (
                <div className="bg-white/70 backdrop-blur-xl border border-[#EADDCA] rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                  <div className="px-8 py-6 relative bg-[#FDFBE7]/50">
                    <h4 className="text-slate-900 font-black text-[13px] uppercase tracking-[0.2em]">
                      Explore Categories
                    </h4>
                    <div className="absolute bottom-0 left-8 w-12 h-1 bg-[#800000] rounded-full"></div>
                  </div>

                  <div className="p-4 space-y-2">
                    {suggestedCategories.map((cat, i) => (
                      <Link
                        key={i}
                        href={`/${cat?.url}`}
                        className="no-underline group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-500 hover:bg-[#800000] hover:-translate-x-1 border border-transparent"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-white transition-all duration-300"></div>
                          <span className="text-slate-600 group-hover:text-white text-[14px] font-bold transition-colors">
                            {cat?.category_name}
                          </span>
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="text-[10px] text-white"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Vertical Banners */}
              {filteredVerticalBanners?.length > 0 && (
                <div className="group rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl">
                  <VerticalEventOfferBanner
                    bannerResponse={filteredVerticalBanners}
                    domain={companyDomain.domain}
                    mer_slug={companyData?.store_slug}
                    slug_type={companyData?.slug_type}
                  />
                </div>
              )}

              {/* Suggested Promos Card */}
              {suggestedPromotions?.length > 0 && (
                <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] text-white shadow-2xl relative group overflow-hidden">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className="absolute -top-6 -right-6 text-9xl text-white/5 group-hover:text-[#800000]/20 transition-all duration-1000"
                  />
                  <h4 className="text-xl font-black mb-8 relative z-10 italic uppercase">
                    Handpicked <br />
                    <span className="text-[#800000]">Promotions</span>
                  </h4>
                  <div className="space-y-3 relative z-10">
                    {suggestedPromotions.map((promo, i) => (
                      <Link
                        key={i}
                        href={getPromotionHref(
                          promo,
                          companyData?.promotion_slug,
                        )}
                        className="no-underline group/item relative flex items-center justify-between p-4 bg-white/5 rounded-2xl transition-all duration-300 border border-white/5 hover:border-[#800000]/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#800000]"></div>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300 group-hover/item:text-white transition-colors truncate max-w-[180px]">
                            {promo?.name}
                          </span>
                        </div>
                        <FontAwesomeIcon
                          icon={faGreaterThan}
                          className="text-[8px] text-[#800000] opacity-0 group-hover/item:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default PromotionOffersPage;
