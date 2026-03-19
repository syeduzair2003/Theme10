import { apiGetCategoryProductsOffer, apiGetProductDetails, apiGetCategoryProducts } from '@/apis/user'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import { calculateDiscountPercent, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getProductDetailHref, getProductMerchantHref, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { faGreaterThan, FontAwesomeIcon, faArrowRight } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import { OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import RenderRating from './RenderRating'
import RateUs from './RateUs'
import SpecificProductSchema from '@/components/shared/SchemaScripts/SpecificProductSchema'
import EventOfferCard from './EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
    product_id: string;
    current_merchant_slug: string;
    categorySlug: string;
}

const OfferDetailsPage = async ({ company_id, store_slug, slug_type, product_id, current_merchant_slug, categorySlug }: Props) => {
    const companyDomain = (await cookieService.get('domain')).domain;
    const [response, catRes, merRes, cat] = await Promise.all([
        apiGetProductDetails(company_id, product_id, current_merchant_slug).then(res => res.data),
        apiGetCategoryProductsOffer(company_id, current_merchant_slug, categorySlug).then(res => res.data),
        apiGetMerchantUniqueId(current_merchant_slug, company_id).then(res => res.data),
        apiGetCategoryProducts(company_id, current_merchant_slug).then(res => res.data)
    ])
    const similarCategory = catRes?.filter((item) => item.unique_id !== response?.unique_id);
    if (response == null) return notFound();
    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center py-sm-10 mb-20">
                        <div className="store-pages col-lg-12 pe-4 pe-md-10 mb-20" style={{ paddingBottom: '7rem' }}>
                            <div className="d-grid gap-4 gap-md-6 mb-8 mb-xl-0">
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/products`} className="n17-color text-capitalize">Products</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={getProductMerchantHref(response?.merchant, slug_type)} className="n17-color text-capitalize">{response?.merchant?.merchant_name}</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            {categorySlug && (
                                                <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                    <Link href={`/products/${response?.merchant?.slug}/${categorySlug}`} className="n17-color text-capitalize">{categorySlug.replace(/-/g, ' ')}</Link>
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                                </li>
                                            )}
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color">{response?.offer_title}</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-sidebar details-section position-relative" style={{ paddingBottom: '30px' }}>
                <div className="container sidebar-toggler position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* Offer Header */}

                            <div className="row g-3">
                                <div className="col-lg-4">
                                    <div className="image-frame mt-2">
                                        <Image
                                            src={getBaseImageUrl(companyDomain, response?.product_image, "")}
                                            alt={response?.offer_title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 280px"
                                            className="offer-product-image"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <h1 className="display-fours n17-color mb-2 f-35">
                                        {discardHTMLTags(response?.offer_title)}
                                    </h1>
                                </div>
                            </div>
                            <div className="merchant-details-wrapper mt-3">
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
                                    <div className="btn-area">
                                        <OfferOutUrl domain={companyDomain} merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)} outUrl={response?.url} unique_id={response?.unique_id} customClass="box-style box-second gap-2 gap-md-3 w-100 rounded-pill py-2 py-md-3 px-5 px-md-7 d-center">
                                            <span className="fs-six text-nowrap">Buy Now</span>
                                        </OfferOutUrl>
                                    </div>
                                </div>
                            </div>
                            {response?.offer_detail !== null && response?.offer_detail !== "" && response?.offer_detail && (
                                <div
                                    className="merchant-details-wrapper text-jus w-100 mt-3"
                                    dangerouslySetInnerHTML={{
                                        __html: response?.offer_detail
                                    }}
                                />
                            )}
                        </div>
                        <div className="col-lg-4">
                            <div className="sticky-top" style={{ top: '100px', zIndex: 100 }}>
                                <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                                    <div className="sidebar-area">
                                        <div className="d-grid gap-3 gap-md-4 position-relative">
                                            <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth d-grid gap-3 gap-md-4">
                                                <div className="d-center thumb-area rounded-2 w-100">
                                                    <Image className="w-100 h-100" alt={`${response?.merchant?.merchant_name} image`}
                                                        src={getBaseImageUrl(companyDomain, response?.merchant?.merchant_logo, "")}
                                                        width={395} height={220}
                                                        objectFit='contain'
                                                        style={{ padding: "20px 50px" }}
                                                    />
                                                </div>
                                                <div className="anim-rate d-flex justify-content-center align-items-center my-3 my-md-5" style={{ width: 'auto', margin: '0 auto' }}>
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
                                    </div>
                                </div>
                                {/* category side bar  */}
                                <div className="sidebar-common cus-overflow sidebar-head primary-sidebar mt-2">
                                    <div className="side-wrapper rounded-4 n1-bg-color cus-border border b-ninth p-4 p-md-6">
                                        {cat?.length > 0 && (
                                            <div className="single-bar">
                                                <h4 className="n17-color">
                                                    {`More categories from ${response?.merchant?.merchant_name}`}
                                                </h4>
                                                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                                                <div className="d-grid gap-3 gap-md-5">
                                                    {cat?.map((category, i) => {
                                                        if (i <= 9) {
                                                            return (
                                                                <div key={i} className="suggested-category d-flex justify-content-between">
                                                                    <Link
                                                                        href={`${getProductMerchantHref(response?.merchant, slug_type)}/${category.slug}`}
                                                                        className="d-center ms-9 justify-content-between"
                                                                    >
                                                                        <span className="custom-bullet"></span>
                                                                        <span className="title-area">{category?.name}</span>
                                                                    </Link>
                                                                </div>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                                <div className="btn-area mt-4 mt-md-6">
                                                    <Link href={getProductMerchantHref(response?.merchant, slug_type)} className="d-center justify-content-start gap-2 gap-md-3">
                                                        <span className="p2-color fw-bold">See All</span>
                                                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                    </Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {similarCategory?.length > 0 && (
                            <>
                                <h2 className='display-four n17-color f-28 py-5 text-capitalize'>
                                    {`${categorySlug.replace(/-/g, ' ')} Related Products on ${merRes?.merchant_name}`}
                                </h2>
                                <div className="col-xxl-12 cus-z1">
                                    <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                        {similarCategory.slice(0, 8).map((item, i) => (
                                            <div key={i} className="col-xl-3 col-lg-3 col-md-6 col-12 cus-z1">
                                                <EventOfferCard
                                                    product={item}
                                                    merchantHref={getMerchantHref(merRes, store_slug, slug_type)}
                                                    domain={companyDomain}
                                                    merchant_name={merRes?.merchant_name}
                                                    merchant_logo={merRes?.merchant_logo}
                                                    productDetailUrl={getProductDetailHref(merRes, slug_type, item?.slug, item?.category?.slug)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
            <SpecificProductSchema company_id={company_id} product_id={response?.unique_id} current_merchant_slug={current_merchant_slug} slug_type={slug_type} />
        </>
    )
}
export default OfferDetailsPage