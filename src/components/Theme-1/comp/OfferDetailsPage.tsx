import { apiGetProductDetails } from '@/apis/user'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import { calculateDiscountPercent, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getProductMerchantHref, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import { OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import RenderRating from './RenderRating'
import RateUs from './RateUs'

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
    product_id: string;
    current_merchant_slug: string;
}
// ... (Your imports remain the same)

const OfferDetailsPage = async ({
    company_id,
    store_slug,
    slug_type,
    product_id,
    current_merchant_slug,
}: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const response = (
        await apiGetProductDetails(company_id, product_id, current_merchant_slug)
    ).data;

    if (!response) return notFound();

    return (
        <div className="prodoff-page-wrapper">
            {/* Breadcrumb */}
            <section className="prodoff-breadcrumb-section border-bottom p-0 d-block position-relative z-index-1">
                <div className="prodoff-breadcrumb-inner">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern"
                        className="prodoff-bg-pattern"
                        width={1000}
                        height={400}
                        priority
                    />
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">
                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <Link
                                                href="/"
                                                className="breadcrumb-list__link text-body hover-text-main"
                                            >
                                                Home
                                            </Link>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <Link
                                                href="/products"
                                                className="breadcrumb-list__link text-body hover-text-main"
                                            >
                                                Products
                                            </Link>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <Link
                                                href={getProductMerchantHref(response?.merchant, slug_type)}
                                                className="breadcrumb-list__link text-body hover-text-main"
                                            >
                                                {response?.merchant?.merchant_name}
                                            </Link>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10">
                                                <i className="fas fa-chevron-right"></i>
                                            </span>
                                        </li>

                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text custom-text-format">
                                                {discardHTMLTags(response?.offer_title)}
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Section */}
            <section className="prodoff-main-content py-5">
                <div className="container">
                    <div className="row g-4">
                        {/* LEFT: Product info */}
                        <div className="col-lg-8">
                            <div className="prodoff-product-card card p-4 border-0">
                                <div className="row g-4 align-items-start">
                                    {/* Product Image */}
                                    <div className="col-md-5">
                                        <div className="prodoff-img-container border rounded-4 p-3">
                                            <Image
                                                src={getBaseImageUrl(companyDomain, response?.product_image, "")}
                                                alt={response?.offer_title}
                                                width={400}
                                                height={400}
                                                className="prodoff-main-img img-fluid"
                                            />
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="col-md-7">
                                        <h1 className="prodoff-title fs-3 fw-bold mb-3">
                                            {discardHTMLTags(response?.offer_title)}
                                        </h1>

                                        <div className="product-item__prevPrice mb-2">
                                            {getFinalDiscountTag(response?.offer_title, calculateDiscountPercent(response?.original_price, response?.sale_price))}
                                        </div>

                                        <div className="prodoff-price-wrapper d-flex align-items-center gap-3 mb-4">
                                            <span className="prodoff-sale-price fs-2 fw-bold">
                                                {getCurrencySymbol(response?.currency)}
                                                {response?.sale_price}
                                            </span>
                                            <span className="prodoff-original-price text-muted text-decoration-line-through">
                                                {getCurrencySymbol(response?.currency)}
                                                {response?.original_price}
                                            </span>
                                        </div>

                                        <OfferOutUrl
                                            domain={companyDomain}
                                            merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)}
                                            outUrl={response?.url}
                                            unique_id={response?.unique_id}
                                            customClass="trend-prod-btn w-50"
                                        >
                                            Buy Now
                                        </OfferOutUrl>
                                    </div>
                                </div>

                                <hr className="prodoff-divider my-4" />

                                <div className="prodoff-description-container">
                                    <h4 className="prodoff-section-title mb-3">Product Description</h4>
                                    <div
                                        className="prodoff-description-text"
                                        dangerouslySetInnerHTML={{ __html: response?.offer_detail }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Merchant card */}
                        <div className="col-lg-4">
                            <div className="prodoff-sidebar-card card p-4 border-0">

                                <div className="item-wrapper card shadow-sm rounded-4 p-3 p-md-4 text-center my-3" style={{ border: "1px solid #80808026" }}>

                                    {/* Logo Section */}
                                    <div className="thumb-area rounded-3 d-flex align-items-center justify-content-center p-4">
                                        <Image
                                            className="img-fluid"
                                            alt={response?.merchant?.merchant_name}
                                            src={getBaseImageUrl(
                                                companyDomain,
                                                response?.merchant?.merchant_logo,
                                                ""
                                            )}
                                            width={395}
                                            height={220}
                                            style={{ objectFit: "contain", maxHeight: "120px" }}
                                        />
                                    </div>

                                    {/* Rating Section */}
                                    <div className="anim-rate d-flex justify-content-center align-items-center mt-4 my-3">
                                        <div className="d-flex align-items-center rounded-pill border px-3 py-2 gap-2">
                                            <span
                                                className="d-inline-flex align-items-center justify-content-center rounded-circle-rating fw-semibold"
                                                style={{ width: "36px", height: "36px" }}
                                            >
                                                {getRandomRating(response?.merchant?.rating)}
                                            </span>
                                            <RenderRating rating={getRandomRating(response?.merchant?.rating)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="prodoff-rate-us-wrapper">
                                    <RateUs
                                        offer_id={response?.unique_id || ""}
                                        company_id={company_id}
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OfferDetailsPage;