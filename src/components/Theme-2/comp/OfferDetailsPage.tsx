import React from 'react'
import BreadcrumbSection from './BreadcrumbSection';
import cookieService from '@/services/CookiesService';
import { apiGetCategoryProductsOffer, apiGetProductDetails } from '@/apis/user';
import { notFound } from 'next/navigation';
import { calculateDiscountPercent, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getProductDetailHref, getProductMerchantHref, getRandomRating } from '@/constants/hooks';
import Image from 'next/image';
import RenderRating from './RenderRating';
import RateUs from './RateUs';
import MerchantDetailsFull from './MerchantDetailsFull';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import SpecificProductSchema from '@/components/shared/SchemaScripts/SpecificProductSchema';
import { apiGetMerchantUniqueId } from '@/apis/merchant';
import CouponCard from './CouponCard';

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
    product_id: string;
    current_merchant_slug: string;
    categorySlug: string,
}

const OfferDetailsPage = async ({ company_id, store_slug, slug_type, product_id, current_merchant_slug, categorySlug }: Props) => {
    const companyDomain = (await cookieService.get('domain')).domain;
    const [response, catRes, merRes] = await Promise.all([
        apiGetProductDetails(company_id, product_id, current_merchant_slug).then(res => res.data),
        apiGetCategoryProductsOffer(company_id, current_merchant_slug, categorySlug).then(res => res.data),
        apiGetMerchantUniqueId(current_merchant_slug, company_id).then(res => res.data)
    ])
    const similarCategory = catRes?.filter((item) => item.unique_id !== response?.unique_id);
    if (response == null) return notFound();

    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: response?.merchant?.merchant_name, href: getProductMerchantHref(response?.merchant, slug_type) },
        ...(categorySlug ? [{ label: categorySlug.replace(/-/g, ' '), href: `/products/${response?.merchant?.slug}/${categorySlug}` }] : []),
        { label: response?.offer_title },
    ];
    return (
        <>
            <BreadcrumbSection
                title={discardHTMLTags(response?.offer_title)}
                breadcrumbs={breadcrumbs}
                imageSrc={getBaseImageUrl(companyDomain, response?.product_image, "")}
            />
            <div className="contact-section bg padTB60">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-xxl-3 anim-rate mb-3">
                            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                <div className="d-center thumb-area rounded-2 w-100">
                                    <Image className="w-100 h-100" alt={`${response?.merchant?.merchant_name} image`}
                                        src={getBaseImageUrl(companyDomain, response?.merchant?.merchant_logo, "")}
                                        width={395} height={220}
                                        objectFit='contain'
                                        style={{ padding: "20px 50px" }}
                                    />
                                </div>
                                <div className="anim-rate d-flex justify-content-center align-items-center my-1" style={{ width: 'auto', margin: '0 auto' }}>
                                    <span className="f5-color fw-mid rounded-pill s1-4th-bg-color cus-border border b-sixth p-2 d-flex gap-2 gap-md-3 align-items-center" style={{ minWidth: '200px' }}>
                                        <span className="d-center icon-area box-two rounded-circle s1-bg-color n1-color fs-six">
                                            {getRandomRating(response?.merchant?.rating)}
                                        </span>
                                        <span className="right-area d-grid gap-1">
                                            <span className="star-area d-flex gap-1 mb-1">
                                                <RenderRating rating={getRandomRating(response?.merchant?.rating)} />
                                            </span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-grid gap-3 gap-md-4">
                                <RateUs offer_id={response?.unique_id || ""} company_id={company_id} />
                            </div>
                        </div>
                        <div className="col-xl-9 col-xxl-9 anim-rate mb-3">
                            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-flex flex-column gap-3 mb-2">
                                <div className='d-flex align-items-center gap-3 justify-content-between'>
                                    <span className='fw-bold f-40 text-danger'>
                                        {getFinalDiscountTag(response?.offer_title, calculateDiscountPercent(response?.original_price, response?.sale_price))}
                                    </span>
                                    <div className="">
                                        {response?.sale_price && (
                                            <div className="fs-2 fw-bold text-success">
                                                {getCurrencySymbol(response?.currency)}{response?.sale_price}
                                            </div>
                                        )}
                                        {response?.original_price && (
                                            <div className="text-muted text-decoration-line-through">
                                                {getCurrencySymbol(response?.currency)}{response?.original_price}
                                            </div>
                                        )}
                                    </div>
                                    <OfferOutUrl domain={companyDomain} merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)} outUrl={response?.url} unique_id={response?.unique_id} customClass="btn-deal">
                                        Buy Now
                                    </OfferOutUrl>
                                </div>
                            </div>
                            <section>
                                <MerchantDetailsFull details={response?.offer_detail} />
                            </section>

                        </div>
                    </div>
                    <h2 className='display-four n17-color f-28 py-5'> {categorySlug.replace(/-/g, ' ')}</h2>
                    <div className="row">
                        {similarCategory?.length > 0 && similarCategory.slice(0,8).map((item, i) => (
                            <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                <CouponCard
                                    offer={item}
                                    merchantHref={getMerchantHref(merRes, store_slug, slug_type)}
                                    merchant_name={merRes?.merchant_name}
                                    merchant_logo={merRes?.merchant_logo}
                                    productDetailUrl={getProductDetailHref(merRes, slug_type, item.slug, item?.category?.slug)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <SpecificProductSchema company_id={company_id} product_id={response?.unique_id} current_merchant_slug={current_merchant_slug} slug_type={slug_type} />
        </>
    )
}

export default OfferDetailsPage
