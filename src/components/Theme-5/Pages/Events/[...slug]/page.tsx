import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import cookieService from '@/services/CookiesService'
import { apiGetEventDetails, apiGetEventBanners, apiCompanyUpdatedData, apiGetAllEvents, apiCategoryWithSub } from '@/apis/user'
import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers'
import { extractAllOffers, filterOfferBanners, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks'
import { CategoryChild, EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes'
import Footer from '../../../comp/Footer'
import EventBanner from '../../../comp/EventBanner'
import EventOfferCard from '../../../comp/EventOfferCard'
import VerticalEventOfferBanner from '../../../comp/VerticalEventOfferBanner'
import SidebarRoundMerchantCard from '../../../comp/SidebarRoundMerchantCard'
import MerchantDetailsShort from '../../../comp/MerchantDetailsShort'
import MerchantDetailsFull from '../../../comp/MerchantDetailsFull'
import SpecificEventSchema from '@/components/shared/SchemaScripts/SpecificEventSchema'
import Banner from '@/components/shared/Banner/Banners'

type Props = Promise<{ slug: string[] }>

type MerchantOfferItem = {
    offer: Offer
    merchant: MerchantWithOffers
}

const EventSlugPage = async ({ params }: { params: Props }) => {
    const { slug } = await params
    const companyDomain = await cookieService.get("domain")
    const response = await apiCompanyUpdatedData(companyDomain)
    const companyData = response?.data

    const [event, banners, eventMerchants, suggestedEvents, eventOfferBanners, suggestedCategories] = await Promise.all([
        apiGetEventDetails(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventSuggestedMerchants(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetAllEvents(companyDomain.domain).then(res => res.data),
        apiGetEventOfferBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiCategoryWithSub(companyData?.unique_id).then(res => res.data),
    ])

    if (!event) {
        return notFound()
    }

    const offerBanners = extractAllOffers(eventOfferBanners)
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000)
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200)

    const allOffers: MerchantOfferItem[] =
        event?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || []

    const sortChildren = (children?: CategoryChild[]) => {
        if (!children) return []
        return [...children].sort((a, b) => {
            const nameA = typeof a === "string" ? a : a?.name
            const nameB = typeof b === "string" ? b : b?.name
            return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" })
        })
    }

    return (
        <>
            {/* Event Banner */}
            {banners?.length > 0 && (
                <EventBanner domain={companyDomain.domain} banners={banners} eventName={event?.event?.name} />
            )}

            {/* Breadcrumb */}
            <div className="bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="inline-flex max-w-full overflow-x-auto whitespace-nowrap items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs md:text-sm font-medium shadow-lg backdrop-blur-md scrollbar-hide">
                        <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                        <span className="text-slate-400">/</span>
                        <Link href="/events" className="hover:text-indigo-400 transition-colors">Events</Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-indigo-600 font-semibold">{event?.event?.name}</span>
                    </nav>
                </div>
            </div>
            {/* Main Content */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">

                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Main Content Area */}
                        <div className="flex-1">
                            {/* Event Short Description */}
                            {event?.event?.description && (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-10">
                                    <div className="prose prose-slate max-w-none">
                                        <MerchantDetailsShort details={event?.event?.description} />
                                    </div>
                                </div>
                            )}

                            {/* Offers Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {allOffers?.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="group transition-all duration-300">
                                            <EventOfferCard
                                                product={item?.offer}
                                                merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                                domain={companyDomain.domain}
                                                merchant_name={item.merchant?.merchant_name}
                                                merchant_logo={item.merchant?.merchant_logo}
                                                productDetailUrl={item?.offer?.slug ? getProductDetailHref(item.merchant, companyData?.slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
                                            />
                                        </div>

                                        {/* Logic: Insert banner after every 6 offers */}
                                        {(index + 1) % 6 === 0 &&
                                            filteredOfferBanners.length > 0 &&
                                            filteredOfferBanners[Math.floor(index / 6)] && (
                                                <div className="col-span-full py-4" key={`banner-${Math.floor(index / 6)}`}>
                                                    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                                                        <Banner
                                                            data={filteredOfferBanners[Math.floor(index / 6)]}
                                                            height={120}
                                                            offerLink={null}
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

                            {/* Event Full Description */}
                            {event?.event?.description && (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mt-10">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        About {event?.event?.name}
                                    </h3>
                                    <div className="prose prose-slate max-w-none">
                                        <MerchantDetailsFull details={event?.event?.description} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sticky Sidebar */}
                        <aside className="w-full lg:w-80 space-y-8">
                            {/* Check for any sidebar content */}
                            {(eventMerchants?.length > 0 || suggestedCategories?.length > 0 || (offerBanners?.length > 0 && filteredVerticalBanners?.length > 0)) && (
                                <div className="sticky top-24 space-y-8">

                                    {/* Suggested Brands Section */}
                                    {eventMerchants?.length > 0 && (
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Suggested Brands</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {eventMerchants?.map((merchant: EventMerchant, i: number) => (
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

                                    {/* Shop By Categories */}
                                    {suggestedCategories?.length > 0 && (
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Categories</h4>
                                            <div className="space-y-2">
                                                {suggestedCategories?.slice(0, 10).map((cat, i) => (
                                                    <div key={i} className="group">
                                                        <Link href={`/${cat?.category?.url}`} className="flex items-center justify-between font-bold text-slate-700 group-hover:text-indigo-600 transition-colors text-sm">
                                                            {cat?.category?.name}
                                                            <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Vertical Banner */}
                                    {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                                            <VerticalEventOfferBanner
                                                bannerResponse={filteredVerticalBanners}
                                                domain={companyDomain.domain}
                                                mer_slug={companyData?.store_slug}
                                                slug_type={companyData?.slug_type}
                                            />
                                        </div>
                                    )}

                                    {/* You May Also Like */}
                                    {suggestedEvents?.length > 0 && (
                                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Related Events</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {suggestedEvents
                                                    ?.filter(suggestedEvent => suggestedEvent.slug !== slug?.[0])
                                                    .slice(0, 5)
                                                    .map((suggestedEvent, i) => (
                                                        <Link
                                                            key={i}
                                                            href={getEventsHref(suggestedEvent, 'slug')}
                                                            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 hover:bg-white transition-all"
                                                        >
                                                            {suggestedEvent?.name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>

            <Footer />

            <SpecificEventSchema
                company_id={companyData?.unique_id}
                company_name={companyData?.company_name}
                eventName={event?.event?.name}
                mer_slug={companyData?.store_slug}
                slug_type={companyData?.slug_type}
                slug={slug[0]}
            />
        </>
    )
}

export default EventSlugPage