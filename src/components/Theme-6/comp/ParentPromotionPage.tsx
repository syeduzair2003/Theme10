import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getProductDetailHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import Image from 'next/image';
import Link from 'next/link';
import EventsCard from './EventsCard';
import MerchantDetailsFull from './MerchantDetailsFull';
import ParentPromotionSchema from '@/components/shared/SchemaScripts/ParentPromotionSchema';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import { SubPromoSlider } from './SubPromoSlider';
import BottomMerchantCard from './BottomMerchantCard';


type MerchantOfferItem = {
  offer: Offer;
  merchant: MerchantWithOffers;
};

const ParentPromotionPage = async ({ params }: { params: string }) => {
  const slug = params;
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  const [promotion, subPromotions] = await Promise.all([
    apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
    apiGetSubPromotion(companyData?.unique_id, slug).then(res => res.data),
  ]);

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

  return (
    <>
      <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">
        <section className="breadcrumb-green">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div className="text-center">
                <ul className="flx-align gap-2 mb-2 justify-content-center">
                  {/* Home Link */}
                  <li className="font-14 text-body">
                    <a href={"/"} className="text-body hover-text-main">
                      Home
                    </a>
                  </li>

                  <li className="font-14 text-body">
                    <span className="font-10">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        style={{ width: "10px", height: "10px", color: "white" }}
                      />
                    </span>
                  </li>

                  {/* Promotions Link */}
                  <li className="font-14 text-body">
                    <a href={"/promotion"} className="text-body hover-text-main">
                      Promotions
                    </a>
                  </li>

                  <li className="font-14 text-body">
                    <span className="font-10">
                      <FontAwesomeIcon
                        icon={faGreaterThan}
                        style={{ width: "10px", height: "10px", color: "white" }}
                      />
                    </span>
                  </li>

                  {/* Dynamic Page Name */}
                  <li className="font-14 text-body">
                    <span className="text-white">{promotion?.promotion?.name}</span>
                  </li>
                </ul>

                {/* Dynamic Title */}
                <h1 className="mb-0 text-capitalize text-white">
                  {promotion?.promotion?.name}
                </h1>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* details  */}
      <div className="container sidebar-toggler position-relative p-0">
        <div className="d-flex justify-content-between gap-3 flex-wrap mb-2">
        </div>
        {promotion?.promotion?.description !== null && (
          <div className="mb-3">
            <MerchantDetailsShort details={promotion?.promotion?.description} />
          </div>
        )}
      </div>

      <section style={{ paddingBottom: '30px', marginTop: '30px' }}>
        <div className="container sidebar-toggler position-relative">
          {subPromotions && subPromotions.length > 0 && (
            <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6 mb-10">
              <div className="row g-4">
                <h2 className="n17-color" style={{ fontSize: '30px' }}>
                  Explore Sub Promotions
                </h2>
                <SubPromoSlider itemsPerSlide={3}>
                  {subPromotions.map((item: SubPromotion, index: number) => (
                    <div key={index} className="w-100">
                      <Link
                        href={getPromotionHref(item, companyData?.promotion_slug)}
                        className="d-block w-100 text-decoration-none"
                      >
                        <div className="sub-promo-card">
                          <Image
                            src={getBaseImageUrl(companyDomain?.domain, item?.category_image, '')}
                            alt={item?.category_name}
                            fill // IMPORTANT: This makes the image adapt to the 180px card height
                            className="sub-promo-image"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 3}
                          />

                          <div className="sub-promo-overlay" />
                          <div className="sub-promo-content">
                            <h3 className="sub-promo-title">
                              {item.category_name}
                            </h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </SubPromoSlider>
              </div>
            </div>
          )}
          <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6">
            <div className="row g-3">
              <h2 className="n17-color pt-4 mb-2" style={{ fontSize: '30px' }}>
                Top Rated Deals
              </h2>
              {allOffers?.map((item, index) => (
                <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-12 ">
                  <EventsCard
                    item={item?.offer}
                    merchantHref={getMerchantHref(item.merchant, companyData?.store_slug, companyData?.slug_type)}
                    merchant_name={item.merchant?.merchant_name}
                    merchant_logo={item.merchant?.merchant_logo}
                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item.merchant, companyData?.slug_type, item?.offer?.slug) : null}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="singleFilter fourth d-flex mt-4">
            <div className="row g-3">
               <h2 className="n17-color pt-4 mb-2" style={{ fontSize: '30px' }}>
                Top Rated Merchants in {promotion?.promotion?.name}
              </h2>
              <div
                className="merchant-grid-wrapper rounded-4 overflow-hidden"
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    background: "rgb(224, 242, 241)",
                    border: "1px solid #c7eaea",
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                >
                  {allOffers?.map((item, index) => {
                    const isLastInRow = (index + 1) % 5 === 0;

                    return (
                      <div
                        key={index}
                        style={{
                          width: "20%", // ✅ 5 per row
                          display: "flex",
                          justifyContent: "center",
                          padding: "16px",
                          borderRight: isLastInRow ? "none" : "1px solid #c7eaea",
                          borderBottom: "1px solid #c7eaea",
                          boxSizing: "border-box",
                        }}
                        className="pormo-bottom-merchant"
                      >
                        <BottomMerchantCard
                          merSlug={companyData?.store_slug}
                          slugType={companyData?.slug_type}
                          merchant={item?.merchant}
                        />
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>
          </div>
          {showFullDetailsSection && (
            <div className="my-3">
              <MerchantDetailsFull details={promotion?.promotion?.description} />
            </div>
          )}
        </div>
      </section>
      <ParentPromotionSchema companyId={companyData?.unique_id} company_name={companyData?.company_name} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug} />
    </>
  )
}

export default ParentPromotionPage
