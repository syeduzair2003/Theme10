import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from '@/apis/page_optimization';
import { faArrowRight, faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import React from 'react'
import ScrollButtonLeft from './ScrollButtonLeft';
import ScrollButtonRight from './ScrollButtonRight';
import { Merchant } from '@/services/dataTypes';
import StoreCard from './StoreCard';
import { getLastUpdateDate } from '@/constants/hooks';
import CategorySidebar from './CategorySiderBar';
import Link from 'next/link';
import SidebarRoundMerchantCard from './SidebarRoundMerchantCard';
import ProductOffers from './ProductOffers';

interface Props {
    page?: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
    categoryId?: string;
    slug?: string[];
    categoryName?: string;
}

const ProductsLayout = async ({ page, companyId, storeSlug, slugType, categoryId, slug, categoryName }: Props) => {

    const [categories, merchants, suggestedMerchants] = await Promise.all([
        apiGetProductCategories(companyId, categoryId).then(res => res.data),
        apiGetProductCategoryMerchant(companyId, categoryId).then(res => res.data),
        apiGetProductSuggestedMerchant(companyId, categoryId).then(res => res.data),
    ]);
    const safeSlug = slug ?? [];


    const cleanedSlug = safeSlug?.filter(
        (s, i) => !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page"))
    );

    const paths: { href: string; label: string }[] = cleanedSlug?.map((segment, index) => {
        const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/-/g, " ");
        return { href, label };
    });

    return (
        <div>
            <section className="breadcrumb-green">

                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className=" text-center">
                            <ul className=" flx-align gap-2 mb-2 justify-content-center">
                                <li className="font-14 text-body">
                                    <a href={"/"} className="text-body hover-text-main">Home</a>
                                </li>
                                <li className="font-14 text-body">
                                    <span className="font-10"><FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} /></span>
                                </li>
                                <li className="font-14 text-body">
                                    <span className='text-white'>All-Products</span>
                                </li>
                                {paths?.map((p, i) => (
                                    <li
                                        key={i}
                                        className="font-14 text-body"
                                    >
                                        <span className="font-10"><FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} /></span>
                                        {i < paths?.length - 1 ? (
                                            <>
                                                <li className="font-14 text-body">
                                                    <span className="">{p?.label}</span>
                                                </li>
                                            </>
                                        ) : (
                                            <span className="text-capitalize text-white">{p?.label}</span> // last one: plain text
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <h1 className=" mb-0 text-capitalize">Our Popular Products</h1>
                        </div>
                    </div>
                </div>
            </section>

            {merchants?.length > 0 && (
                <section className='store-card-section'>
                    <div className="container">
                        <div className="mer-heading pt-4">
                            <h3>Trending Merchants in All Products
                            </h3>
                        </div>
                        <div className="position-relative my-4">
                            <ScrollButtonLeft sectionType="merchant" />
                            <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                                {merchants?.length > 0 && merchants?.map((merchant: Merchant, i: number) => {
                                    return (
                                        <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
                                            <StoreCard key={i} merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
                                        </div>
                                    )
                                })}
                            </div>
                            <ScrollButtonRight sectionType="merchant" />
                        </div>
                    </div>
                </section>
            )}

            <section>
                <div className="container">
                        {/* <div className="mer-heading pt-2">
                            <p> All deals in this category are hand-tested. Last verified on: {getLastUpdateDate(1)}.
                            </p>
                        </div> */}
                    <div className="row flex-column-reverse flex-md-row">
                        <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
                            {categories?.length > 0 && (
                                <div className="cat-sidebar-wrapper">
                                    <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                        <CategorySidebar
                                            categories={categories}
                                            pageSlug="all-products"
                                            categoryName={categoryName}
                                        />
                                    </div>
                                </div>
                            )}

                            {suggestedMerchants?.length > 0 && (
                                <div className="mer-sidebar-wrapper py-4">
                                    <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                        <h4 className="n17-color mb-4 mb-md-6">Similar Stores</h4>

                                        <div className="row g-2 py-3 mb-5 d-flex justify-content-center">

                                            {suggestedMerchants?.slice(0, 5).map((merchant: Merchant) =>
                                                <div className="col-12 col-md-6 col-lg-6 d-center" key={merchant.unique_id}>
                                                    <SidebarRoundMerchantCard merchant={merchant} merSlug={storeSlug} slugType={slugType} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="btn-area mt-3 mt-md-5">
                                            <Link href={`/all-stores/A`} className="d-center justify-content-start gap-2 gap-md-3">
                                                <span className="siteButton">See All Store</span>

                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {/* Product List */}
                        <div className="col-md-8 col-lg-8 col-xl-8 col-xxl-8 cus-z1">
                            <ProductOffers
                                category_id={categoryId}
                                page={page}
                                company_id={companyId}
                                mer_slug={storeSlug}
                                mer_slug_type={slugType}
                                slug={slug}
                            />

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
};


export default ProductsLayout