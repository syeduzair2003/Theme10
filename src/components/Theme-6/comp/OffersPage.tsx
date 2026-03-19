import { apiGetSimilarMerchants, apiMerchantDetails } from '@/apis/merchant';
import { apiOfferBanners, apiSpecificOffers } from '@/apis/offers';
import { apiNavCategory } from '@/apis/page_optimization';
import { apiGetMetaData } from '@/apis/user';
import { filterOfferBanners, getBaseImageUrl, getLastUpdateDate, getRandomRating, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import React from 'react'
import Image from 'next/image';
import RenderRating from './RenderRating';
import Link from 'next/link';
import { Merchant } from '@/services/dataTypes';
import { faArrowRight, faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
// import ProductCategorySidebar from './ProductCategorySidebar';
// import AllTagsSidebar from './AllTagsSidebar';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import MerchantDetailsFull from './MerchantDetailsFull';
// import LazyLoadingOffers from './LazyLoadingOffers';
// import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import { Accordion } from 'react-bootstrap';
import CategorySidebar from './CategorySiderBar';
import AllTagsSidebar from './AllTagsSidebar';
import LazyLoadingOffers from './LazyLoadingOffers';
import MerchantFaqsAccordion from './MerchantFaqsAccordion';


interface Props {
  merchant_id: string;
  slug: string[];
  product_id: Promise<string>;
  company_id: string;
  store_slug: string;
  category_slug: string;
  slug_type: string;
  ads_campaign: boolean;
}

const OffersPage = async ({ merchant_id, product_id, slug, company_id, store_slug, category_slug, slug_type, ads_campaign }: Props) => {
  const [
    awaited_p_id,
    bannerResponse,
    categories,
    offers,
    similarMerchantsRes,
    cookieDomain,
    metaRes,
    merchantDetailsRes
  ] = await Promise.all([
    product_id,
    apiOfferBanners(merchant_id, company_id),
    apiNavCategory(company_id),
    apiSpecificOffers(merchant_id, company_id, 1),
    apiGetSimilarMerchants(company_id, merchant_id),
    cookieService.get("domain"),
    apiGetMetaData(JSON.stringify(slug), (await cookieService.get("domain")).domain),
    apiMerchantDetails(merchant_id, company_id)
  ]);

  const companyDomain = cookieDomain.domain;
  const similarMerchant = similarMerchantsRes?.data;
  const filteredVerticalBanners = filterOfferBanners(bannerResponse?.data?.offers || [], 50, 2000, 65, 2000) || [];;

  const meta = metaRes?.data;
  const merchant_details = {
    ...merchantDetailsRes,
    mer_meta_title: meta?.meta_title,
    mer_meta_desc: meta?.meta_description,
  };
  const [heading, details] = splitHeadingFromDetails(merchant_details?.data?.merchant_detail);

  return (
    <div>
      <section className="breadcrumb-green">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="text-center">
                <ul className="flx-align gap-2 mb-2 justify-content-center">
                  {/* Home */}
                  <li className="font-14 text-body">
                    <Link href="/" className="text-body hover-text-main">
                      Home
                    </Link>
                  </li>

                  {/* Divider 1 */}
                  <li className="font-14 text-body">
                    <span className="font-10">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        style={{ width: '10px', height: '10px', color: 'white' }}
                      />
                    </span>
                  </li>

                  {/* Store Link */}
                  <li className="font-14 text-body">
                    <Link href="/all-stores/A" className="text-body hover-text-main">
                      Store
                    </Link>
                  </li>

                  {/* Divider 2 */}
                  <li className="font-14 text-body">
                    <span className="font-10">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        style={{ width: '10px', height: '10px', color: 'white' }}
                      />
                    </span>
                  </li>

                  {/* Current Page: Merchant Name */}
                  <li className="font-14 text-body">
                    <span className="text-white">
                      {merchant_details?.data?.merchant_name}
                    </span>
                  </li>
                </ul>

                <h1 className="mb-0 text-capitalize text-white">
                  {merchant_details?.data?.merchant_name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Status Section */}
        {offers?.data?.offers.length > 0 && (
          <p className="fw-bold font-14 text-center text-white mb-0 py-2">
            All coupons and deals on this page are verified. Last checked: {getLastUpdateDate(1)}.
          </p>
        )}
      </section>
      <section>
        <div className="container">
          <div className="row flex-sm-column-reverse flex-xl-row flex-lg-row flex-md-row">
            <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4 d-xl-block d-lg-block d-md-block d-none">
              {/* merchant logo and rating  */}

              <div className="item-wrapper card border-0 shadow-sm rounded-4 p-4 text-center my-3">
                {/* Logo Section */}
                <div className="thumb-area rounded-4 d-flex align-items-center justify-content-center p-3 mb-3"
                  style={{ minHeight: '160px' }}>
                  <Image
                    className="img-fluid"
                    alt={`${merchant_details?.data?.merchant_name} logo`}
                    src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                    width={395}
                    height={220}
                    style={{ objectFit: "contain", maxHeight: "100px", filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.05))" }}
                  />
                </div>

                {/* Rating Section */}
                <div className="anim-rate d-flex flex-column align-items-center mb-4">
                  <div className="d-flex align-items-center  rounded-pill border px-3 py-2 gap-2">
                    <span className="d-inline-flex align-items-center justify-content-center  rounded-circle-rating fw-semibold"
                      style={{ width: "36px", height: "36px" }}>
                      {getRandomRating(merchant_details?.data?.rating)}
                    </span>
                    <div className="d-flex align-items-center">
                      <RenderRating rating={getRandomRating(merchant_details?.data?.rating)} />
                    </div>
                  </div>
                </div>

                {/* Merchant Description Button */}
                <Link
                  href={`#fullDetails`}
                  className="siteButton text-decoration-none "
                >
                  View Description
                </Link>
              </div>

              {/* similar merchants section */}
              {similarMerchant?.length > 0 && (
                <div className="col-lg-4">
                  <div className="prod-item-wrapper p-4 rounded-4 bg-white shadow-sm my-3" style={{ width: "100%", display: "inline-table" }}>

                    <h4 className="n17-color mb-4 fw-semibold">Similar Stores</h4>

                    {/* Grid Container */}
                    <div className="similar-stores-grid">
                      {similarMerchant?.slice(0, 9).map((merchant: Merchant, i: number) => (
                        <div key={i} className="merchant-item">

                          {/* Circular Card Link */}
                          <Link href={`/store/${merchant?.slug}`} title={merchant?.merchant_name}>
                            <div className="merchant-circle shadow-sm">
                              <Image
                                src={`/${merchant?.merchant_logo}`}
                                alt={merchant?.merchant_name}
                                width={80}
                                height={80}
                                className="merchant-logo-img"
                                unoptimized
                              />
                            </div>
                          </Link>

                          {/* Name Link */}
                          <Link
                            href={`/store/${merchant?.slug}`}
                            className="merchant-name text-decoration-none"
                          >
                            {merchant?.merchant_name}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* "See All" Button */}
                    <div className="btn-area mt-3 border-top pt-3">
                      <Link href={`/all-stores/A`} className="d-flex align-items-center gap-2 text-decoration-none">
                        <span className="siteButton">See All Stores</span>
                      </Link>
                    </div>

                  </div>
                </div>
              )}
              {/* Suggested Categories section */}

              <div className='prod-item-wrapper p-4 rounded-4 bg-white shadow-sm my-3'>
                <CategorySidebar
                  categories={categories.data}
                  pageSlug="all-products"
                />
              </div>
              <AllTagsSidebar
                company_id={company_id} />


              <div className="a my-3">
                {/* checks if banners are available or not */}
                {filteredVerticalBanners.length > 0 && (
                  <div className="banner-item-wrapper p-4 p-md-6 rounded-4 bg-white shadow-sm">
                    <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain} mer_slug={store_slug} slug_type={slug_type} />
                  </div>
                )}
              </div>
            </div>

            {/* Offer section  */}
            <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">

              {/* merchant logo and rating for mobile responsiveness  */}

              <div className="item-wrapper card border-0 shadow-sm rounded-4 p-3 p-md-4 text-center my-3 d-xl-none d-lg-none d-md-none d-sm-block">
                {/* Logo Section */}
                <div className="thumb-area rounded-3 d-flex align-items-center justify-content-center p-4">
                  <Image
                    className="img-fluid"
                    alt={`${merchant_details?.data?.merchant_name} image`}
                    src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                    width={395}
                    height={220}
                    style={{ objectFit: "contain", maxHeight: "120px" }}
                  />
                </div>

                {/* Rating Section */}
                <div className="anim-rate d-flex justify-content-center align-items-center mt-4 my-3">
                  <div className="d-flex align-items-center  rounded-pill border px-3 py-2 gap-2">
                    <span className="d-inline-flex align-items-center justify-content-center  rounded-circle-rating fw-semibold"
                      style={{ width: "36px", height: "36px" }}>
                      {getRandomRating(merchant_details?.data?.rating)}
                    </span>
                    <div className="d-flex align-items-center">
                      <RenderRating rating={getRandomRating(merchant_details?.data?.rating)} />
                    </div>
                  </div>
                </div>
                {/* merchant description button */}

                <Link href={`#fullDetails`} className="mer-btn">
                  View Description
                </Link>
              </div>

              <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6">
                <div className="row cus-row justify-content-center justify-content-xl-start gy-3 gy-md-4 filterItems">
                  {offers?.data?.offers.length > 0 ? (
                    <LazyLoadingOffers
                      initialOffers={offers?.data?.offers}
                      companyId={company_id}
                      merchantId={merchant_id}
                      awaited_p_id={awaited_p_id}
                      mer_slug_type={slug_type}
                      mer_slug={store_slug}
                      offerBanner={bannerResponse?.data?.offers}
                      domain={companyDomain}
                      merchantName={merchant_details?.data?.merchant_name}
                      pagination={offers?.data?.pagination}
                      ads_campaign={ads_campaign}
                    />
                  ) : (
                    <section className="product-shop-full-grid">
                      <div className="container">
                        <div className="row">
                          <div className="section-title-center text-center mt-5">
                            <div className="col-12">
                              <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                <h3 className="fs-three n17-color text-danger">No offers found</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* Merchant details */}
              <MerchantDetailsFull details={details} />
            </div>
          </div>
          {/* FAQs Section */}
          {merchant_details.data?.faqs.length > 0 && (
            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth mb-3">
              {merchant_details?.data?.merchant_name.length > 15 ? (
                <h5 className="display-four n17-color mb-4 mb-md-6 fs-three f-30">{`${merchant_details?.data?.merchant_name} FAQs`}</h5>
              ) : (
                <h4 className="display-four n17-color mb-4 mb-md-6 f-40">{`${merchant_details?.data?.merchant_name} FAQs`}</h4>
              )}
              <div className="thumb-area rounded-2" style={{ width: '100%', maxWidth: '100%' }}>
                <Accordion defaultActiveKey="0" flush>
                  {merchant_details.data?.faqs.length > 0 && merchant_details?.data?.faqs.map((faqs, i) => (
                    <MerchantFaqsAccordion key={i} faq={faqs} index={i} />
                  ))}
                </Accordion>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default OffersPage
