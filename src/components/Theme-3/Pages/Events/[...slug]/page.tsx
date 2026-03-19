import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import Banner from '@/components/shared/Banner/Banners';
import SpecificEventSchema from '@/components/shared/SchemaScripts/SpecificEventSchema';
import EventBanner from '@/components/Theme-3/comp/EventBanner';
import EventOfferCard from '@/components/Theme-3/comp/EventOfferCard';
import MerchantDetailsFull from '@/components/Theme-3/comp/MerchantDetailsFull';
import MerchantDetailsShort from '@/components/Theme-3/comp/MerchantDetailsShort';
import SidebarRoundMerchantCard from '@/components/Theme-3/comp/SidebarRoundMerchantCard';
import VerticalEventOfferBanner from '@/components/Theme-3/comp/VerticalEventOfferBanner';
import { extractAllOffers, filterOfferBanners, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { CategoryChild, EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

type Props = Promise<{ slug: string[] }>;

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const page = async ({ params }: { params: Props }) => {
    const { slug, } = await params;
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

    if (!event) {
        return notFound();
    }
    // const eventOfferBanners = (await apiGetEventOfferBanners(companyData?.unique_id, event?.event?.slug))?.data
    const offerBanners = extractAllOffers(eventOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);

    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    const allOffers: MerchantOfferItem[] =
        event?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    // suggestedCategories?.sort((a, b) =>
    //     a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
    // );

    // const sortChildren = (children: CategoryChild[]) => {
    //     return [...children].sort((a, b) => {
    //         const nameA = typeof a === "string" ? a : a?.name;
    //         const nameB = typeof b === "string" ? b : b?.name;
    //         return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
    //     });
    // };

    // const renderChildren = (children: CategoryChild[]) => {
    //     // Sort before rendering
    //     const sortedChildren = sortChildren(children);

    //     return (
    //         <ul className="category-sub-list">
    //             {sortedChildren?.map((child, idx) => {
    //                 if (typeof child === 'string') {
    //                     return <li key={idx} className="category-item">• {child}</li>;
    //                 }

    //                 return (
    //                     <li key={idx} className="category-item nested">
    //                         <Link href={`/${child?.url}`} className='d-flex gap-3 align-items-center'>
    //                             • {child?.name}
    //                             <span className="f5-color rounded-2 s1-4th-bg-color cus-border border b-sixth px-1 px-md-2 py-1 d-flex gap-2 gap-md-3">
    //                                 <span className='f11-color' style={{ fontSize: '12px' }}>
    //                                     ({child?.total_offers})
    //                                 </span>
    //                             </span>
    //                         </Link>
    //                         {/* If children exist, render them sorted too */}
    //                         {(child?.child?.length ?? 0) > 0 && renderChildren(child.child!)}
    //                     </li>
    //                 );
    //             })}
    //         </ul>
    //     );
    // };

    suggestedCategories?.sort((a, b) =>
        a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
    );

    const sortChildren = (children?: CategoryChild[]) => {
        if (!children) return [];
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
            <section className="banner-sections index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border mt-2">
                <div className="event-page-container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center py-sm-10 mb-20">
                        <div className="col-lg-6 pe-4 pe-md-10 mb-20">
                            <div className="d-grid gap-4 gap-md-6 mb-8 mb-xl-0">
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/events`} className="n17-color text-capitalize">Events</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven n17-color text-capitalize">{event?.event?.name}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-sidebars-event details-section position-relative" style={{ paddingBottom: '30px' }}>
                <div className="event-page-container sidebar-toggler position-relative">
                    <div className="d-flex justify-content-between gap-3 flex-wrap mb-2">
                        {event?.event?.description?.length > 15 ?
                            (
                                <h1 className="display-four n17-color mb-2 fs-three f-30">
                                    {`${event?.event?.name}`}
                                </h1>
                            ) : (
                                <h1 className="display-four n17-color mb-2 mb-md-6 f-40">
                                    {`${event?.event?.name}`}
                                </h1>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-xxl-8 cus-z1">
                            {event?.event?.description !== null && (
                                <div className="mb-3">
                                    <MerchantDetailsShort details={event?.event?.description} />
                                </div>
                            )}
                            <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6">
                                <div className="row g-3">
                                    {allOffers?.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <div className="col-xl-4 col-lg-4 col-md-6 col-12 cus-z1 overflow-hidden">
                                                <EventOfferCard
                                                    product={item?.offer}
                                                    merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                                                    domain={companyDomain.domain}
                                                    merchant_name={item.merchant?.merchant_name}
                                                    merchant_logo={item.merchant?.merchant_logo}
                                                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item.merchant, companyData?.slug_type, item?.offer?.slug,item?.offer?.category?.slug) : null}
                                                />
                                            </div>

                                            {/* Insert banner after every 4 offers */}
                                            {(index + 1) % 4 === 0 &&
                                                filteredOfferBanners.length > 0 &&
                                                filteredOfferBanners[Math.floor(index / 4)] && (
                                                    <div
                                                        className="col-xl-12 col-lg-12 col-12 banner-container"
                                                        key={`banner-${Math.floor(index / 4)}`}
                                                    >
                                                        <Banner
                                                            data={filteredOfferBanners[Math.floor(index / 4)]}
                                                            height={100}
                                                            offerLink={null}
                                                            domain={companyDomain.domain}
                                                            mer_slug={companyData?.store_slug}
                                                            slug_type={companyData?.slug_type}
                                                        />
                                                    </div>
                                                )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                            {event?.event?.description !== null && (
                                <div className="my-3">
                                    <MerchantDetailsFull details={event?.event?.description} />
                                </div>
                            )}
                            {/* {suggestedCategories?.length > 0 && (
                                <div className="my-3 mt-5">
                                    <h3 className="n17-color mb-4">Shop By Our Trending Categories</h3>
                                    <div className="event-category-columns">
                                        {suggestedCategories?.map((cat, idx) => (
                                            <div className="card rounded-3 break-inside-avoid mb-6 border b-ninth p-3" key={idx}>
                                                <Link href={`/${cat?.category?.url}`}>
                                                    <h4 className="category-title n17-color">{cat?.category?.name}</h4>
                                                </Link>
                                                {renderChildren(cat?.category?.child)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </div>
                        <div className="col-xl-4 col-xxl-4 mt-10 mt-xl-0 anim-rate">
                            {(eventMerchants?.length > 0 || (offerBanners?.length > 0 && filteredVerticalBanners?.length > 0)) && (
                                <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                                    <div className="side-wrapper bg-transparent rounded-4">
                                        <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                                            <div className="sidebar-area">
                                                <div className="d-grid gap-3 gap-md-4 position-relative">
                                                    <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                                        {eventMerchants?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Suggested Brands</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <div className="row g-2 py-3 mb-5">
                                                                    {eventMerchants?.length > 0 && (
                                                                        eventMerchants?.map((merchant: EventMerchant, i: number) => (
                                                                            <div className='col-12 col-md-6 col-lg-6 d-center' key={i}>
                                                                                <SidebarRoundMerchantCard merchant={merchant} merSlug={companyData?.store_slug} slugType={companyData?.slug_type} />
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                        {suggestedCategories?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Shop By Our Trending Categories</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <div className="sidebar-categories py-3 mb-5">
                                                                    <ul className="sidebar-category-list">
                                                                        {suggestedCategories?.map((cat, i) => (
                                                                            <li key={i} className="sidebar-category-item">
                                                                                <Link href={`/${cat?.category?.url}`} className="sidebar-category-link">
                                                                                    {cat?.category?.name}
                                                                                </Link>
                                                                                {cat?.category?.child?.length > 0 && (
                                                                                    <ul className="sidebar-submenu">
                                                                                        {sortChildren(cat.category.child).map((child, idx) => (
                                                                                            <li key={idx} className="sidebar-submenu-item">
                                                                                                <Link href={`/${child?.url}`} className="sidebar-submenu-link">
                                                                                                    <span className="custom-bullet"></span>
                                                                                                    {child?.name}
                                                                                                    {child?.total_offers > 0 && (
                                                                                                        <span className="sidebar-offer-count">
                                                                                                            {child?.total_offers}
                                                                                                        </span>
                                                                                                    )}
                                                                                                </Link>

                                                                                                {(child?.child?.length ?? 0) > 0 && (
                                                                                                    <ul className="sidebar-submenu nested">
                                                                                                        {sortChildren(child?.child).map((inner, k) => (
                                                                                                            <li key={k} className="sidebar-submenu-item">
                                                                                                                <Link href={`/${inner?.url}`} className="sidebar-submenu-link">
                                                                                                                    <span className="custom-bullet"></span>
                                                                                                                    {inner?.name}
                                                                                                                </Link>
                                                                                                            </li>
                                                                                                        ))}
                                                                                                    </ul>
                                                                                                )}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                )}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )}
                                                        {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Banner Offers</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>

                                                                {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                                                    <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                                                                )}
                                                            </>
                                                        )}
                                                        {suggestedEvents?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">You May Also Like These Events</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <ul className="d-flex flex-column gap-3 gap-md-4 py-3 mb-5">
                                                                    {suggestedEvents
                                                                        ?.filter(suggestedEvent => suggestedEvent.slug !== slug?.[0])
                                                                        .map((suggestedEvent, i) => (
                                                                            <li key={i} className='overflow-hidden'>
                                                                                <Link href={getEventsHref(suggestedEvent, 'slug')} className="box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex">
                                                                                    {suggestedEvent?.name.split(' ').length > 5 ? (
                                                                                        <span className="fs-six d-inline-block transition f-15 fw-5" style={{ color: 'rgb(64 74 96)', whiteSpace: 'normal' }}>
                                                                                            {suggestedEvent?.name}
                                                                                        </span>
                                                                                    ) : (
                                                                                        <span className="fs-six text-nowrap transition f-15 fw-5" style={{ color: 'rgb(64 74 96)' }}>
                                                                                            {suggestedEvent?.name}
                                                                                        </span>
                                                                                    )}
                                                                                </Link>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <SpecificEventSchema company_id={companyData?.unique_id} company_name={companyData?.company_name} eventName={event?.event?.name} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} slug={slug[0]} />
        </>
    )
}

export default page
