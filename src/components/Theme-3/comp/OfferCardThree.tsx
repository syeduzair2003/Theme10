import React from 'react'
import Image from "next/image";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    product: Offer;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
}

const OfferCardThree = async ({ product, merchantHref, domain, merchant_name, merchant_logo }: Props) => {
    const type = product?.offer_type?.name;

    // Use product image if available, otherwise merchant logo
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "") // Fallback to a generic image placeholder
            : getBaseImageUrl(domain, merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    // Use a title for the main text, prioritizing offer_title over offer_detail
    //const offerTitle = product?.offer_title || discardHTMLTags(product?.offer_detail || 'Amazing Offer Available');

    // Determine the discount text, using the finalDiscountTag logic or a generic "LIMITED TIME OFFER"
    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title,
        discountPercent,
    );

    // Calculate expiry date display
    const expiryDateText = product?.end_date ? calculateOfferDuration(product?.end_date) : null;


    return (
        <div className="offer-card-three-wrapper h-100">
            <div className="offer-card-three d-flex flex-column justify-content-between rounded-4 overflow-hidden bg-white position-relative h-100">

                {/* 1. Image Area with Logo and Badge */}
                <div className="offer-card-three-image-area position-relative">
                    <Image
                        src={imageSrc}
                        alt={getRandomStoreSeoTitle(merchant_name)}
                        className="offer-card-three-image img-fluid w-100 object-fit-cover pt-4"
                        width={400}
                        height={250}
                        style={{ aspectRatio: '4/3' }}
                    />

                    {product?.offer_type?.name === 'product' && (
                        <div className="offer-card-three-logo position-absolute top-0 start-0 m-3 p-2 d-flex align-items-center bg-white-50 rounded-1">
                            {/* Placeholder for a dynamic logo/icon if available, using Link to merchantHref */}
                            <Link href={merchantHref} className="text-decoration-none d-flex align-items-center">
                                <Image
                                    src={getBaseImageUrl(domain, merchant_logo, "/themes/Theme_3/images/fav.png")}
                                    alt={`${merchant_name} Logo`}
                                    width={24}
                                    height={24}
                                    className='me-2 object-fit-contain'
                                />
                                <span className="fw-bold text-dark f-14">{merchant_name}</span>
                            </Link>
                        </div>
                    )}

                    {finalDiscountTag && (
                        <div className="offer-card-three-badge position-absolute top-0 end-0 mt-1 me-1 px-3 py-1 bg-dark text-white fw-semibold rounded-pill f-12">
                            {finalDiscountTag}
                        </div>
                    )}
                    <div className="offer-card-three-content p-2 text-center">
                        <h3 className="offer-card-three-title fw-bolder text-dark mb-2 f-16 truncate-3-lines">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
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
                </div>
                <div className="bottom-container-promotion">
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
                    <div className="offer-card-three-footer d-flex flex-column justify-content-center align-items-center px-4 py-3 border-top f-12 text-muted w-100">
                        <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantImg={merchant_logo} merchantHref={merchantHref} offer={product} type='anchor' />
                        {/* {expiryDateText ? ( */}
                        <div className='d-flex align-items-center gap-1'>
                            <FontAwesomeIcon icon={faCalendarDays} style={{ width: "14px", height: "14px" }} />
                            <span>Expires: {calculateOfferDuration(product?.end_date)}</span>
                        </div>
                        {/* ) : (
                            <div>Offer Duration: N/A</div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferCardThree;