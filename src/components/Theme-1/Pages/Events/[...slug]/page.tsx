import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import EventBanner from '@/components/Theme-1/comp/EventBanner';
import { extractAllOffers, filterOfferBanners, getBaseImageUrl, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
// import MerchantDetailsSSR from '@/components/Theme-1/comp/MerchantDetailsSSR';
// import EventMerDetail from '@/components/Theme-1/comp/EventMerDetail';
// import BrowseDeal from '@/components/Theme-1/comp/BrowseDeal';
import VerticalEventOfferBanner from '@/components/Theme-1/comp/VerticalEventOfferBanner';
import EventCard from '@/components/Theme-1/comp/EventCard';
import SpecificEventSchema from '@/components/shared/SchemaScripts/SpecificEventSchema';
import Link from 'next/link';
import { CategoryChild, EventMerchant } from '@/services/dataTypes';
import SidebarSquareMerchantCard from '@/components/Theme-1/comp/SidebarSquareMerchantCard';
import EventsCardUpdated from '@/components/Theme-1/comp/EventsCardUpdated';
import MerchantDetailsFull from '@/components/Theme-1/comp/MerchantDetailsFull';
import MerchantDetailsShort from '@/components/Theme-1/comp/MerchantDetailsShort';

type Props = Promise<{ slug: string[] }>;
type SearchProps = Promise<{ merchantDetails: string }>;

const page = async ({ params, searchParams }: { params: Props; searchParams: SearchProps }) => {
    const { slug } = await params;
    const { merchantDetails } = await searchParams;

    const companyDomain = await cookieService.get("domain");
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const [event, banners, eventMer, suggestedEvents, eventOfferBanners, suggestedCategories] = await Promise.all([
        apiGetEventDetails(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetEventSuggestedMerchants(companyData?.unique_id, slug[0]).then(res => res.data),
        apiGetAllEvents(companyDomain.domain).then(res => res.data),
        apiGetEventOfferBanners(companyData?.unique_id, slug[0]).then(res => res.data),
        apiCategoryWithSub(companyData?.unique_id).then(res => res.data),
    ])

    if (!event) {
        return notFound();
    }
    const eventMerchants = (await apiGetEventOfferBanners(companyData?.unique_id, event?.event?.slug))?.data
    const offerBanners = extractAllOffers(eventMerchants);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
    // console.log("event:", event)


    suggestedCategories?.sort((a, b) =>
        a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
    );

    const sortChildren = (children: CategoryChild[]) => {
        return [...children].sort((a, b) => {
            const nameA = typeof a === "string" ? a : a?.name;
            const nameB = typeof b === "string" ? b : b?.name;
            return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
        });
    };

    const renderChildren = (children: CategoryChild[]) => {
        // Sort before rendering
        const sortedChildren = sortChildren(children);

        return (
            <ul className="category-sub-list">
                {sortedChildren?.map((child, idx) => {
                    if (typeof child === 'string') {
                        return <li key={idx} className="category-item">• {child}</li>;
                    }

                    return (
                        <li key={idx} className="category-item nested">
                            <Link href={`/${child?.url}`} className='d-flex gap-3 align-items-center'>
                                • {child?.name}
                                <span className="f5-color rounded-2 s1-4th-bg-color cus-border border b-sixth px-1 px-md-2 py-1 d-flex gap-2 gap-md-3">
                                    <span className='f11-color' style={{ fontSize: '12px' }}>
                                        ({child?.total_offers})
                                    </span>
                                </span>
                            </Link>
                            {/* If children exist, render them sorted too */}
                            {(child?.child?.length ?? 0) > 0 && renderChildren(child.child!)}
                        </li>
                    );
                })}
            </ul>
        );
    };
    return (
        <>
            {banners?.length > 0 && (
                <EventBanner domain={companyDomain.domain} banners={banners} eventName={event?.event?.name} />
            )}

            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">

                <div className="breadcrumb-two">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern" className="bg-pattern"
                        width={1000} height={400}
                    />
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">

                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href={"/"} className="breadcrumb-list__link text-body hover-text-main">Home</a>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href={"/events"} className="breadcrumb-list__link text-body hover-text-main">Events</a>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text">{event?.event?.name}</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">{event?.event?.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mb-3">
                    <div className="row flex-column flex-xl-row flex-lg-row flex-md-row g-3">
                        <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">
                            {/* <EventMerDetail
                                description={event?.event?.description}
                                merchantDetails={merchantDetails}
                                slug={slug}
                            /> */}
                            {event?.event?.description !== null && (
                                <div className="mb-3">
                                    <MerchantDetailsShort details={event?.event?.description} />
                                </div>
                            )}
                            <div className="row g-3 ">
                                {event?.merchants?.length > 0 &&
                                    event.merchants.map((mer, i) =>
                                        mer?.offers?.length > 0 &&
                                        mer.offers.map((offer, index) => (
                                            <div key={index} className="col-xl-4 col-lg-6 col-md-12 col-sm-12 ">
                                                <EventsCardUpdated
                                                    item={offer}
                                                    merchantHref={getMerchantHref(mer, companyData?.store_slug, companyData?.slug_type)}
                                                    merchant_name={mer?.merchant_name}
                                                    merchant_logo={mer?.merchant_logo}
                                                    productDetailUrl={offer?.slug ? getProductDetailHref(mer, companyData?.slug_type, offer?.slug) : null}
                                                />
                                            </div>
                                        ))
                                    )}
                            </div>
                            {event?.event?.description !== null && (
                                <div className="my-3">
                                    <MerchantDetailsFull details={event?.event?.description} />
                                </div>
                            )}
                        </div>
                        <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
                            <div className="d-grid gap-3 gap-md-4 position-relative my-4">
                                {/* Suggested Categories  */}
                                {suggestedCategories?.length > 0 && (
                                    <div className="my-3 ts-container">
                                        <h3 className="ts-header">Shop By Our Trending Categories</h3>

                                        <div className="ts-columns">
                                            {suggestedCategories?.map((cat, idx) => (
                                                <div className="ts-category-card" key={idx}>
                                                    <Link href={`/${cat?.category?.url}`} legacyBehavior>
                                                        <a className="ts-category-link">
                                                            <h4 className="ts-category-title">{cat?.category?.name}</h4>
                                                        </a>
                                                    </Link>
                                                    <div className="ts-submenu">
                                                        {renderChildren(cat?.category?.child)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Suggested Merchants */}
                                {eventMer?.length > 0 && (
                                    <div className="my-3 mt-2 ts-container">
                                        <div className="sidebar-suggested-brands">
                                            <h4 className="n17-color">Suggested Brands</h4>
                                            <span className="v-line"></span>
                                            <div className="row g-2 py-3 mb-5">
                                                {eventMer?.length > 0 && (
                                                    eventMer?.map((merchant: EventMerchant, i: number) => (
                                                        <div className='col-12 col-md-6 col-lg-6 d-center' key={i}>
                                                            <SidebarSquareMerchantCard merchant={merchant} merSlug={companyData?.store_slug} slugType={companyData?.slug_type} />
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Suggested Events */}
                                {suggestedEvents?.length > 0 && (
                                    <div className="my-3 mt-2 ts-container">
                                        <div className="suggested-events-section"> {/* WRAPPER ADDED HERE */}
                                            <h4 className="n17-color">You May Also Like These Events</h4>
                                            <span className="v-line"></span>
                                            <ul className="d-flex flex-column gap-3 gap-md-4 py-3 mb-2">
                                                {suggestedEvents
                                                    ?.filter(suggestedEvent => suggestedEvent.slug !== slug?.[0])
                                                    .map((suggestedEvent, i) => (
                                                        <li key={i} className='overflow-hidden'>
                                                            <Link
                                                                href={getEventsHref(suggestedEvent, 'slug')}
                                                                className="event-pill-link"
                                                            >
                                                                {suggestedEvent?.name.split(' ').length > 5 ? (
                                                                    <span className="text-wrap">
                                                                        {suggestedEvent?.name}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-nowrap">
                                                                        {suggestedEvent?.name}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {/* banner siderbar  */}
                                {offerBanners?.length > 0 && filteredVerticalBanners.length > 0 && (
                                    <div className="modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3">
                                        <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <SpecificEventSchema company_id={companyData?.unique_id} company_name={companyData?.company_name} eventName={event?.event?.name} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} slug={slug[0]} />
        </>
    )
}

export default page