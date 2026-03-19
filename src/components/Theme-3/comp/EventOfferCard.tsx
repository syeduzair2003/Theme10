import React from 'react'
import Image from "next/image";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
import {  Offer, ProductData } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    product: Offer | ProductData ;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const EventOfferCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, productDetailUrl }: Props) => {
    const type = product?.offer_type?.name;
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;
    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    return (
        <div className="overflow-hidden single-box d-flex flex-column justify-content-between gap-2 gap-md-3 n1-bg-color cus-border border b-eighth p-3 p-md-5 rounded-2 d-center h-100 position-relative">
            {/* ✅ Discount Badge */}
            {finalDiscountTag !== null && (
                <div className="ribbon-badge">
                    <span>{finalDiscountTag}</span>
                </div>
            )}

            <div
                className="p-2 d-flex align-items-center justify-content-center"
                style={{ minWidth: 100, height: 80 }}
            >
                <Image
                    // src={imageUrl}
                    src={imageSrc}
                    alt={getRandomStoreSeoTitle(merchant_name)}
                    className="img-fluid object-fit-contain"
                    height={100}
                    width={100}
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                    layout='responsive'
                    unoptimized
                />
            </div>
            <div className="bottom-area d-grid gap-1 flex-grow-1 d-center text-center">
                <Link href={merchantHref} className="text-center">
                    <h5 className='f-13 fw-bold n17-color'>{merchant_name}</h5>
                </Link>
                {product?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl} className="fs-six f-16 n17-color fw-bold m-0 truncate-4-lines">
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ))
                ) : (
                    <p className="fs-six f-16 n17-color fw-bold m-0 truncate-4-lines">
                        {discardHTMLTags(product?.offer_title)}
                    </p>
                )}
                {(product?.end_date === null || product?.end_date === undefined) ? (
                    <div className={`d-center justify-content-start gap-2 gap-md-3 overflow-hidden event-offer-duration`}>
                        <span className="f5-color fw-mid rounded-2 s1-4th-bg-color cus-border border b-sixth px-2 px-md-3 py-1 d-flex gap-1 align-items-center gap-md-2 animate-box overflow-hidden">
                            <FontAwesomeIcon
                                icon={faCalendarDays}
                                style={{ width: "14px", height: "14px", color: "#b3682b" }}
                            />
                            <span className="f11-color fw-mid text-anim offer-event-duration-text">{calculateOfferDuration(product?.end_date)}</span>
                        </span>
                    </div>
                ) :
                    (
                        <div className={`event-offer-duration`}>
                            <span className="offer-event-duration-blink">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    style={{ width: "14px", height: "14px", color: "#b3682b" }}
                                />
                                <span className="offer-event-duration-text">{calculateOfferDuration(product?.end_date)}</span>
                            </span>
                        </div>
                    )
                }
                <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantHref={merchantHref} offer={product} type='anchor' merchantImg={merchant_logo} />

                {type === "product" && (
                    <div className="price-info d-flex flex-row align-items-center gap-3 justify-content-center">
                        {product?.sale_price && (
                            <span className="fw-bold text-success f-20">
                                {getCurrencySymbol(product?.currency)}{product?.sale_price}
                            </span>
                        )}
                        {product?.original_price && (
                            <span className="text-decoration-line-through f-14 text-muted">
                                {getCurrencySymbol(product?.currency)}{product?.original_price}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* ✅ CTA button with coupon/deal/product logic */}
            <div className="d-flex align-items-center justify-content-between">
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
    );
}

export default EventOfferCard
