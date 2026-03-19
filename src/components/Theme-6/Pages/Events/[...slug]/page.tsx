import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import notFound from '@/app/not-found';
import EventBanner from '@/components/Theme-6/comp/EventBanner';
import EventsCard from '@/components/Theme-6/comp/EventsCard';
import MerchantDetailsFull from '@/components/Theme-6/comp/MerchantDetailsFull';
import MerchantDetailsShort from '@/components/Theme-6/comp/MerchantDetailsShort';
import VerticalEventOfferBanner from '@/components/Theme-6/comp/VerticalEventOfferBanner';
import { extractAllOffers, filterOfferBanners, getEventsHref, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'

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
      <section className="breadcrumb-green">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="text-center">
              <ul className="flx-align gap-2 mb-2 justify-content-center">
                {/* Home Link */}
                <li className="font-14 text-body">
                  <a href={"/"} className="text-body hover-text-main">Home</a>
                </li>

                <li className="font-14 text-body">
                  <span className="font-10">
                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                  </span>
                </li>

                {/* Events Link */}
                <li className="font-14 text-body">
                  <a href={"/events"} className="text-body hover-text-main">Events</a>
                </li>

                <li className="font-14 text-body">
                  <span className="font-10">
                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                  </span>
                </li>

                {/* Dynamic Event Name */}
                <li className="font-14 text-body">
                  <span className='text-white'>{event?.event?.name}</span>
                </li>
              </ul>

              <h1 className="mb-0 text-capitalize">{event?.event?.name}</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row flex-column flex-xl-row flex-lg-row flex-md-row g-3">
            <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">
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
                        <EventsCard
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
                {/* {suggested events} */}
                <div className="my-3 mt-2 ts-container">
                  <div className="suggested-events-section">
                    <h4 className="ts-header">You May Also Like</h4>
                    {/* <span className="v-line"></span> */}

                    {/* Changed to flex-wrap and removed flex-column */}
                    <ul className="tags-wrapper">
                      {suggestedEvents?.map((suggestedEvent, i) => (
                        <li key={i}>
                          <Link
                            href={getEventsHref(suggestedEvent, 'slug')}
                            className="cat-sug"
                          >
                            {suggestedEvent?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* banner siderbar  */}
                {offerBanners?.length > 0 && filteredVerticalBanners.length > 0 && (
                  <div className="modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3">
                    <h4 className="ts-header">Banners</h4>
                    {/* <span className="v-line"></span> */}
                    <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
