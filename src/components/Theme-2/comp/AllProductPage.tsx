import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from '@/apis/page_optimization';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { Merchant } from '@/services/dataTypes';
import StoreCard from './StoreCard';
import CategorySidebar from './CategorySidebar';
import OffersListing from './OffersListing';
import AllProductsSchema from '@/components/shared/SchemaScripts/AllProductSchema';
import StoreCardTwo from './StoreCardTwo';
import BreadcrumbSection from './BreadcrumbSection';
import { generateBreadcrumbs } from '@/constants/hooks';

interface Props {
    page?: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
    categoryId?: string;
    slug?: string[];
    categoryName?: string;
}

const AllProductPage = async ({ page, companyId, storeSlug, slugType, categoryId, slug, categoryName }: Props) => {

    const [categories, merchants, suggestedMerchants] = await Promise.all([
        apiGetProductCategories(companyId, categoryId).then(res => res.data),
        apiGetProductCategoryMerchant(companyId, categoryId).then(res => res.data),
        apiGetProductSuggestedMerchant(companyId, categoryId).then(res => res.data),
    ]);

    const safeSlug = slug ?? [];

    const cleanedSlug = safeSlug?.filter(
        (s, i) => !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page"))
    );
    // Build breadcrumb paths
    const pathString = `/${cleanedSlug?.join("/")}`;

    const breadcrumbs = generateBreadcrumbs(pathString, "/all-products", "Products");
    return (
        <>
            <BreadcrumbSection
                title={`Popular All Products`}
                breadcrumbs={breadcrumbs}
                imageSrc="/themes/Theme_3/img/website.png"
            />
            <div className="contact-section bg pt-4">
                <div className="container">
                    <div className="d-grid gap-4 gap-md-6 position-relative">
                        <h3 className="display-four n17-color f-30">Trending Merchants in All Products</h3>
                    </div>
                    <div className="position-relative mt-2 mb-4">
                        <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-3" style={{ scrollBehavior: 'smooth' }}>
                            {merchants?.length > 0 ? (
                                merchants?.map((merchant: Merchant, i: number) => {
                                    return (
                                        <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-2 flex-shrink-0 px-2">
                                            <StoreCard merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
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
                    </div>
                </div>
            </div>
            <div className="contact-section bg pt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-9 col-xl-9">
                            {/* <OffersListingCategory category_id={categoryId} url_slug={categorySlug?.split("/")} page={page?.toString()} company_id={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} /> */}
                            <OffersListing category_id={categoryId} page={page?.toString()} company_id={companyId} mer_slug={storeSlug} mer_slug_type={slugType} baseUrl="all-product" />
                        </div>
                        <div className="col-12 col-lg-3 col-xl-3 gap-3 d-flex flex-column mb-3">
                            {categories?.length > 0 && (
                                <CategorySidebar categories={categories} pageType='all-products' />
                            )}
                            {suggestedMerchants?.length > 0 && (
                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3">
                                    <h4>Similar Stores</h4>
                                    <div className="row g-3">
                                    {suggestedMerchants?.slice(0, 5)?.map((merchant: Merchant, i: number) =>
                                        <div key={i} className="col-12 col-sm-12 col-md-12 col-lg-12 flex-shrink-0 px-2">
                                            <StoreCardTwo merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
                                        </div>
                                    )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {page !== '1' && (
                <AllProductsSchema company_id={companyId} categoryName={categoryName} category_id={categoryId} categoryUrl={cleanedSlug.join('/')} />
            )}
        </>
    )
}

export default AllProductPage
