import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getProductDetailHref, getPromotionHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
// import OfferCardThree from './OfferCardThree';
// import RoundedMerchantHome from './RoundedMerchantHome';
// import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import Image from 'next/image';
import EventsCardUpdated from './EventsCardUpdated';
import SubPromoSlider from './SubPromoSlider';
import BottomMerchantCard from './BottomMerchantCard';
import ParentPromotionSchema from '@/components/shared/SchemaScripts/ParentPromotionSchema';

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
                <div className="breadcrumb-two">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern"
                        className="bg-pattern"
                        width={1000}
                        height={400}
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
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href={"/promotion"} className="breadcrumb-list__link text-body hover-text-main">Promotions</a>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text">{promotion?.promotion?.name}</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">
                                        {promotion?.promotion?.name}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container sidebar-toggler position-relative p-0">
                    <div className="d-flex justify-content-between gap-3 flex-wrap mb-2">
                        {/* {promotion?.promotion?.description?.length > 15 ?
                            (
                                <h1 className="display-four n17-color mb-2 fs-three f-30">
                                    {`${promotion?.promotion?.name}`}
                                </h1>
                            ) : (
                                <h1 className="display-four n17-color mb-2 mb-md-6 f-40">
                                    {`${promotion?.promotion?.name}`}
                                </h1>
                            )
                        } */}
                    </div>
                    {promotion?.promotion?.description !== null && (
                        <div className="mb-3">
                            <MerchantDetailsShort details={promotion?.promotion?.description} />
                        </div>
                    )}
                </div>
            </section>
            <section style={{ paddingBottom: '30px', marginTop: '30px' }}>
                <div className="container sidebar-toggler position-relative">
                    {subPromotions && subPromotions.length > 0 && (
                        <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6 mb-10">
                            <div className="row g-4">
                                <h2 className="display-four n17-color mb-2 fs-three f-29">
                                    Explore Sub Promotions
                                </h2>
                                <SubPromoSlider itemsPerSlide={3}>
                                    {subPromotions.map((item: SubPromotion, index: number) => (
                                        <div key={index} className="col-12">
                                            <Link
                                                href={getPromotionHref(item, companyData?.promotion_slug)}
                                                className="d-block w-100 text-decoration-none"
                                            >
                                                {/* Container for Image & Overlay */}
                                                <div
                                                    className="position-relative overflow-hidden rounded-4 shadow-sm"
                                                    style={{ height: '220px' }}
                                                >
                                                    {/* Background Image */}
                                                    <Image
                                                        src={getBaseImageUrl(companyDomain?.domain, item?.category_image, "")}
                                                        alt={item?.category_name}
                                                        className="w-100 h-100"
                                                        height={220}
                                                        width={350}
                                                        style={{
                                                            // objectFit: 'contain',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                    />
                                                    <div
                                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
                                                        style={{
                                                            // UPDATED GRADIENT: Lighter opacity (0.1 to 0.4)
                                                            background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4))',
                                                            zIndex: 2
                                                        }}
                                                    >
                                                        <h3
                                                            className="text-white text-center text-capitalize fw-bold m-0"
                                                            style={{
                                                                fontSize: '24px',
                                                                letterSpacing: '0.5px',
                                                                // Kept the text shadow to ensure readability on lighter images
                                                                textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                                                            }}
                                                        >
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
                            <h2 className="display-four n17-color mb-2 fs-three f-29">
                                Top Rated Deals
                            </h2>
                            {allOffers?.map((item, index) => (
                                <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-12 cus-z1 overflow-hidden">
                                    <EventsCardUpdated
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
                            <h2 className="display-four n17-color mb-2 fs-three f-29">
                                Top Rated Merchants in {promotion?.promotion?.name}
                            </h2>
                            <div
                                className="merchant-grid-wrapper rounded-4 overflow-hidden"
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        background: "#f4fbff",
                                        border: "1px solid #b9e3ff",
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
                                                    borderRight: isLastInRow ? "none" : "1px solid #b9e3ff",
                                                    borderBottom: "1px solid #b9e3ff",
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
