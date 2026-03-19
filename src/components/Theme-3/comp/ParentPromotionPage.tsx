import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization';
import { apiCompanyUpdatedData } from '@/apis/user';
import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import { stripHtml } from 'string-strip-html';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import OfferCardThree from './OfferCardThree';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import Image from 'next/image';
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
            <section className="banner-sections index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border mt-2">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center py-sm-8">
                        <div className="col-lg-6 pe-4 pe-md-10">
                            <div className="d-grid gap-4 gap-md-6 mb-8 mb-xl-0">
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/${companyData?.promotion_slug}`} className="n17-color text-capitalize">Promotions</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven n17-color text-capitalize">{promotion?.promotion?.name}</li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container sidebar-toggler position-relative p-0">
                        <div className="d-flex justify-content-between gap-3 flex-wrap mb-2">
                            {promotion?.promotion?.description?.length > 15 ?
                                (
                                    <h1 className="display-four n17-color mb-2 fs-three f-30">
                                        {`${promotion?.promotion?.name}`}
                                    </h1>
                                ) : (
                                    <h1 className="display-four n17-color mb-2 mb-md-6 f-40">
                                        {`${promotion?.promotion?.name}`}
                                    </h1>
                                )
                            }
                        </div>
                        {promotion?.promotion?.description !== null && (
                            <div className="mb-3">
                                <MerchantDetailsShort details={promotion?.promotion?.description} />
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section style={{ paddingBottom: '30px', marginTop: '30px' }}>
                <div className="container sidebar-toggler position-relative">
                    {subPromotions && subPromotions.length > 0 && (
                        <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6 mb-10">
                            <div className="row g-4">
                                <h2 className="display-four n17-color mb-2 fs-three f-29">
                                    Suggested {promotion?.promotion?.name} by Categories
                                </h2>
                                {subPromotions.map((item: SubPromotion, index: number) => (
                                    <div key={index} className="col-lg-6 col-md-6 col-12 category-card">
                                        <Link
                                            href={getPromotionHref(item, companyData?.promotion_slug)}
                                            className="d-block w-100 text-decoration-none"
                                        >
                                            {/* 1. Image Container (Independent of text) */}
                                            <div
                                                className="position-relative overflow-hidden rounded-4 shadow-sm"
                                                style={{ height: '250px' }} // Increased height slightly for better aspect ratio
                                            >
                                                <Image
                                                    src={getBaseImageUrl(companyDomain?.domain, item?.category_image, "")}
                                                    alt={item?.category_name}
                                                    className="w-100 h-100 banner-img"
                                                    height={250}
                                                    width={400}
                                                />
                                                <span
                                                    className="text-white text-center text-capitalize fw-bold m-0 promo-banner-text"
                                                    style={{
                                                        fontSize: '24px',
                                                        letterSpacing: '0.5px',
                                                        // Kept the text shadow to ensure readability on lighter images
                                                        textShadow: '0 2px 4px rgba(0,0,0,0.6)'
                                                    }}
                                                >
                                                    {item?.category_detail !== null ? item?.category_detail : item?.category_name}
                                                </span>
                                            </div>

                                            {/* 2. Text Section (Below the image) */}
                                            <div className="mt-3 ps-1">
                                                <h3
                                                    className="n17-color fw-bold m-0 banner-text text-center"
                                                    style={{
                                                        fontSize: '24px',
                                                        fontFamily: "'Poppins', sans-serif",
                                                        letterSpacing: '0.5px',
                                                    }}
                                                >
                                                    {item?.category_name}
                                                </h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
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
                                    <OfferCardThree
                                        product={item?.offer}
                                        merchantHref={getMerchantHref(
                                            item.merchant,
                                            companyData?.store_slug,
                                            companyData?.slug_type
                                        )}
                                        domain={companyDomain.domain}
                                        merchant_name={item.merchant?.merchant_name}
                                        merchant_logo={item.merchant?.merchant_logo}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6 my-10">
                        <div className="row g-3">
                            <h2 className="display-four n17-color mb-2 fs-three f-29">
                                Top Rated Merchants in {promotion?.promotion?.name}
                            </h2>
                            {allOffers?.map((item, index) => (
                                <div key={index} className="col-xl-2 col-lg-2 col-md-3 col-6 cus-z1 overflow-hidden">
                                    <SidebarRoundMerchantCard
                                        merSlug={companyData?.store_slug}
                                        slugType={companyData?.slug_type}
                                        merchant={item?.merchant}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    {showFullDetailsSection && (
                        <div className="my-3">
                            <MerchantDetailsFull details={promotion?.promotion?.description} />
                        </div>
                    )}
                </div>
            </section>
            <ParentPromotionSchema companyId={companyData?.unique_id} company_name={companyData?.company_name} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug}/>
        </>
    )
}

export default ParentPromotionPage
