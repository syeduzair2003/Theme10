import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';
import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionCategories } from '@/apis/user';
import notFound from '@/app/not-found';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getEventsHref, getMerchantHref, getProductDetailHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CategoryChild, MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import EventBanner from './EventBanner';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import MerchantDetailsShort from './MerchantDetailsShort';
import EventsCard from './EventsCard';
import MerchantDetailsFull from './MerchantDetailsFull';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';



type Props = Promise<{ slug: string[] }>;
type SearchProps = Promise<{ merchantDetails: string }>;
type MerchantOfferItem = {
  offer: Offer;
  merchant: MerchantWithOffers;
};

const PromotionOffersPage = async ({ params }: { params: string }) => {
  const slug = params;
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  const [promotion, banners, eventMer, suggestedPromo, promoOfferBanners, promoCategories] = await Promise.all([
    apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
    apiGetSubPromoBanners(companyData?.unique_id, slug).then(res => res.data),
    apiGetSubPromoSuggestedMerchant(companyData?.unique_id, slug).then(res => res.data),
    apiGetAllPromotion(companyDomain.domain).then(res => res.data),
    apiGetPromoOfferBanners(companyData?.unique_id, slug).then(res => res.data),
    apiGetPromotionCategories(companyData?.unique_id, slug).then(res => res.data),
  ]);

  const suggestedCategories = promoCategories?.selected_categories;

  const suggestedPromotions = suggestedPromo?.filter(promo => promo.slug !== slug);

  if (!promotion) {
    return notFound();
  }

  const offerBanners = extractAllOffers(promoOfferBanners);

  const filteredVerticalBanners = filterOfferBanners(offerBanners || [], 50, 2000, 65, 2000);
  const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

  const allOffers: MerchantOfferItem[] =
    promotion?.merchants?.flatMap((merchant) =>
      (merchant?.offers || []).map((offer) => ({
        offer,
        merchant,
      }))
    ) || [];

  const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
  const plainDesc = stripHtml(cleanDesc).result;
  const shortDesc = extractFirstSentences(plainDesc);
  const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);

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
        <EventBanner domain={companyDomain.domain} banners={banners} eventName={promotion?.promotion?.name} />
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
                  <a href={"/promotion"} className="text-body hover-text-main">promotions</a>
                </li>

                <li className="font-14 text-body">
                  <span className="font-10">
                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                  </span>
                </li>

                {/* Dynamic Event Name */}
                <li className="font-14 text-body">
                  <span className='text-white'>{promotion?.promotion?.name}</span>
                </li>
              </ul>

              <h1 className="mb-0 text-capitalize">{promotion?.promotion?.name}</h1>
            </div>
          </div>
        </div>
      </section>
      <section className='mt-3'>
        <div className="container">
          <div className="row flex-column flex-xl-row flex-lg-row flex-md-row g-3">
            {/* Left Column Content */}
            <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">

              {/* Short Details */}
              {promotion?.promotion?.description !== null && (
                <div className="mb-3">
                  <MerchantDetailsShort details={promotion?.promotion?.description} />
                </div>
              )}

              {/* Cards Grid */}
              <div className="row g-3 ">
                {allOffers?.length > 0 &&
                  allOffers.map((mer, i) => (
                    <div key={i} className="col-xl-4 col-lg-6 col-md-12 col-sm-12 ">
                      <EventsCard
                        item={mer?.offer}
                        merchantHref={getMerchantHref(mer.merchant, companyData?.store_slug, companyData?.slug_type)}
                        merchant_name={mer.merchant?.merchant_name}
                        merchant_logo={mer.merchant?.merchant_logo}
                        productDetailUrl={mer?.offer?.slug ? getProductDetailHref(mer.merchant, companyData?.slug_type, mer?.offer?.slug) : null}
                      />
                    </div>
                  ))
                }
              </div>

              {/* Full Details */}
              {showFullDetailsSection && (
                <div className="my-3">
                  <MerchantDetailsFull details={promotion?.promotion?.description} />
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
              <div className="d-grid gap-3 gap-md-4 position-relative my-2">
                {/* Suggested Categories  */}
                {suggestedCategories?.length > 0 && (
                  <div className="my-3 ts-container">
                    <h3 className="ts-header">Shop By Our Trending Categories</h3>

                    <div className="ts-columns">
                      {suggestedCategories?.map((cat, idx) => (
                        <div className="ts-category-card" key={idx}>
                          <Link href={`/${cat?.url}`} legacyBehavior>
                            <a className="ts-category-link">
                              <h4 className="ts-category-title">{cat?.category_name}</h4>
                            </a>
                          </Link>
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
                      {suggestedPromo?.map((suggestedPromo, i) => (
                        <li key={i}>
                          <Link
                            href={getPromotionHref(suggestedPromo, 'promotion')}
                            className="cat-sug"
                          >
                            {suggestedPromo?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* banner siderbar  */}
                {offerBanners?.length > 0 && filteredVerticalBanners.length > 0 && (
                  <div className="modern-sidebar p-4 rounded-4 bg-white shadow-sm  mb-3">
                    <h4 className="ts-header">Banners</h4>
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

export default PromotionOffersPage
