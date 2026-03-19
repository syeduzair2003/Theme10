import React from 'react'
import Image from "next/image";
import { apiCompanyUpdatedData,apiCategoryWithSub,apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import { discardHTMLTags, extractAllOffers, filterOfferBanners ,getEventsHref } from '@/constants/hooks';
import Link from 'next/link';
import { apiGetEventOfferBanners } from '@/apis/offers';
import cookieService from '@/services/CookiesService';
import PageBanner from '@/components/Theme-4/comp/PageBanner';
import OfferCard from '@/components/Theme-4/comp/OfferCard';
// import OfferCard from '@/components/Theme-4/comp/OfferCardThree';
import VerticalBanner from '@/components/Theme-4/comp/VerticalBanner';

import { CategoryChild} from '@/services/dataTypes';

type Props = Promise<{ slug: string[] }>;
type SearchProps = Promise<any>;


const page = async ({ params, searchParams }: { params: Props; searchParams: SearchProps }) => {
    const { slug } = await params;
    const companyDomain = await cookieService.get("domain");
    // First get company data (needed for everything else)
    const c_data = (await apiCompanyUpdatedData(companyDomain))?.data;
    const eventBanner = await (apiGetEventBanners(c_data?.unique_id, slug[0]))
    const eventDetails = (await (apiGetEventDetails(c_data.unique_id, slug[0])))?.data
    const eventOfferBanners = (await apiGetEventOfferBanners(c_data?.unique_id, slug[0]))?.data;
    const offers = eventDetails?.merchants;
    const suggestedEvents = (await apiGetAllEvents(c_data?.unique_id))?.data;
    console.log('suggestedEvents', suggestedEvents);
    
    const offerBanners = extractAllOffers(eventOfferBanners);
    const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
    const suggestedCategories = (await apiCategoryWithSub(c_data?.unique_id))?.data;
    
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
        }
    return (
        <>
            <div className="relative w-full h-[190px] md:h-[500px]">
                <Image
                    src={`/${eventBanner?.data[0]?.banner}`}
                    alt="Event Banner"
                    fill
                    className="md:object-cover"
                    priority
                />
            </div>
            <div>
                <PageBanner
                    title={eventDetails?.event?.name}
                    image=''
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Events", href: "/events" },
                        { label: eventDetails?.event?.name, href: `/events/${eventDetails?.event?.slug}` },
                    ]}
                    variant="light" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap bg-gray-50 pt-2 md:pt-8 gap-8">
                <div className="max-w-[1200px] mx-auto px-2 md:px-0 md:pl-8 lg:col-span-3 space-y-12">
                    {/* Event Description */}
                    <section className="pb-2 md:pb-16">
                        <div className="max-w-[1400px] mx-auto">
                            <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8">
                                {/* Decorative Gradient Bar */}
                                <span className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-[var(--primary-color)] to-orange-500"></span>

                                {/* Description */}
                                <p className="text-lg leading-relaxed text-gray-700">
                                    {discardHTMLTags(eventDetails?.event?.description)}
                                </p>
                            </div>
                        </div>

                        {offers?.length ? (
                            <div className="mt-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                                {offers?.map((merchant, mIndex) =>
                                    merchant?.offers?.map((offer, oIndex) => (
                                        <OfferCard
                                            key={`${mIndex}-${oIndex}`}
                                            image={`/${merchant?.merchant_logo}`}
                                            title={offer?.offer_title}
                                            expiry={offer?.end_date}
                                            href={offer?.url}
                                            unique_id={offer?.unique_id}
                                            domain={c_data?.permanent_domain}
                                            mer_slug={c_data?.store_slug}
                                            slug_type={c_data?.slug_type} id={offer?.id}
                                            merchant={merchant} 
                                            />

                                    ))
                                )}
                            </div>
                        ) : null}
                    </section>
                </div>
                <div className="space-y-6 mr-2">
                    {/* {suggestedCategories?.length > 0 && (
                        <div className='bg-white rounded-xl shadow-md p-5'>
                            <h4 className="text-2xl font-bold text-gray-800 ">Trending Categories</h4>
                            <div className="w-full h-px bg-gray-300 my-2"></div>
                            <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                            <div className="sidebar-categories py-3 mb-5">
                                <ul className="sidebar-category-list p-0">
                                    {suggestedCategories?.map((cat, i) => (
                                        <li key={i} className=" sidebar-category-item">
                                            <Link href={`/${cat?.category?.url}`} className="no-underline text-white sidebar-category-link
                                            bg-[#f86d17] font-medium px-2 py-1 mb-2">
                                                {cat?.category?.name}
                                            </Link>
                                            {cat?.category?.child?.length > 0 && (
                                                <ul className="sidebar-submenu my-2">
                                                    {sortChildren(cat.category.child).map((child, idx) => (
                                                        <li key={idx} className="sidebar-submenu-item">
                                                            <Link href={`/${child?.url}`} className="no-underline text-black sidebar-submenu-link">
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
                                                                            <Link href={`/${inner?.url}`} className=" no-underline text-black sidebar-submenu-link">
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
                        </div>
                    )} */}
                    {suggestedCategories?.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg p-5">
                            
                            <h4 className="text-xl font-semibold text-gray-900 ">
                            Trending Categories
                            </h4>
                            <div className='w-full h-px bg-gray-300 my-3'></div>
                            <ul className="space-y-3 p-0">
                            {suggestedCategories.map((cat, i) => (
                                <li key={i} className="group">

                                {/* Parent Category */}
                                <Link
                                    href={`/${cat?.category?.url}`}
                                    className="flex justify-between no-underline  border border-gray-200 bg-gray-50    text-gray-700 font-medium text-md   hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-orange-500    hover:text-white hover:shadow-md rounded-lg px-3 py-2 "
                                >
                                    <span>{cat?.category?.name}</span>

                                    {/* + / x icon */}
                                    <span className="text-lg transform transition duration-300 group-hover:rotate-45">
                                    +
                                    </span>
                                </Link>

                                {/* Child Categories */}
                                {cat?.category?.child?.length > 0 && (
                                    <ul className="ml-3 mt-2 space-y-1 p-0 overflow-hidden max-h-0 group-hover:max-h-[500px] transition-all duration-500">

                                    {sortChildren(cat.category.child).map((child, idx) => (
                                        <li key={idx} className="group/sub">

                                        <Link
                                            href={`/${child?.url}`}
                                            className="flex justify-between no-underline items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                                        >
                                            <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                                            {child?.name}
                                            </span>

                                            {child?.total_offers > 0 && (
                                            <span className="bg-[#e41717e8] text-white text-xs px-2 py-0.5 rounded-full">
                                                {child?.total_offers}
                                            </span>
                                            )}
                                        </Link>

                                        {/* Inner Child */}
                                        {(child?.child?.length ?? 0) > 0 && (
                                            <ul className="ml-4 mt-1 space-y-1 hidden group-hover/sub:block">

                                            {sortChildren(child.child).map((inner, k) => (
                                                <li key={k}>
                                                <Link
                                                    href={`/${inner?.url}`}
                                                    className="block px-3 py-1.5 text-sm text-gray-600 hover:text-orange-500 transition"
                                                >
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
                    )}

                    {suggestedEvents?.length > 0 && (
                        <>
                            <h4 className="n17-color">You May Also Like These Events</h4>
                            <div className='w-full h-px bg-gray-300 my-2'></div>
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

                    {filteredVerticalBanners?.length ? (
                        <div className="bg-white rounded-xl shadow-md p-5">
                            <h3 className="text-2xl font-bold text-gray-800 text-left">
                                Banner Offers
                            </h3>
                            <div className="w-full h-px bg-gray-300 my-2"></div>
                            {filteredVerticalBanners?.map((item: any, index: number) => (
                                <VerticalBanner
                                    key={index}
                                    url={item?.offer?.url}
                                    image={item?.offer?.banner_image}
                                />
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>

        </>

    )
}

export default page;