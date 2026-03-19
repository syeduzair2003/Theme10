import { apiGetMerchantUniqueId } from '@/apis/merchant';
import { apiGetCategoryProducts, apiGetMerchantProducts } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import BreadcrumbSection from './BreadcrumbSection';
import CouponCard from './CouponCard';
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import ScrollButtonLeft from './ScrollButtonLeft';
import ScrollButtonRight from './ScrollButtonRight';
import Link from 'next/link';
import MerchantProductsSchema from '@/components/shared/SchemaScripts/ProductsMerchantSchema';

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
}

const MerchantProductsPage = async ({ slug, companyId, storeSlug, slugType }: Props) => {
    const [products, merRes, cat] = await Promise.all([
        apiGetMerchantProducts(companyId, slug).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
        apiGetCategoryProducts(companyId, slug).then(res => res.data)
    ]);
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: slug },
    ];

    return (
        <>
            <BreadcrumbSection
                title={`Discover Quality Discount Products from ${merRes?.merchant_name}`}
                breadcrumbs={breadcrumbs}
                imageSrc="/themes/Theme_3/img/website.png"
            />
            <div className="contact-section bg padTB60">
                <div className="container">
                    {cat?.length > 0 && (
                        <>
                            <h2 className='display-four n17-color f-28 py-5 text-capitalize'>
                                {`Product Categories for ${merRes?.merchant_name}`}
                            </h2>

                            <div className="position-relative my-4 px-5">
                                <div className="position-absolute start-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                    <ScrollButtonLeft sectionType="category" />
                                </div>

                                <div
                                    className="horizontal-scroll-category d-flex flex-nowrap overflow-auto py-2"
                                    style={{
                                        scrollBehavior: "smooth",
                                        gap: "16px",
                                    }}
                                >
                                    {cat.map((item: { id: number; name: string; slug: string }, i: number) => (
                                        <div key={item.id || i} className="flex-shrink-0" style={{ width: "calc(25% - 12px)" }}>
                                            <div className="custom-col my-custom-ani">
                                                <Link
                                                    href={`/products/${slug}/${item.slug}`}
                                                    className="text-decoration-none d-block h-100"
                                                >
                                                    <div
                                                        className="custom-card border rounded-3 bg-white d-flex align-items-center justify-content-center text-center shadow-sm p-4"
                                                        style={{ minHeight: '120px' }}
                                                    >
                                                        <span className="unique-tile-title mb-0 fw-semibold text-dark" style={{ fontSize: '16px' }}>
                                                            {item?.name}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                    <ScrollButtonRight sectionType="category" />
                                </div>
                            </div>
                        </>
                    )}
                    <h2 className='display-four n17-color f-28 py-5'>Browse Discounted Products from All Leading Brands</h2>
                    <div className="row">
                        {products?.length > 0 && products.map((item, i) => (
                            <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                <CouponCard
                                    offer={item}
                                    merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                    merchant_name={merRes?.merchant_name}
                                    merchant_logo={merRes?.merchant_logo}
                                    productDetailUrl={getProductDetailHref(merRes, slugType, item.slug, item?.category?.slug)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MerchantProductsSchema company_id={companyId} merchantSlug={slug} merchantName={merRes?.merchant_name} />
        </>
    )
}

export default MerchantProductsPage
