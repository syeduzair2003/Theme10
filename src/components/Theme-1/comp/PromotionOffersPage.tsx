import { apiGetEventOfferBanners, apiGetEventSuggestedMerchants } from '@/apis/offers';
import { apiCategoryWithSub, apiCompanyUpdatedData, apiGetAllEvents, apiGetAllPromotion, apiGetEventBanners, apiGetPromotionBanners, apiGetPromotionCategories, apiGetPromotionDetails, apiGetPromotionOfferBanners, apiGetPromotionSuggestedMerchants, apiSuggestedCategory } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getBaseImageUrl, getEventsHref, getMerchantHref, getProductDetailHref, getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CategoryChild, EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import EventBanner from './EventBanner';
import VerticalEventOfferBanner from './VerticalEventOfferBanner';
import { stripHtml } from 'string-strip-html';
import EventMerDetail from './EventMerDetail';
import EventsCardUpdated from './EventsCardUpdated';
import SidebarSquareMerchantCard from './SidebarSquareMerchantCard';
import MerchantDetailsShort from './MerchantDetailsShort';
import MerchantDetailsFull from './MerchantDetailsFull';
import { apiGetPromoOfferBanners, apiGetPromotionOffers, apiGetSubPromoBanners, apiGetSubPromoSuggestedMerchant } from '@/apis/page_optimization';
import PromotionOffersSchema from '@/components/shared/SchemaScripts/PromotionOffersSchema';

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
                                            <a href={"/promotion"} className="breadcrumb-list__link text-body hover-text-main">Promotion</a>
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
            </section>

            <section className='mt-3'>
                <div className="container mb-3">
                    <div className="row flex-column flex-xl-row flex-lg-row flex-md-row g-3">
                        {promotion?.promotion?.description !== null && (
                            <div className="mb-3">
                                <MerchantDetailsShort details={promotion?.promotion?.description} />
                            </div>
                        )}
                        <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">
                            <div className="row g-3 ">
                                {allOffers?.length > 0 &&
                                    allOffers.map((mer, i) => (
                                        <div key={i} className="col-xl-4 col-lg-6 col-md-12 col-sm-12 ">
                                            <EventsCardUpdated
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
                        </div>
                        {showFullDetailsSection && (
                            <div className="my-3">
                                <MerchantDetailsFull details={promotion?.promotion?.description} />
                            </div>
                        )}

                        <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
                            <div className="d-grid gap-3 gap-md-4 position-relative my-4">

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

                                {eventMer?.length > 0 && (
                                    <div className="my-3 mt-2 ts-container">
                                        <div className="sidebar-suggested-brands">
                                            <h4 className="n17-color">Suggested Brands</h4>
                                            <span className="v-line"></span>

                                            <div className="row g-2 py-3 mb-5">
                                                {eventMer?.map((merchant, i: number) => (
                                                    <div className='col-12 col-md-6 col-lg-6 d-center' key={i}>
                                                        <SidebarSquareMerchantCard
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

                                {/* FIXED SECTION */}
                                {suggestedPromo?.length > 0 && (
                                    <div className="my-3 mt-2 ts-container">
                                        <div className="suggested-events-section">
                                            <h4 className="n17-color">You May Also Like These</h4>
                                            <span className="v-line"></span>

                                            <ul className="d-flex flex-column gap-3 gap-md-4 py-3 mb-2">
                                                {suggestedPromo
                                                    ?.filter(sp => sp.slug !== slug?.[0])
                                                    .map((sp, i) => (
                                                        <li key={i} className='overflow-hidden'>
                                                            <Link
                                                                href={getPromotionHref(sp, 'promotion')}
                                                                className="event-pill-link"
                                                            >
                                                                <span className="text-nowrap">
                                                                    {sp?.name}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {offerBanners?.length > 0 && filteredVerticalBanners.length > 0 && (
                                    <div className="modern-sidebar p-4 rounded-4 shadow-sm bg-white mb-3">
                                        <VerticalEventOfferBanner
                                            bannerResponse={filteredVerticalBanners}
                                            domain={companyDomain.domain}
                                            mer_slug={companyData?.store_slug}
                                            slug_type={companyData?.slug_type}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <PromotionOffersSchema companyId={companyData?.unique_id} slug={slug} promotionName={promotion?.promotion?.name} promoSlug={companyData?.promotion_slug} slugType={companyData?.slug_type} merSlug={companyData?.store_slug} />
        </>
    );
};

export default PromotionOffersPage;
