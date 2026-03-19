import { apiGetMerchantUniqueId } from '@/apis/merchant';
import { apiGetCategoryProductsOffer, apiGetMerchantProducts } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import BreadcrumbSection from './BreadcrumbSection';
import CouponCard from './CouponCard';
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import ProductCategorySchema from '@/components/shared/SchemaScripts/ProductCategorySchema';

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
    category: string;
}

const CategoryProductOffers = async ({ slug, companyId, storeSlug, slugType, category }: Props) => {
    const formatCategoryName = (slug: string): string => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const [products, merRes] = await Promise.all([
         apiGetCategoryProductsOffer(companyId, slug, category).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data)
    ]);
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: merRes?.merchant_name || slug, href:`/products/${slug}` },
        {label: formatCategoryName(category) }
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
                    <h2 className='display-four n17-color f-28 py-5'> {formatCategoryName(category)}</h2>
                    <div className="row">
                        {products?.length > 0 && products.map((item, i) => (
                            <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                <CouponCard
                                    offer={item}
                                    merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                    merchant_name={merRes?.merchant_name}
                                    merchant_logo={merRes?.merchant_logo}
                                    productDetailUrl={getProductDetailHref(merRes, slugType, item.slug,item?.category?.slug)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ProductCategorySchema company_id={companyId} merchantSlug={slug} merchantName={merRes?.merchant_name} categorySlug={category} categoryName={formatCategoryName(category)} />
        </>
    )
}

export default CategoryProductOffers
