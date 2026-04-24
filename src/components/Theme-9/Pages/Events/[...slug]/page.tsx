import {
  apiGetEventOfferBanners,
  apiGetEventSuggestedMerchants,
} from "@/apis/offers";
import {
  apiCategoryWithSub,
  apiCompanyUpdatedData,
  apiGetAllEvents,
  apiGetEventBanners,
  apiGetEventDetails,
} from "@/apis/user";
import Banner from "@/components/shared/Banner/Banners";
import SpecificEventSchema from "@/components/shared/SchemaScripts/SpecificEventSchema";
import EventBanner from "@/components/Theme-9/comp/EventBanner";
import EventOfferCard from "@/components/Theme-9/comp/EventOfferCard";
import MerchantDetailsFull from "@/components/Theme-9/comp/MerchantDetailsFull";
import MerchantDetailsShort from "@/components/Theme-9/comp/MerchantDetailsShort";
import SidebarRoundMerchantCard from "@/components/Theme-9/comp/SidebarRoundMerchantCard";
import VerticalEventOfferBanner from "@/components/Theme-9/comp/VerticalEventOfferBanner";
import {
  extractAllOffers,
  filterOfferBanners,
  getEventsHref,
  getMerchantHref,
} from "@/constants/hooks";
import {
  faChevronRight,
  faTags,
  faStore,
  faLayerGroup,
} from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cookieService from "@/services/CookiesService";
import { CategoryChild } from "@/services/dataTypes";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = Promise<{ slug: string[] }>;

const page = async ({ params }: { params: Props }) => {
  const { slug } = await params;
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  const [
    event,
    banners,
    eventMerchants,
    suggestedEvents,
    eventOfferBanners,
    suggestedCategories,
  ] = await Promise.all([
    apiGetEventDetails(companyData?.unique_id, slug[0]).then((res) => res.data),
    apiGetEventBanners(companyData?.unique_id, slug[0]).then((res) => res.data),
    apiGetEventSuggestedMerchants(companyData?.unique_id, slug[0]).then(
      (res) => res.data,
    ),
    apiGetAllEvents(companyDomain.domain).then((res) => res.data),
    apiGetEventOfferBanners(companyData?.unique_id, slug[0]).then(
      (res) => res.data,
    ),
    apiCategoryWithSub(companyData?.unique_id).then((res) => res.data),
  ]);

  if (!event) return notFound();

  const offerBanners = extractAllOffers(eventOfferBanners);
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

  const allOffers =
    event?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({ offer, merchant })),
    ) || [];

  return (
    <main className="bg-[#FCFBF4] min-h-screen pb-16 selection:bg-[#800000]/20 selection:text-[#800000]">
      {/* Hero Banner Section */}
      {banners?.length > 0 && (
        <section className="w-full relative overflow-hidden bg-[#FDFBE7]">
          <EventBanner
            domain={companyDomain.domain}
            banners={banners}
            eventName={event?.event?.name}
          />
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.15em] mb-5 bg-white/90 backdrop-blur-md w-fit px-4 py-2 rounded-full shadow-sm border border-[#EADDCA]">
          <Link
            href="/"
            className="text-slate-400 hover:text-[#800000] transition-colors no-underline"
          >
            Home
          </Link>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[7px] text-slate-300"
          />
          <Link
            href="/events"
            className="text-slate-400 hover:text-[#800000] transition-colors no-underline"
          >
            Events
          </Link>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="text-[7px] text-slate-300"
          />
          <span className="text-[#800000]">{event?.event?.name}</span>
        </nav>

        {/* Title Section */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="space-y-2.5">
              <span className="inline-flex items-center px-3 py-1 bg-[#800000]/5 text-[#800000] rounded-full text-[9px] font-black uppercase tracking-widest border border-[#800000]/20">
                <span className="w-1 h-1 rounded-full bg-[#800000] mr-1.5 animate-pulse" />
                Special Event
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                {event?.event?.name}{" "}
                <span className="text-[#800000]">Exclusive Deals</span>
              </h1>
            </div>

            {event?.event?.description && (
              <div className="text-slate-600 leading-relaxed max-w-2xl">
                <MerchantDetailsShort details={event?.event?.description} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 bg-white border border-[#EADDCA] px-5 py-2.5 rounded-3xl shadow-sm hover:shadow-[0_8px_25px_rgba(128,0,0,0.05)] transition-shadow lg:mt-2">
            <div className="w-10 h-10 bg-[#800000] text-white rounded-xl flex items-center justify-center shadow-[0_6px_12px_rgba(128,0,0,0.2)]">
              <FontAwesomeIcon icon={faTags} className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest m-0">
                Available
              </p>
              <p className="text-lg font-black text-[#1A1A1A] m-0 leading-none">
                {allOffers.length} Offers
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1 space-y-6">
            <div className="sticky top-20 space-y-6">
              {eventMerchants?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EADDCA]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1A1A1A] text-white rounded-xl flex items-center justify-center text-lg shadow-sm">
                      <FontAwesomeIcon icon={faStore} />
                    </div>
                    <h4 className="font-black text-[#1A1A1A] text-base uppercase tracking-wide">
                      Featured Brands
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {eventMerchants.map((merchant, i) => (
                      <SidebarRoundMerchantCard
                        key={i}
                        merchant={merchant}
                        merSlug={companyData?.store_slug}
                        slugType={companyData?.slug_type}
                      />
                    ))}
                  </div>
                </div>
              )}

              {suggestedCategories?.length > 0 && (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EADDCA]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#800000]/10 text-[#800000] rounded-xl flex items-center justify-center text-lg shadow-inner">
                      <FontAwesomeIcon icon={faLayerGroup} />
                    </div>
                    <h4 className="font-black text-[#1A1A1A] text-base uppercase tracking-wide">
                      Top Categories
                    </h4>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {suggestedCategories.slice(0, 8).map((cat, i) => (
                      <Link
                        key={i}
                        href={`/${cat?.category?.url}`}
                        className="no-underline flex items-center justify-between p-3 rounded-xl border border-transparent bg-[#FDFBE7]/50 hover:border-[#800000]/20 hover:bg-[#800000]/5 transition-all group"
                      >
                        <span className="text-xs font-bold text-slate-600 group-hover:text-[#800000]">
                          {cat?.category?.name}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="text-[9px] text-slate-300 group-hover:text-[#800000] group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {filteredVerticalBanners?.length > 0 && (
                <div className="rounded-3xl overflow-hidden shadow-md shadow-[#800000]/5 border-[3px] border-white group">
                  <VerticalEventOfferBanner
                    bannerResponse={filteredVerticalBanners}
                    domain={companyDomain.domain}
                    mer_slug={companyData?.store_slug}
                    slug_type={companyData?.slug_type}
                  />
                </div>
              )}

              {suggestedEvents?.length > 0 && (
                <div className="bg-white rounded-[2rem] p-5 md:p-6 shadow-sm border border-[#EADDCA]/60 transition-all duration-500 hover:shadow-md">
                  {/* Section Header */}
                  <h4 className="font-black mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#1A1A1A]">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#800000] opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#800000]"></span>
                    </div>
                    More Events
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {suggestedEvents
                      ?.filter((se) => se.slug !== slug?.[0])
                      .slice(0, 6)
                      .map((se, i) => (
                        <Link
                          key={i}
                          href={getEventsHref(se, "slug")}
                          className="no-underline text-[11px] bg-[#FDFBE7]/50 px-4 py-2 rounded-full border border-[#EADDCA] transition-all duration-300 hover:bg-[#800000] hover:border-[#800000] hover:translate-y-[-2px] active:scale-95 flex items-center gap-2 [&:hover>span]:text-white [&:hover>svg]:text-white/50"
                        >
                          <span className="text-slate-600 transition-colors duration-300 font-bold">
                            {se?.name}
                          </span>
                          <svg
                            className="w-2.5 h-2.5 text-[#EADDCA] transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allOffers.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="group transition-all duration-300 hover:-translate-y-1.5">
                    <EventOfferCard
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

                  {(index + 1) % 6 === 0 &&
                    filteredOfferBanners[Math.floor(index / 6)] && (
                      <div className="col-span-full py-3">
                        <div className="rounded-3xl overflow-hidden shadow-sm border border-[#EADDCA] hover:shadow-md transition-all duration-500">
                          <Banner
                            data={filteredOfferBanners[Math.floor(index / 6)]}
                            height={140}
                            domain={companyDomain.domain}
                            mer_slug={companyData?.store_slug}
                            slug_type={companyData?.slug_type}
                          />
                        </div>
                      </div>
                    )}
                </React.Fragment>
              ))}
            </div>

            {event?.event?.description && (
              <div className="bg-white p-5 md:p-7 rounded-[2rem] border border-[#EADDCA]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-md hover:border-[#800000]/20 group">
                <h3 className="text-lg md:text-xl font-black mb-6 text-[#1A1A1A] flex items-center gap-2.5 tracking-tight">
                  <div className="relative flex items-center justify-center">
                    <span className="w-1 h-5 bg-[#800000] rounded-full"></span>
                    <span className="absolute w-3 h-3 border border-[#800000]/20 rounded-full scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
                  </div>
                  About{" "}
                  <span className="text-[#800000]">{event?.event?.name}</span>
                </h3>

                {/* Content Area */}
                <div className="relative">
                  <MerchantDetailsFull details={event?.event?.description} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SpecificEventSchema
        company_id={companyData?.unique_id}
        company_name={companyData?.company_name}
        eventName={event?.event?.name}
        mer_slug={companyData?.store_slug}
        slug_type={companyData?.slug_type}
        slug={slug[0]}
      />
    </main>
  );
};

export default page;
