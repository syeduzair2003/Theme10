import React from 'react'
import { apiGetMetaData } from '@/apis/user';
import { apiGetSimilarMerchants, apiMerchantDetails } from '@/apis/merchant';
import { Merchant } from '@/services/dataTypes';
import { apiOfferBanners, apiSpecificOffers } from '@/apis/offers';
import CategorySidebar from './CategorySidebar';
import TagsSidebar from './TagsSidebar';
import LazyLoadingOffers from './LazyLoadingOffers';
import Link from 'next/link';
import RenderRating from './RenderRating';
import StoreCard from './StoreCard';
import { discardHTMLTags, filterOfferBanners, getBaseImageUrl, getLastUpdateDate, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
// import Image from "@/components/shared/Image";
import VerticalOfferBanner from './VerticalOfferBanner';
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import Accordion from 'react-bootstrap/Accordion';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import Image from 'next/image';
import { apiNavCategory } from '@/apis/page_optimization';
import { faArrowRight, faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import MerchantSchemaScripts from '@/components/shared/SchemaScripts/MerchantSchemaScripts';

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
  const filteredVerticalBanners = filterOfferBanners(bannerResponse?.data?.offers || [], 10, 2000, 10, 2000);

  const meta = metaRes?.data;
  const merchant_details = {
    ...merchantDetailsRes,
    mer_meta_title: meta?.meta_title,
    mer_meta_desc: meta?.meta_description,
  };
  const [heading, details] = splitHeadingFromDetails(merchant_details?.data?.merchant_detail);
  return (
    <>
      <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
        <div className="container position-relative">
          <div className="row g-9 g-lg-0 align-items-center py-sm-10 mb-20">
            <div className="store-pages col-lg-6 pe-4 pe-md-10 mb-20" style={{ paddingBottom: '7rem' }}>
              <div className="d-grid gap-4 gap-md-6 mb-8 mb-xl-0">
                <div className="breadcrumb-area">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                      <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                        <Link href={`/`} className="n17-color">Home</Link>
                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                      </li>
                      <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                        <Link href={`/all-stores/A`} className="n17-color text-capitalize">{store_slug}</Link>
                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                      </li>
                      <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color">{merchant_details?.data?.merchant_name}</span></li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sidebar details-section position-relative" style={{ paddingBottom: '30px' }}>
        <div className="container sidebar-toggler position-relative">
          <div className="row">
            <div className="col-lg-5 col-xl-5 col-xxl-4 mt-10 mt-xl-0 anim-rate">
              <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                <div className="side-wrapper bg-transparent rounded-4">
                  <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                    <div className="sidebar-area">
                      <div className="d-grid gap-3 gap-md-4 position-relative">
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-grid gap-3 gap-md-4">
                          <div className="d-center thumb-area rounded-2 w-100">
                            <Image className="w-100 h-100" alt={`${merchant_details?.data?.merchant_name} image`}
                              src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")}
                              width={395} height={220}
                              objectFit='contain'
                              style={{ padding: "20px 50px" }}
                            />
                          </div>
                          <div className="anim-rate d-flex justify-content-center align-items-center my-3 my-md-5" style={{ width: 'auto', margin: '0 auto' }}>
                            <span className="f5-color fw-mid rounded-pill s1-4th-bg-color cus-border border b-sixth p-2 d-flex gap-2 gap-md-3 align-items-center" style={{ minWidth: '200px' }}>
                              <span className="d-center icon-area box-two rounded-circle s1-bg-color n1-color fs-six">
                                {getRandomRating(merchant_details?.data?.rating)}
                              </span>
                              <span className="right-area d-grid gap-1">
                                <span className="star-area d-flex gap-1 mb-1">
                                  <RenderRating rating={getRandomRating(merchant_details?.data?.rating)} />
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                        {merchant_details.data?.faqs.length > 0 && (
                          <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
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
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                          <h4 className="n17-color mb-4 mb-md-6">Similar Stores</h4>
                          {similarMerchant && (
                            <div className="row d-flex justify-content-center top-stores rounded-2 p1-2nd-bg-color cus-border border b-ninth p-1 p-md-2 cus-row g-3">
                              {similarMerchant?.slice(0, 5).map((merchant: Merchant) =>
                                merchant.unique_id !== merchant_id && merchant?.merchant_name?.length < 20 &&(
                                  <div className="col-12 col-md-6" key={merchant.unique_id}>
                                    <StoreCard
                                      merchant={merchant}
                                      mer_slug={store_slug}
                                      mer_slug_type={slug_type}
                                      className='list-merchants-image'
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )}
                          <div className="btn-area mt-3 mt-md-5">
                            <Link href={`/all-stores/A`} className="d-center justify-content-start gap-2 gap-md-3">
                              <span className="p2-color fw-bold">See All Store</span>
                              <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }}/>
                            </Link>
                          </div>
                        </div>
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                          <CategorySidebar categories={categories.data} cat_slug={category_slug} slug_type={slug_type} />
                          <TagsSidebar company_id={company_id} merchant_id={merchant_id} />
                        </div>
                        {filteredVerticalBanners?.length > 0 && (
                          <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                            <VerticalOfferBanner bannerResponse={bannerResponse?.data?.offers} domain={companyDomain} mer_slug={store_slug} slug_type={slug_type} merchantId={merchant_id} companyId={company_id} pagination={bannerResponse?.data?.pagination} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-xl-7 col-xxl-8 cus-z1">
              <div className="d-flex justify-content-between gap-3 flex-wrap mb-5 mb-md-8">
                {heading
                  ? (
                    <h1 className="display-fours n17-color mb-4 mb-md-6 f-40">
                      {discardHTMLTags(heading)}
                    </h1>
                  )
                  : (
                    merchant_details?.data?.merchant_name.length > 15 ? (
                      <h2 className="display-fours n17-color mb-4 mb-md-6 fs-three f-30">
                        {getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)}
                      </h2>
                    ) : (
                      <h1 className="display-fours n17-color mb-4 mb-md-6 f-40">
                        {getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)}
                      </h1>
                    )
                  )
                }
                {offers?.data?.offers.length > 0 && (
                  <p className="fw-bold">
                    All coupons and deals on this page are verified. Last checked: {getLastUpdateDate(1)}.
                  </p>
                )}
                {details && details !== null && discardHTMLTags(details) && (
                <MerchantDetailsShort details={details} />
                )}
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
              {details && details!== null && (
              <MerchantDetailsFull details={details} />
              )}
            </div>
          </div>
        </div>
      </section>
      <MerchantSchemaScripts
        domain={companyDomain}
        mer_slug={store_slug}
        slug_type={slug_type}
        merchant_detail={merchant_details}
      />
    </>
  )
}

export default OffersPage
