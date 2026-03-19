import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionCategories } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import EventBanner from './EventBanner';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import MerchantDetailsShort from './MerchantDetailsShort';
import Banner from './Banner';
import MerchantDetailsFull from './MerchantDetailsFull';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import OfferCardThree from './OfferCardThree';
import { stripHtml } from 'string-strip-html';
import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';
import PromotionOffersSchema from '@/components/shared/SchemaScripts/PromotionOffersSchema';

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const PromotionOffersPage = async ({ params }: { params: string }) => {
    const slug = params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;
    const [promotion, banners, eventMerchants, suggestedPromo, promoOfferBanners, promoCategories] = await Promise.all([
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
    // const eventOfferBanners = (await apiGetEventOfferBanners(companyData?.unique_id, event?.event?.slug))?.data
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

    return (
        <>
            {banners?.length > 0 && (
                <EventBanner domain={companyDomain.domain} banners={banners} eventName={promotion?.promotion?.name} />
            )}
            <section className="banner-sections index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border mt-2">
                <div className="container position-relative">
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
                </div>
            </section>
            <section className="section-sidebars-event details-section position-relative" style={{ paddingBottom: '30px' }}>
                <div className="container sidebar-toggler position-relative">
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
                    <div className="row">
                        <div className="col-xl-8 col-xxl-8 cus-z1">
                            {/* Description Section */}
                            {promotion?.promotion?.description !== null && (
                                <div className="mb-3">
                                    <MerchantDetailsShort details={promotion?.promotion?.description} />
                                </div>
                            )}

                            <div className="singleFilter fourth d-flex flex-column gap-4 gap-md-6">
                                <div className="row g-3">
                                    {allOffers?.map((item, index) => {
                                        // LOGIC: Check where we are in the loop
                                        const isSixthItem = (index + 1) % 6 === 0;
                                        const isTwelfthItem = (index + 1) % 12 === 0;

                                        // LOGIC: Calculate batch for inside the loop
                                        // We show a batch of 4 merchants every 12 items (at index 5, 17, 29...)
                                        const merchantStart = Math.floor(index / 12) * 4;
                                        const merchantEnd = merchantStart + 4;
                                        const currentMerchants = eventMerchants?.slice(merchantStart, merchantEnd);

                                        return (
                                            <React.Fragment key={index}>
                                                {/* 1. Regular Offer Card */}
                                                <div className="col-xl-4 col-lg-4 col-md-6 col-12 cus-z1 overflow-hidden">
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

                                                {/* 2. INJECT: Suggested Brands (Inside Loop) */}
                                                {isSixthItem && !isTwelfthItem && currentMerchants?.length > 0 && (
                                                    <div className="col-12 my-2">
                                                        <div className="w-100 rounded-4 p-4 p-md-5" style={{ backgroundColor: '#fff' }}>
                                                            <h4 className="fw-bold m-0 text-dark mb-4">Suggested Brands</h4>
                                                            <div className="row g-3">
                                                                {currentMerchants.map((merchant, i) => (
                                                                    <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center" key={i}>
                                                                        <SidebarRoundMerchantCard
                                                                            merchant={merchant}
                                                                            merSlug={companyData?.store_slug}
                                                                            slugType={companyData?.slug_type}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 3. INJECT: Banner (Inside Loop) */}
                                                {isTwelfthItem &&
                                                    filteredOfferBanners.length > 0 &&
                                                    filteredOfferBanners[Math.floor(index / 12)] && (
                                                        <div className="col-xl-12 col-lg-12 col-12 banner-container mt-4 mb-4" key={`banner-${Math.floor(index / 12)}`}>
                                                            <Banner
                                                                data={filteredOfferBanners[Math.floor(index / 12)]}
                                                                height={100}
                                                                offerLink={null}
                                                                domain={companyDomain.domain}
                                                                mer_slug={companyData?.store_slug}
                                                                slug_type={companyData?.slug_type}
                                                            />
                                                        </div>
                                                    )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>

                                {(() => {
                                    const totalOffers = allOffers?.length || 0;
                                    // Formula: How many full batches of 4 were already triggered in the loop?
                                    // Triggers happen at 6th, 18th, 30th item... (Cycle of 12 starting at 6)
                                    const batchesShown = Math.floor((totalOffers + 6) / 12);
                                    const merchantsAlreadyShown = batchesShown * 4;

                                    // Get everyone else who wasn't shown
                                    const remainingMerchants = eventMerchants?.slice(merchantsAlreadyShown) || [];

                                    // Only render if we actually have merchants left to show
                                    if (remainingMerchants.length > 0) {
                                        return (
                                            <div className="w-100 rounded-4 p-4 p-md-5 mt-4" style={{ backgroundColor: '#fff' }}>
                                                <div className="d-flex align-items-center justify-content-between mb-4">
                                                    <h4 className="fw-bold m-0 text-dark">
                                                        {merchantsAlreadyShown === 0 ? "Suggested Brands" : "More Brands"}
                                                    </h4>
                                                </div>
                                                <div className="row g-3">
                                                    {remainingMerchants.map((merchant, i) => (
                                                        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-center" key={i}>
                                                            <SidebarRoundMerchantCard
                                                                merchant={merchant}
                                                                merSlug={companyData?.store_slug}
                                                                slugType={companyData?.slug_type}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })()}

                            </div>
                            {showFullDetailsSection && (
                                <div className="my-3">
                                    <MerchantDetailsFull details={promotion?.promotion?.description} />
                                </div>
                            )}
                        </div>
                        <div className="col-xl-4 col-xxl-4 mt-10 mt-xl-0 anim-rate">
                            {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                                    <div className="side-wrapper bg-transparent rounded-4">
                                        <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                                            <div className="sidebar-area">
                                                <div className="d-grid gap-3 gap-md-4 position-relative">
                                                    <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                                        {suggestedCategories?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Suggested Categories for Promotions</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <div className="sidebar-categories py-3 mb-5">
                                                                    <ul className="sidebar-category-list">
                                                                        {suggestedCategories?.map((cat, i) => (
                                                                            <li key={i} className="sidebar-category-item">

                                                                                <Link href={`/${cat?.url}`} className="sidebar-category-link">
                                                                                    {cat?.category_name}
                                                                                </Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )}
                                                        {/* {eventMerchants?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Suggested Brands</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <div className="row g-2 py-3 mb-5">
                                                                    {eventMerchants?.length > 0 && (
                                                                        eventMerchants?.map((merchant, i) => (
                                                                            <div className='col-12 col-md-6 col-lg-6 d-center' key={i}>
                                                                                <SidebarRoundMerchantCard merchant={merchant} merSlug={companyData?.store_slug} slugType={companyData?.slug_type} />
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </div>
                                                            </>
                                                        )} */}
                                                        {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">Banner Offers</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>

                                                                {offerBanners?.length > 0 && filteredVerticalBanners?.length > 0 && (
                                                                    <VerticalEventOfferBanner bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                                                                )}
                                                            </>
                                                        )}
                                                        {suggestedPromotions?.length > 0 && (
                                                            <>
                                                                <h4 className="n17-color">You May Also Like These Promotions</h4>
                                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                                <ul className="d-flex flex-column gap-3 gap-md-4 py-3 mb-5">
                                                                    {suggestedPromotions?.map((suggestedPromotion, i) => (
                                                                        <li key={i} className='overflow-hidden'>
                                                                            <Link href={getPromotionHref(suggestedPromotion, companyData?.promotion_slug)} className="box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex">
                                                                                {suggestedPromotion?.name.split(' ').length > 5 ? (
                                                                                    <span className="fs-six d-inline-block transition f-15 fw-5" style={{ color: 'rgb(64 74 96)', whiteSpace: 'normal' }}>
                                                                                        {suggestedPromotion?.name}
                                                                                    </span>
                                                                                ) : (
                                                                                    <span className="fs-six text-nowrap transition f-15 fw-5" style={{ color: 'rgb(64 74 96)' }}>
                                                                                        {suggestedPromotion?.name}
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
            <PromotionOffersSchema companyId={companyData?.unique_id} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug} slugType={companyData?.slug_type} merSlug={companyData?.store_slug} />
        </>
    )
}

export default PromotionOffersPage
