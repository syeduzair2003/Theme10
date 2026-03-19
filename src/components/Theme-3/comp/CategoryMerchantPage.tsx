import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import { apiMerchantDetailsByCategory } from '@/apis/merchant'
import Image from 'next/image'
import Link from 'next/link'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import { getRandomCategoryCouponsTitle, getRandomCategorySeoTitle } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import CategoryCards from './CategoryCards'
import ScrollButtonRight from './ScrollButtonRight'
import ScrollButtonLeft from './ScrollButtonLeft'
import StoreCard from './StoreCard'
import VerticalCategoryOfferBanner from './VerticalCategoryOfferBanner'
import CategoryOffers from './CategoryOffers'
import CategorySidebar from './CategorySidebar'
import { apiCategoryOfferBanners, apiSuggestedCategory } from '@/apis/user'

interface Props {
    categoryId: string,
    categoryName: string,
    store_slug: string,
    company_id: string,
    slug_type: string,
    url_slug: string[],
    page?: string;
    categorySlug: string;
}
const CategoryMerchantPage = async ({ categoryId, categoryName, store_slug, categorySlug, company_id, slug_type, url_slug, page }: Props) => {
    const categories = (await apiSuggestedCategory(company_id)).data
    const merchants = await apiMerchantDetailsByCategory(categoryId, company_id)
    const domain = (await cookieService.get("domain")).domain;
    const bannerResponse = (await apiCategoryOfferBanners(categoryId, company_id, 1)).data
    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">{getRandomCategorySeoTitle(categoryName)}</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </li>
                                            {url_slug?.slice(0, url_slug?.length - 1)?.map((slug, index) => {
                                                const href = `/${url_slug.slice(0, index + 1).join('/')}`;
                                                return (
                                                    <li key={index} className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                        <Link href={href} className="n17-color text-capitalize">
                                                            {slug.replace(/-/g, ' ')}
                                                        </Link>
                                                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                    </li>
                                                );
                                            })}
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color">{categoryName}</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-10.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-sidebar py-5">
                <div className="container mb-7">
                    <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                        <h3 className="display-four n17-color f-30">Trending Merchants in {getRandomCategorySeoTitle(categoryName)}</h3>
                    </div>
                    <div className="position-relative my-4">
                        <ScrollButtonLeft sectionType="merchant" />
                        <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                            {merchants?.data?.merchants?.length > 0 ? (
                                merchants?.data?.merchants.map((merchant: CompanyWiseMerchant, i) => {
                                    return (
                                        <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
                                            <StoreCard key={i} merchant={merchant} mer_slug={store_slug} mer_slug_type={slug_type} />
                                        </div>
                                    )
                                })) : (
                                <section className="product-shop-full-grid">
                                    <div className="container">
                                        <div className="row">
                                            <div className="section-title-center text-center mt-5">
                                                <div className="col-12">
                                                    <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                                        <h3 className="fs-three n17-color text-danger">No Merchants Found</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                        <ScrollButtonRight sectionType="merchant" />
                    </div>
                </div>
            </section>
            {/* <section className="section-sidebar" style={{ paddingTop: "20px", paddingBottom: "50px" }}>
                <div className="container mb-7">
                    <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                        <h3 className="display-four n17-color f-30">Suggested Categories</h3>
                    </div>
                    <div className="position-relative my-4">
                        <ScrollButtonLeft sectionType='category' />
                        <div className="row horizontal-scroll horizontal-scroll-category flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                            {categories?.length > 0 && categories?.map((category, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="col-6 col-sm-4 col-md-3 col-lg-2 flex-shrink-0 px-2"
                                        style={{ minWidth: "150px" }}
                                    >
                                        <CategoryCards category={category} domain={domain} />
                                    </div>
                                );
                            })}
                        </div>
                        <ScrollButtonRight sectionType='category' />
                    </div>
                </div>
            </section> */}
            <section className="section-sidebar py-5">
                <div className="container mb-7">
                    <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                        <h3 className="display-four n17-color f-30">{getRandomCategoryCouponsTitle(categoryName)}</h3>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-xxl-8 cus-z1">
                            <CategoryOffers category_id={categoryId} url_slug={url_slug} page={page} company_id={company_id} mer_slug={store_slug} mer_slug_type={slug_type} />
                        </div>
                        <div className="col-xl-4 col-xxl-4 mt-10 mt-xl-0">
                            <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                                <div className="side-wrapper bg-transparent rounded-4">
                                    <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                                        <div className="sidebar-area">
                                            {categories?.categories?.length > 0 && (
                                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                                    <CategorySidebar categories={categories?.categories} cat_slug={categorySlug} slug_type={slug_type} />
                                                    {/* <VerticalCategoryOfferBanner bannerResponse={bannerResponse.data?.offers} domain={domain} mer_slug={store_slug} slug_type={slug_type} categoryId={categoryId} companyId={company_id}/> */}
                                                </div>
                                            )}
                                            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth my-2">
                                                <VerticalCategoryOfferBanner bannerResponse={bannerResponse?.offers} domain={domain} mer_slug={store_slug} slug_type={slug_type} categoryId={categoryId} companyId={company_id} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategoryMerchantPage
