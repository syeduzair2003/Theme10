import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetEventBanners, apiGetEventDetails } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import React from 'react'
import { extractAllOffers, filterOfferBanners, getEventsHref, getMerchantHref, getProductDetailHref, getRandomEventSeoTitle } from '@/constants/hooks';
import EventBanner from '@/components/Theme-2/comp/EventBanner';
import { notFound } from 'next/navigation';
import SidebarBanners from '@/components/Theme-2/comp/SidebarBanners';
import SpecificEventSchema from '@/components/shared/SchemaScripts/SpecificEventSchema';
import MerchantDetailsShort from '@/components/Theme-2/comp/MerchantDetailsShort';
import MerchantDetailsFull from '@/components/Theme-2/comp/MerchantDetailsFull';
import { EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes';
import CouponCard from '@/components/Theme-2/comp/CouponCard';
import Banner from '@/components/shared/Banner/Banners';
import StoreCardTwo from '@/components/Theme-2/comp/StoreCardTwo';

type Props = Promise<{ slug: string }>;


type MerchantOfferItem = {
  offer: Offer;
  merchant: MerchantWithOffers;
};

const page = async ({ params }: { params: Props }) => {
  const { slug } = await params;

  const companyDomain = await cookieService.get("domain");
  const companyData = (await apiCompanyUpdatedData(companyDomain)).data;

  const [event, banners, eventMerchants, suggestedEvents, eventOfferBanners, suggestedCategories] = await Promise.all([
    apiGetEventDetails(companyData?.unique_id, slug[0]).then(res => res.data),
    apiGetEventBanners(companyData?.unique_id, slug[0]).then(res => res.data),
    apiGetEventSuggestedMerchants(companyData?.unique_id, slug[0]).then(res => res.data),
    apiGetAllEvents(companyDomain.domain).then(res => res.data),
    apiGetEventOfferBanners(companyData?.unique_id, slug[0]).then(res => res.data),
    apiCategoryWithSub(companyData?.unique_id).then(res => res.data),
  ])

  const offerBanners = extractAllOffers(eventOfferBanners);
  if (!event) {
    return notFound()
  }
  const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 50, 2000);
  const allOffers: MerchantOfferItem[] =
    event?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({
        offer,
        merchant,
      }))
    ) || [];

  const bannerDisplayAfter = 6;
  const filteredOfferBanners = filterOfferBanners(offerBanners || [], 50, 2000, 50, 200);
  return (
    <>
      {banners?.length > 0 && (
        <EventBanner domain={companyDomain.domain} banners={banners} eventName={event?.event?.name} />
      )}
      <div className="contact-section bg z-10">
        <div className="container">
          <div className="row g-2">
            <div className="col-xl-12 col-xxl-12 col-sm-12">
              <div className="breadcrumb-text breadcrumb-dark-text py-3">
                <h1 className='page-heading z-1000'>{(event?.event?.name)}</h1>
                <ul className="breadcrumb-list text-dark z-1000 position-relative">
                  <li><Link href="/" className='text-capitalize'>Home</Link></li>
                  <li><Link href="/events" className='text-capitalize'>Events</Link></li>
                  <li className='text-capitalize'>{event?.event?.name}</li>
                </ul>
              </div>
            </div>
            <div className="col-xl-9 col-xxl-9">
              {/* <MerchantDetailsSSR details={event?.event?.description} slug={event?.event?.unique_id} showFull={merchantDetails} /> */}
              {event?.event?.description !== null && (
                <MerchantDetailsShort details={event?.event?.description} />
              )}
              <section className="section-sidebar">

                {/* {event?.merchants?.length > 0 && event?.merchants?.map((merchant, index) => {
                return (
                  <EventMerchantOffers key={index} merchant={merchant} mer_slug={companyData?.store_slug} mer_slug_type={companyData?.slug_type} offerBanners={offerBanners} />
                )
              })} */}
                <div className="row g-3 mb-4">
                  {allOffers?.length > 0 && allOffers?.map((offer, index) => {
                    return (
                      <>
                        <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                          <CouponCard
                            merchantHref={getMerchantHref(offer?.merchant, companyData?.store_slug, companyData?.slug_type)}
                            merchant_logo={offer?.merchant?.merchant_logo}
                            merchant_name={offer?.merchant?.merchant_name}
                            offer={offer?.offer}
                            type={offer?.offer?.offer_type?.name}
                            pageType="event"
                            productDetailUrl={offer?.offer?.slug ? getProductDetailHref(offer?.merchant, companyData?.slug_type, offer?.offer?.slug, offer?.offer?.category?.slug): null}
                          />
                        </div>
                        {(index + 1) % bannerDisplayAfter === 0 && filteredOfferBanners.length > 0 && filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (
                          <div className="banner-container" key={`banner-${Math.floor(index / bannerDisplayAfter)}`}>
                            <Banner data={filteredOfferBanners[Math.floor(index / bannerDisplayAfter)]} height={100} offerLink={null} domain={companyDomain?.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                          </div>
                        )}
                      </>
                    )
                  })}
                </div>
              </section>
              {event?.event?.description !== null && (
                <MerchantDetailsFull details={event?.event?.description} />
              )}
            </div>
            {filteredVerticalBanners?.length > 0 && (
              <div className="col-xl-3 col-xxl-3 anim-rate mb-3">
                {eventMerchants?.length > 0 && (
                  <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                    <h4 className='sidebar-heading'>Suggested Brands</h4>
                    <div className="row g-2 py-3 mb-5">
                      {eventMerchants?.map((merchant: EventMerchant, i: number) => (
                        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-6 flex-shrink-0 px-2">
                          <StoreCardTwo mer_slug={companyData?.store_slug} mer_slug_type={companyData?.slug_type} merchant={merchant} />
                        </div>
                      ))
                      }
                    </div>
                  </div>
                )}
                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                  <h4 className='sidebar-heading'>Banner Offers</h4>
                  <SidebarBanners bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} companyId={companyData?.unique_id} pageType='event' />
                </div>
                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3">
                  <h4 className='sidebar-heading'>You May Also Like These Events</h4>
                  {suggestedEvents?.length > 0 && (
                    <ul className="navsearch-tags-list d-flex flex-column gap-2 p-0">
                      {suggestedEvents?.map((item, i) => (
                        <li key={i} className="navsearch-tag-item m-0">
                          <Link href={getEventsHref(item, "slug")}>
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SpecificEventSchema company_id={companyData?.unique_id} company_name={companyData?.company_name} eventName={event?.event?.name} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} slug={slug[0]} />
    </>
  )
}

export default page
