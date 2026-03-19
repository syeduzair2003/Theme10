import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetPromotionBanners, apiGetPromotionCategories, apiGetPromotionDetails, apiGetPromotionOfferBanners, apiGetPromotionSuggestedMerchants } from '@/apis/user';
import { cleanHtmlContent, extractAllOffers, extractFirstSentences, filterOfferBanners, getMerchantHref, getProductDetailHref, getPromotionHref, getRandomPromotionSeoTitle, processOffers } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { EventMerchant, MerchantWithOffers, Offer } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import React from 'react'
import EventBanner from './EventBanner';
import Link from 'next/link';
import MerchantDetailsShort from './MerchantDetailsShort';
import CouponCard from './CouponCard';
import MerchantDetailsFull from './MerchantDetailsFull';
import SidebarBanners from './SidebarBanners';
import Banner from './Banner';
import PromotionFilterBar from './PromotionFilterBar';
import { stripHtml } from 'string-strip-html';
import StoreCardTwo from './StoreCardTwo';

// --- Types ---
type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

type PromotionProps = {
    params: string;
    type?: string;
    sort?: string;
};

const PromotionOffersPage = async ({ params, type, sort }: PromotionProps) => {
    const slug = params;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;
    const bannerDisplayAfter = 6;

    const filterType = type && typeof type === 'string' ? type : undefined;
    const sortBy = sort && typeof sort === 'string' ? sort : undefined;

    // --- Data Fetching (Same as Event Page) ---
    const [promotion, banners, promoMerchants, suggestedPromo, promoOfferBanners, promoCategories] = await Promise.all([
        apiGetPromotionDetails(companyData?.unique_id, slug).then(res => res.data),
        apiGetPromotionBanners(companyData?.unique_id, slug).then(res => res.data),
        apiGetPromotionSuggestedMerchants(companyData?.unique_id, slug).then(res => res.data),
        apiGetAllPromotion(companyDomain.domain).then(res => res.data),
        apiGetPromotionOfferBanners(companyData?.unique_id, slug).then(res => res.data),
        apiGetPromotionCategories(companyData?.unique_id, slug).then(res => res.data),
    ]);
    const suggestedCategories = promoCategories?.selected_categories;

    const suggestedPromotions = suggestedPromo?.filter(promo => promo.slug !== slug);

    if (!promotion) {
        return notFound();
    }

    // --- Data Processing ---
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

    const displayedOffers = processOffers(allOffers, filterType, sortBy);

    const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '');
    const plainDesc = stripHtml(cleanDesc).result;
    const shortDesc = extractFirstSentences(plainDesc);

    const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5);
    const seoTitle = getRandomPromotionSeoTitle(promotion?.promotion?.name);

    return (
        <>
            {/* UI Change 1: Render Banner at the very top if available */}
            {banners?.length > 0 && (
                <EventBanner domain={companyDomain.domain} banners={banners} eventName={promotion?.promotion?.name} />
            )}

            <div className="contact-section bg z-10">
                <div className="container">
                    <div className="breadcrumb-text breadcrumb-dark-text py-3">
                        <h1 className='page-heading z-1000'>{seoTitle}</h1>
                        <ul className="breadcrumb-list text-dark z-1000 position-relative">
                            <li><Link href="/" className='text-capitalize'>Home</Link></li>
                            <li><Link href={`/${companyData?.promotion_slug}`} className='text-capitalize'>Promotions</Link></li>
                            <li className='text-capitalize'>{promotion?.promotion?.name}</li>
                        </ul>
                    </div>

                    {/* UI Fix 3: Details Area - Professional Card Look */}
                    {promotion?.promotion?.description !== null && (
                        <div className="mb-3">
                            <MerchantDetailsShort details={promotion?.promotion?.description} />
                        </div>
                    )}

                    {/* Filter Bar */}
                    <PromotionFilterBar
                        promoSlug={companyData?.promotion_slug}
                        slug={slug}
                        currentType={filterType}
                        currentSort={sortBy}
                    />

                    <div className="row g-4 promotion-row">

                        {/* Main Content (Scrollable) */}
                        <div className="col-xl-9 col-xxl-9 col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="m-0 fw-bold text-dark">
                                    {filterType === 'code' ? 'Coupons' : filterType === 'deal' ? 'Deals' : 'All Offers'}
                                    <span className="text-muted ms-2 fw-light fs-5">({displayedOffers.length})</span>
                                </h4>
                            </div>

                            <section className="promotion-grid mb-3">
                                <div className="row g-3">
                                    {displayedOffers?.length > 0 ? (
                                        displayedOffers.map((item, index) => (
                                            <React.Fragment key={index}>
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <CouponCard
                                                        merchantHref={getMerchantHref(item?.merchant, companyData?.store_slug, companyData?.slug_type)}
                                                        merchant_logo={item?.merchant?.merchant_logo}
                                                        merchant_name={item?.merchant?.merchant_name}
                                                        offer={item?.offer}
                                                        type={item?.offer?.offer_type?.name}
                                                        pageType="event"
                                                        productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, companyData?.slug_type, item?.offer?.slug): null}
                                                    />
                                                </div>
                                                {(index + 1) % bannerDisplayAfter === 0 && filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (
                                                    <div className="col-12 my-3">
                                                        <div className="banner-container w-100 rounded overflow-hidden shadow-sm">
                                                            <Banner data={filteredOfferBanners[Math.floor(index / bannerDisplayAfter)]} height={120} offerLink={null} domain={companyDomain?.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} />
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-5 bg-white rounded-3 shadow-sm">
                                            <h5 className="text-dark">No offers found</h5>
                                            <Link href={`/promotion/${slug}`} className="btn btn-outline-primary btn-sm mt-2">Reset Filters</Link>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {showFullDetailsSection && (
                                <MerchantDetailsFull details={promotion?.promotion?.description} />
                            )}
                        </div>

                        {/* Sidebar (Sticky) */}
                        <div className="col-xl-3 col-xxl-3 col-lg-4">
                            {/* {promoMerchants?.length > 0 && (
                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                    <h4 className='sidebar-heading'>Best Performing Merchants</h4>
                                    <div className="row g-2 py-3 mb-5">
                                        {promoMerchants?.map((merchant: EventMerchant, i: number) => (
                                            <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-6 flex-shrink-0 px-2">
                                                <StoreCardTwo mer_slug={companyData?.store_slug} mer_slug_type={companyData?.slug_type} merchant={merchant} />
                                            </div>
                                        ))
                                        }
                                    </div>
                                </div>
                            )} */}
                            {/* {suggestedCategories?.length > 0 && (
                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                    <h4 className='sidebar-heading'>Shop by our trending categories</h4>
                                    <ul className="sidebar-list list-unstyled m-0 p-0">
                                        {suggestedCategories?.map((cat, idx) => {
                                            return (
                                                <li
                                                    key={idx}
                                                    className={`sidebar-item mb-2`}
                                                >
                                                    <Link
                                                        href={`/${cat?.url}`}
                                                        className="sidebar-link d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
                                                    >
                                                        <span className="text-capitalize">{cat?.category_name}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )} */}
                            {filteredVerticalBanners?.length > 0 && (
                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                    <h4 className='sidebar-heading'>Featured Offers</h4>
                                    <div className="d-flex justify-content-center">
                                        <SidebarBanners bannerResponse={filteredVerticalBanners} domain={companyDomain.domain} mer_slug={companyData?.store_slug} slug_type={companyData?.slug_type} companyId={companyData?.unique_id} pageType='event' />
                                    </div>
                                </div>
                            )}
                            {/* {suggestedPromotions?.length > 0 && (
                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                    <h4 className='sidebar-heading'>Related Promotions</h4>
                                    <ul className="navsearch-tags-list d-flex flex-column gap-2 p-0">
                                        {suggestedPromotions?.length > 0 &&
                                            suggestedPromotions?.map((item, i) => (
                                                <li key={i} className="navsearch-tag-item m-0">
                                                    <Link
                                                        href={getPromotionHref(item, companyData?.promotion_slug)}
                                                    >
                                                        {item?.name}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default PromotionOffersPage