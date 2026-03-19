import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { calculateOfferDuration, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating, getRandomStoreSeoTitle } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Offer, ProductData, } from '@/services/dataTypes';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import RenderRating from './RenderRating';
import SocialMediaShare from './SocialMediaShare';
import { faClock, FontAwesomeIcon } from '@/constants/icons';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    offer: Offer | ProductData;
    type?: string;
    merchant_logo: string;
    merchantHref: string;
    merchant_name: string;
    pageType?: string;
    productDetailUrl?: string | null;
}

const CouponCard = async ({ offer, merchant_logo, merchantHref, merchant_name, pageType, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const product = offer;
    const type = offer?.offer_type?.name
    const mainImageSrc = type === "product"
        ? getBaseImageUrl(domain, product?.product_image, "")
        : getBaseImageUrl(domain, merchant_logo, "");
    const secondaryLogoSrc = type === "product"
        ? getBaseImageUrl(domain, merchant_logo, "")
        : null;
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");
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
        <div className="offer-vertical-card h-100 position-relative overflow-hidden">

            <div className="d-block h-100 text-decoration-none">
                <div className="offer-image-container">
                        <Image
                            src={mainImageSrc}
                            alt={product?.offer_title || "Offer Image"}
                            width={300}
                            height={200}
                            className={`main-offer-img ${type !== 'product' ? 'contain-logo' : 'cover-product'}`}
                        />
                    {secondaryLogoSrc && (
                        <Link href={merchantHref}>
                            <div className="merchant-badge-overlay shadow-sm">
                                <Image
                                    src={secondaryLogoSrc}
                                    alt="Merchant"
                                    width={40}
                                    height={40}
                                    className="merchant-badge-img"
                                />
                            </div>
                        </Link>

                    )}

                    {finalDiscountTag && (
                        <span className="tag-exclusive">{finalDiscountTag}</span>
                    )}
                </div>

                <div className="offer-card-body">
                    {pageType !== 'event' && (
                        <p className="offer-merchant-name text-uppercase fw-bold mb-1 f-13">
                            {merchant_name}
                        </p>
                    )}

                    <h3 className="offer-title-text mb-2 truncate-3-lines">
                        <OfferOutUrl
                            unique_id={offer?.unique_id}
                            outUrl={offer?.url}
                            merchantHref={merchantHref}
                            domain={domain}
                            customClass="text-decoration-none"
                        >
                            {offer?.offer_title}
                        </OfferOutUrl>
                    </h3>
                    <div className="offer-promo-line">
                        {type === "product" && (
                            <div className="price-info">
                                {product?.sale_price && (
                                    <span className="price-sale">
                                        {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                    </span>
                                )}
                                {product?.original_price && (
                                    <span className="price-original ms-2">
                                        {getCurrencySymbol(product?.currency)}{product?.original_price}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="offer-hover-footer">
                {offer?.end_date && (
                    <div className="offer-duration mb-2">
                        <FontAwesomeIcon icon={faClock} className="me-1" height={15} width={15} />
                        <span>{calculateOfferDuration(offer?.end_date)}</span>
                    </div>
                )}
                <div className="mb-2 text-center">
                    <OfferDetailsToggle
                        offer={offer}
                        merchantHref={merchantHref}
                        imageSrc={imageSrc}
                        domain={domain}
                        type="anchor"
                        buttonClass="f-13 fw-bold text-muted hover-purple"
                        isDetail={product?.is_detail}          // ADD
                        productDetailUrl={productDetailUrl}    // ADD
                    />
                </div>
                {product?.coupon_code ? (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="btn-reveal-action w-100"
                    >
                        Show Code
                    </OfferOutUrl>
                ) : (
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="btn-reveal-action w-100"
                    >
                        {type === "product" ? "Shop Now" : "Get Deal"}
                    </OfferOutUrl>
                )}
            </div>
        </div>
    );
}

export default CouponCard
