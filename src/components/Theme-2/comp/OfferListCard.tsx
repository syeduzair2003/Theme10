import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Offer, ProductData } from '@/services/dataTypes';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import { faFire, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    offer: Offer | ProductData;
    merchant_logo: string;
    merchantHref: string;
    merchant_name: string;
    productDetailUrl?: string | null;
}

const OfferListCard = async ({ offer, merchant_logo, merchantHref, merchant_name, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const product = offer;
    const type = offer?.offer_type?.name
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");
            console.log(imageSrc)
    // const rating = getRandomRating(offer?.rating);
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
        <div className="offer-horizontal-card h-100 position-relative overflow-hidden">
            {type === "product" && finalDiscountTag && (
                <div className="ribbon ribbon-top-left">
                    <span>{finalDiscountTag}</span>
                </div>
            )}
            <div className="d-flex h-100 text-decoration-none">

                {/* LEFT: Image Section */}
                    <div className="horizontal-img-container">
                        <Image
                            src={getBaseImageUrl(domain, imageSrc, "")}
                            alt={product?.offer_title || "Offer Image"}
                            width={180}
                            height={180}
                            className="horizontal-main-img"
                        />
                        <Link href={merchantHref}>
                            <h5 className='f-13'>{merchant_name}</h5>
                        </Link>
                    </div>

                {/* RIGHT: Content Section */}
                <div className="horizontal-content-body d-flex flex-column justify-content-between">
                    <div>
                        {finalDiscountTag && (
                            <div className="fire-badge mb-2">
                                <FontAwesomeIcon icon={faFire} className="fire-icon me-1" height={15} width={15} />
                                <span className="fw-bold">{calculateOfferDuration(offer?.end_date)}</span>
                            </div>
                        )}
                            <h3 className="horizontal-title mb-1 truncate-3-lines">
                                {offer?.offer_title}
                            </h3>
                        <div className="mt-2">
                            <OfferDetailsToggle
                                offer={offer}
                                merchantHref={merchantHref}
                                imageSrc={imageSrc}
                                domain={domain}
                                type="anchor"
                                buttonClass="f-14 fw-600 text-primary-hover"
                                isDetail={product?.is_detail}
                                productDetailUrl={productDetailUrl}
                            />
                        </div>
                    </div>
                    <div className="offer-promo-line">
                        {type === "product" && (
                            <div className="price-info">
                                {salePrice > 0 && (
                                    <span className="price-sale">
                                        {getCurrencySymbol(offer?.currency)}{salePrice}
                                    </span>
                                )}
                                {originalPrice > 0 && (
                                    <span className="price-original ms-2">
                                        {getCurrencySymbol(offer?.currency)}{originalPrice}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Bottom: Button */}
                    <div className="mt-3">
                        {product?.coupon_code ? (
                            <OfferOutUrl
                                unique_id={product?.unique_id}
                                outUrl={product?.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass="btn-check-price w-100"
                            >
                                Show Code
                            </OfferOutUrl>
                        ) : (
                            <OfferOutUrl
                                unique_id={product?.unique_id}
                                outUrl={product?.url}
                                merchantHref={merchantHref}
                                domain={domain}
                                customClass="btn-check-price w-100"
                            >
                                Get Deal
                            </OfferOutUrl>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferListCard
