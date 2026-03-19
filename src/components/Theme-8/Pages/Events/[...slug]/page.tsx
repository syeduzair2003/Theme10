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
import { CategoryChild, EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes';
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
    ])

    if (!event) return notFound();

    const offerBanners = extractAllOffers(eventOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    const allOffers = event?.merchants?.flatMap((merchant) =>
        (merchant?.offers || []).map((offer) => ({ offer, merchant }))
    ) || [];

    const sortChildren = (children?: CategoryChild[]) => {
        if (!children) return [];
        return [...children].sort((a, b) => {
            const nameA = typeof a === "string" ? a : a?.name;
            const nameB = typeof b === "string" ? b : b?.name;
            return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
        });
    };

    return (
        <main className="bg-[#f8fafc] min-h-screen">
            {/* --- Event Banner Section --- */}
            {banners?.length > 0 && (
                <div className="w-full">
                    <EventBanner domain={companyDomain.domain} banners={banners} eventName={event?.event?.name} />
                </div>
            )}

            {/* --- Breadcrumb & Title Section --- */}
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 bg-white w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100">
                    <Link href="/" className="no-underline hover:text-blue-600 transition-colors">Home</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                    <Link href="/events" className="no-underline hover:text-blue-600 transition-colors">Events</Link>
                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                    <span className="text-slate-900 font-semibold truncate max-w-[150px]">{event?.event?.name}</span>
                </nav>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        {event?.event?.name} <span className="text-blue-600">Exclusive Deals</span>
                    </h1>
                    <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200">
                        <FontAwesomeIcon icon={faTags} />
                        {allOffers.length} Offers Available
                    </div>
                </div>

                <div className="row g-4">
                    {/* --- Main Content (Left) --- */}
                    <div className="col-xl-8">
                        {event?.event?.description && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                                <MerchantDetailsShort details={event?.event?.description} />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {allOffers.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="group transition-all duration-300">
                                        <EventOfferCard
                                            product={item?.offer}
                                            merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                            domain={companyDomain.domain}
                                            merchant_name={item.merchant?.merchant_name}
                                            merchant_logo={item.merchant?.merchant_logo}
                                        />
                                    </div>

                                    {/* Inline Banner Logic */}
                                    {(index + 1) % 6 === 0 && filteredOfferBanners[Math.floor(index / 6)] && (
                                        <div className="col-span-full my-4">
                                            <div className="rounded-2xl overflow-hidden shadow-md">
                                                <Banner
                                                    data={filteredOfferBanners[Math.floor(index / 6)]}
                                                    height={120}
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
                            <div className="mt-10 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold mb-4 text-slate-900">About {event?.event?.name}</h3>
                                <MerchantDetailsFull details={event?.event?.description} />
                            </div>
                        )}
                    </div>

                    {/* --- Sidebar (Right) --- */}
                    <aside className="col-xl-4">
                        <div className="sticky top-6 flex flex-col gap-6">
                            
                            {/* Suggested Brands */}
                            {eventMerchants?.length > 0 && (
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                                            <FontAwesomeIcon icon={faStore} />
                                        </div>
                                        <h4 className="font-bold text-slate-900">Suggested Brands</h4>
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

                            {/* Categories Sidebar */}
                            {suggestedCategories?.length > 0 && (
                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                                            <FontAwesomeIcon icon={faLayerGroup} />
                                        </div>
                                        <h4 className="font-bold text-slate-900">Trending Categories</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {suggestedCategories.slice(0, 8).map((cat, i) => (
                                            <li key={i}>
                                                <Link href={`/${cat?.category?.url}`} className="no-underline flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                                                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{cat?.category?.name}</span>
                                                    <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-300 group-hover:text-blue-400" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Vertical Banners */}
                            {filteredVerticalBanners?.length > 0 && (
                                <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                                    <VerticalEventOfferBanner 
                                        bannerResponse={filteredVerticalBanners} 
                                        domain={companyDomain.domain} 
                                        mer_slug={companyData?.store_slug} 
                                        slug_type={companyData?.slug_type} 
                                    />
                                </div>
                            )}

                            {/* Suggested Events */}
                            {suggestedEvents?.length > 0 && (
    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800">
        <h4 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider text-slate-400">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
            More Events
        </h4>
        <div className="flex flex-wrap gap-2">
            {suggestedEvents
                ?.filter(se => se.slug !== slug?.[0])
                .slice(0, 6)
                .map((se, i) => (
                    <Link 
                        key={i} 
                        href={getEventsHref(se, 'slug')} 
                        className="group no-underline text-xs bg-slate-800/50 text-slate-200 hover:bg-white px-4 py-2.5 rounded-xl transition-all duration-300 border border-slate-700 hover:border-white hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] flex items-center gap-2"
                    >
                        <span className="group-hover:text-black transition-colors duration-300 font-medium">
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

export default page