import { apiGetSimilarMerchants, apiMerchantDetails } from '@/apis/merchant';
import { apiOfferBanners, apiSpecificOffers } from '@/apis/offers';
import { apiNavCategory } from '@/apis/page_optimization';
import { apiGetMetaData } from '@/apis/user';
import MerchantSchemaScripts from '@/components/shared/SchemaScripts/MerchantSchemaScripts';
import { discardHTMLTags, filterOfferBanners, getBaseImageUrl, getLastUpdateDate, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import MerchantDetailsShort from './MerchantDetailsShort';
import RenderRating from './RenderRating';
import MerchantDetailsFull from './MerchantDetailsFull';
import StoreCardTwo from './StoreCardTwo';
import CategorySidebar from './CategorySidebar';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import SidebarBanners from './SidebarBanners';
import MerchantFaqsSidebar from './MerchantFaqsSidebar';
import LazyLoadingOffers from './LazyLoadingOffers';
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
    const [awaited_p_id, bannerResponse, categories, offers, similarMerchantsRes, cookieDomain, metaRes, merchantDetailsRes] = await Promise.all([
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
    const filteredVerticalBanners = filterOfferBanners(bannerResponse?.data?.offers || [], 50, 2000, 65, 2000);

    const meta = metaRes?.data;
    const merchant_details = {
        ...merchantDetailsRes,
        mer_meta_title: meta?.meta_title,
        mer_meta_desc: meta?.meta_description,
    };
    const [heading, details] = splitHeadingFromDetails(merchant_details?.data?.merchant_detail);

    return (
        <>
            <div className="breadcrumb-section">
                <div className="breadcrumb-text">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Left (Breadcrumb text) */}
                            <div className="col-md-6 col-sm-12">
                                <div className="breadcrumb-text padTB50">
                                    <h1 className="page-heading">
                                        {heading ? (
                                            discardHTMLTags(heading)
                                        ) : (
                                            getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)
                                        )}
                                    </h1>
                                    <ul className="breadcrumb-list">
                                        <li><Link href="/" className='text-capitalize'>Home</Link></li>
                                        <li><Link href={`/all-stores/A`} className='text-capitalize'>{store_slug}</Link></li>
                                        <li className='text-capitalize'>{merchant_details?.data?.merchant_name}</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Right (Image container) */}
                            <div className="col-md-6 col-sm-12 d-flex justify-content-center justify-content-md-end py-3">
                                <div className="merchantx-hero-left gap-1">
                                    <div className="merchantx-logo">
                                        <Image src={getBaseImageUrl(companyDomain, merchant_details?.data?.merchant_logo, "")} alt={merchant_details?.data?.merchant_name} objectFit='contain' height={200} width={200} />
                                    </div>
                                    <div className="merchantx-rating d-center">
                                        <RenderRating rating={merchant_details?.data?.rating ? merchant_details?.data?.rating : getRandomRating(merchant_details?.data?.rating)} />
                                        <span className="text-dark">({merchant_details?.data?.rating ? merchant_details?.data?.rating : getRandomRating(merchant_details?.data?.rating)})</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section bg">
                <div className="container">
                    <div className="merchantx-page">
                        {/* Offers Section */}
                        <section className="merchantx-offers">
                            {/* <h2 className="merchantx-section-title">{getRandomStoreSeoTitle(merchant_details?.data?.merchant_name)}</h2> */}
                            <div className="row g-3">
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-12 col-md-12 col-lg-12">
                                            <section className="merchantx-hero">
                                                <div className="merchantx-hero-right">
                                                    <p className="merchantx-subtext">
                                                        All coupons and deals on this page are verified. Last checked: {getLastUpdateDate(1)}.
                                                    </p>
                                                    {merchant_details?.data?.merchant_detail !== null && (
                                                        <MerchantDetailsShort details={merchant_details?.data?.merchant_detail} />
                                                    )}
                                                </div>
                                            </section>
                                        </div>

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
                                    {merchant_details?.data?.merchant_detail!==null && (
                                        <section>
                                            <MerchantDetailsFull details={merchant_details?.data?.merchant_detail} />
                                        </section>
                                    )}
                                </div>
                                <div className="col-lg-4 d-flex flex-column gap-3">
                                    <aside className="sidebar-box p-3 rounded-3 shadow-sm b-seventh">
                                        <h3 className="merchantx-section-title sidebar-heading">Similar Stores</h3>
                                        <div className="row g-3">
                                            {similarMerchant?.length > 0 && similarMerchant?.map((store, i) => (
                                                <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-6 flex-shrink-0 px-2">
                                                    <StoreCardTwo mer_slug={store_slug} mer_slug_type={slug_type} merchant={store} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="btn-area mt-4 mt-md-6">
                                            <Link href={`/all-stores/A`} className="justify-content-start gap-2 gap-md-3 d-flex align-items-center">
                                                <span className="p2-color fw-bold">See All Stores</span>
                                                <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </div>
                                    </aside>
                                    <MerchantFaqsSidebar faqs={merchantDetailsRes?.data?.faqs} merchantName={merchantDetailsRes?.data?.merchant_name} />
                                    {categories?.data?.length > 0 && (
                                        <CategorySidebar categories={categories?.data} />
                                    )}
                                    {bannerResponse?.data?.offers?.length > 0 && filteredVerticalBanners.length > 0 && (
                                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3">
                                            <h4 className='text-capitalize sidebar-heading'>Banner Offers</h4>
                                            <SidebarBanners bannerResponse={filteredVerticalBanners} domain={companyDomain} mer_slug={store_slug} slug_type={slug_type} companyId={company_id} pageType='store' merchantId={merchant_id} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div >
            </div >
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
