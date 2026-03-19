import React from 'react'
import Image from "next/image";
import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import RenderRating from './RenderRating';
import { OffersOffer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import cookieService from '@/services/CookiesService';
// import Image from "@/components/shared/Image";
import OfferDuration from './OfferDuration';
import Link from 'next/link';
import SocialMediaShare from './SocialMediaShare';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    type?: string;
    productDetailUrl?: string | null;
}

const OffersCard = async ({ offer, mer_slug_type, mer_slug, type, productDetailUrl }: Props) => {
    const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
    const domain = (await cookieService.get("domain")).domain;
    const ImageStyle = {
        padding: "35px"
    }
    const product = offer?.offer || offer; // normalize for products vs offers

    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");
    const rating = getRandomRating(offer?.offer?.rating);

    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    return (
        <div className="col-8 col-md-6 col-lg-4 col-xl-3 active d-flex flex-column">
            <div className="single-box d-flex flex-column justify-content-between gap-2 gap-md-3 n1-bg-color cus-border border b-eighth p-3 p-md-5 rounded-2 d-center h-100 position-relative">
                {/* ✅ Discount Badge */}
                {type === "product" || finalDiscountTag && (
                    <div className="ribbon-badge">
                        <span>{finalDiscountTag}</span>
                    </div>
                )}

                {/* ✅ Image */}
                <div className="d-center thumb-area rounded-2 w-100 cus-border border b-eighth offer-card-image-container offers-cus-card-container">
                    {type === "product" ? (
                        <div className="end-area d-center flex-column gap-3 gap-md-4 custom-card-width-products">
                            <Image
                                src={imageSrc}
                                alt={product?.offer_title ? `${product.offer_title} image` : "Product image"}
                                height={150}
                                width={230}
                                className="merchant-top-image w-100"
                                objectFit="contain"
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <Image
                            src={imageSrc}
                            alt={`${offer?.merchant?.merchant_name || "Merchant"} Deals and Coupons`}
                            height={150}
                            width={230}
                            className="merchant-top-image w-100"
                            objectFit="contain"
                            loading="lazy"
                        />
                    )}
                </div>
                <span>
                    <span className='text-muted fw-bold f-12'>By </span>
                    <Link href={merchantHref}>
                        <small className="text-muted fw-bold f-11">{getRandomStoreSeoTitle(offer?.merchant?.merchant_name)}</small>
                    </Link>
                </span>
                {/* ✅ Details */}
                <div className="bottom-area d-grid gap-1 gap-md-2 flex-grow-1 d-center text-center">
                    {product?.is_detail === 1 ? (
                        (productDetailUrl && (
                            <Link href={productDetailUrl}>
                                <p className="fs-six f-15 n17-color fw-mid m-0 truncate-4-lines">
                                    {discardHTMLTags(product?.offer_title)}
                                </p>
                            </Link>
                        ))
                    ) : (
                        <p className="fs-six f-15 n17-color fw-mid m-0 truncate-4-lines">
                            {discardHTMLTags(product?.offer_title)}
                        </p>
                    )}
                    {/* <p className="fs-six f-15 n17-color fw-mid m-0">
                        {type === "product"
                            ? `${product?.offer_title}`
                            : `${offer?.merchant?.merchant_name} - ${discardHTMLTags(
                                offer?.offer?.offer_title
                            )}`}
                    </p> */}

                    <OfferDuration
                        endDate={offer?.offer?.end_date}
                        className="justify-content-center"
                    />
                    <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantHref={merchantHref} offer={product} type='anchor' merchantImg={offer?.merchant?.merchant_logo} />

                    {/* ✅ Show price/discount for products */}
                    {type === "product" && (
                        <div className="price-info d-flex flex-row align-items-center gap-3 justify-content-center">
                            {offer?.offer?.sale_price && (
                                <span className="fw-bold text-success f-20">
                                    {getCurrencySymbol(offer?.offer?.currency)}{offer?.offer?.sale_price}
                                </span>
                            )}
                            {offer?.offer?.original_price && (
                                <span className="text-decoration-line-through f-14 text-muted">
                                    {getCurrencySymbol(offer?.offer?.currency)}{offer?.offer?.original_price}
                                </span>
                            )}
                        </div>
                    )}
                    {/* {offer?.offer?.rating && ( */}
                    <div className="rounded-1 n1-bg-color d-center gap-1 gap-md-2 justify-content-center">
                        <div className="rating">
                            <RenderRating rating={getRandomRating(offer?.offer?.rating)} /> ({getRandomRating(offer?.offer?.rating)})
                        </div>
                    </div>
                    {/* )} */}
                    <div className="d-center">
                        <SocialMediaShare offerUrl={`/${product?.url}`} offerTitle={product?.offer_title} merchantHref={merchantHref} unique_id={product?.unique_id} domain={domain} />
                    </div>
                </div>

                {/* ✅ CTA button with coupon/deal/product logic */}
                <div className="d-flex align-items-center justify-content-between mt-2">
                    {product?.coupon_code ? (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="cmn-btn btn-overlay border-dash rounded-pill px-4 px-md-6 py-2 py-md-3 position-relative d-center show-coupon-btn"
                        >
                            <span className="f5-color fw-semibold coupon-code w-100 d-center">
                                {(() => {
                                    if (!product?.coupon_code) return "";
                                    const code = product.coupon_code.trim();
                                    const spaceIndex = code.indexOf(" ");
                                    const endIndex = spaceIndex !== -1 ? spaceIndex : 5;
                                    return code.slice(0, endIndex);
                                })()}
                            </span>
                            <span className="position-absolute fw-semibold show transition n1-color f-14">
                                Show Coupon
                            </span>
                        </OfferOutUrl>
                    ) : (
                        <OfferOutUrl
                            unique_id={product?.unique_id}
                            outUrl={product?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="box-style box-second gap-2 gap-md-3 rounded-pill py-2 py-md-3 px-5 px-md-7 d-center d-inline-flex"
                        >
                            <span className="f5-color fw-semibold f-14">
                                {type === "product" ? "Buy Now" : "Get Deal"}
                            </span>
                        </OfferOutUrl>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OffersCard
