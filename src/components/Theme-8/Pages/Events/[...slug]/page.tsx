import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import Banner from '@/components/shared/Banner/Banners';
import SpecificEventSchema from '@/components/shared/SchemaScripts/SpecificEventSchema';
import EventBanner from '@/components/Theme-8/comp/EventBanner';
import EventOfferCard from '@/components/Theme-8/comp/EventOfferCard';
import MerchantDetailsFull from '@/components/Theme-8/comp/MerchantDetailsFull';
import MerchantDetailsShort from '@/components/Theme-8/comp/MerchantDetailsShort';
import SidebarRoundMerchantCard from '@/components/Theme-8/comp/SidebarRoundMerchantCard';
import VerticalEventOfferBanner from '@/components/Theme-8/comp/VerticalEventOfferBanner';
import { extractAllOffers, filterOfferBanners, getEventsHref, getMerchantHref } from '@/constants/hooks';
import { faChevronRight, faTags, faStore, faLayerGroup } from '@/constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cookieService from '@/services/CookiesService';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = Promise<{ slug: string[] }>;

const page = async ({ params }: { params: Props }) => {
    const { slug } = await params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;

    const [event, banners, eventMerchants, suggestedEvents, eventOfferBanners, suggestedCategories] = await Promise.all([
        apiGetEventDetails(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventSuggestedMerchants(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetAllEvents(companyDomain.domain).then(res => res.data),
        apiGetEventOfferBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiCategoryWithSub(companyData?.unique_id).then(res => res.data),
    ]);

    if (!event) return notFound();

    const offerBanners = extractAllOffers(eventOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    const allOffers = event?.merchants?.flatMap((merchant) =>
        (merchant?.offers || []).map((offer) => ({ offer, merchant }))
    ) || [];

    return (
        <main className="bg-slate-50 min-h-screen pb-20 selection:bg-blue-100 selection:text-blue-700">
            {/* --- Hero Banner Section --- */}
            {banners?.length > 0 && (
                <section className="w-full relative overflow-hidden bg-slate-200">
                    <EventBanner domain={companyDomain.domain} banners={banners} eventName={event?.event?.name} />
                </section>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                {/* --- Breadcrumb --- */}
                <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-6 bg-white/80 backdrop-blur-md w-fit px-5 py-2.5 rounded-2xl shadow-sm border border-slate-100">
                    <Link href="/" className="text-slate-500 hover:text-blue-600 transition-colors no-underline">Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[8px] text-slate-300" />
                    <Link href="/events" className="text-slate-500 hover:text-blue-600 transition-colors no-underline">Events</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[8px] text-slate-300" />
                    <span className="text-blue-600">{event?.event?.name}</span>
                </nav>

                {/* --- Title Section --- */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
                    <div className="space-y-2">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-widest border border-blue-100">
                            Special Event
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            {event?.event?.name} <span className="text-blue-600">Exclusive Deals</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                            <FontAwesomeIcon icon={faTags} />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase m-0">Available</p>
                            <p className="text-lg font-black text-slate-900 m-0 leading-none">{allOffers.length} Offers</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* --- Left Column: Main Content (8 Columns) --- */}
                    <div className="lg:col-span-8 space-y-8">
                        {event?.event?.description && (
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <MerchantDetailsShort details={event?.event?.description} />
                            </div>
                        )}

                        {/* Offers Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {allOffers.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="group transition-all duration-300 hover:-translate-y-1">
                                        <EventOfferCard
                                            product={item?.offer}
                                            merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                            domain={companyDomain.domain}
                                            merchant_name={item.merchant?.merchant_name}
                                            merchant_logo={item.merchant?.merchant_logo}
                                        />
                                    </div>

                                    {/* Inline Ad Banners Logic */}
                                    {(index + 1) % 6 === 0 && filteredOfferBanners[Math.floor(index / 6)] && (
                                        <div className="col-span-full py-4">
                                            <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500">
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

                        {/* Bottom Description */}
                        {event?.event?.description && (
                            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                                <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3">
                                    <span className="w-8 h-1.5 bg-blue-600 rounded-full"></span>
                                    About {event?.event?.name}
                                </h3>
                                <div className="prose prose-slate max-w-none">
                                    <MerchantDetailsFull details={event?.event?.description} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- Right Column: Sidebar (4 Columns) --- */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            
                            {/* Brands Section */}
                            {eventMerchants?.length > 0 && (
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                                            <FontAwesomeIcon icon={faStore} />
                                        </div>
                                        <h4 className="font-black text-slate-900 text-lg">Featured Brands</h4>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
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

                            {/* Categories Section */}
                            {suggestedCategories?.length > 0 && (
                                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                                            <FontAwesomeIcon icon={faLayerGroup} />
                                        </div>
                                        <h4 className="font-black text-slate-900 text-lg">Top Categories</h4>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {suggestedCategories.slice(0, 8).map((cat, i) => (
                                            <Link key={i} href={`/${cat?.category?.url}`} className="no-underline flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                                                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700">{cat?.category?.name}</span>
                                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sidebar Vertical Ad */}
                            {filteredVerticalBanners?.length > 0 && (
                                <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-100 border-4 border-white group">
                                    <VerticalEventOfferBanner 
                                        bannerResponse={filteredVerticalBanners} 
                                        domain={companyDomain.domain} 
                                        mer_slug={companyData?.store_slug} 
                                        slug_type={companyData?.slug_type} 
                                    />
                                </div>
                            )}

                            {/* More Events Section */}
                            {suggestedEvents?.length > 0 && (
                                <div className="bg-slate-900 rounded-[2rem] p-8 shadow-2xl shadow-slate-300 border border-slate-800">
                                    <h4 className="font-bold mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        More Events
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                        {suggestedEvents
                                            ?.filter(se => se.slug !== slug?.[0])
                                            .slice(0, 6)
                                            .map((se, i) => (
                                                <Link 
                                                    key={i} 
                                                    href={getEventsHref(se, 'slug')} 
                                                    className="group no-underline text-xs bg-white/5 px-4 py-3 rounded-xl transition-all duration-300 border border-white/10 hover:bg-white hover:scale-105 active:scale-95 flex items-center gap-2"
                                                >
                                                    <span className="text-slate-300 group-hover:text-slate-900 transition-colors duration-300 font-bold">
                                                        {se?.name}
                                                    </span>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
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
    )
}

export default page;