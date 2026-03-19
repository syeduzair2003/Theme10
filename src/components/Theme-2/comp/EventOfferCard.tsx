import { discardHTMLTags, getBaseImageUrl, getFinalDiscountTag } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Offer, ProductData } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import OfferDetailsToggle from './OfferDetailsToggle';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import { faFire, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    offer: Offer | ProductData;
    type?: string;
    merchant_logo: string;
    merchantHref: string;
    merchant_name: string;
    pageType?: string;
    productDetailUrl?: string | null;
}

const EventOfferCard = async ({ offer, merchant_logo, merchantHref, merchant_name, pageType, productDetailUrl }: Props) => {

    const domain = (await cookieService.get("domain")).domain;
    const product = offer;

    // 1. Resolve URLs
    const finalProductUrl = productDetailUrl || merchantHref;
    const merchantLogoSrc = getBaseImageUrl(domain, merchant_logo, "");

    // 2. Resolve Main Image Logic
    // If product_image exists, use it. Otherwise, fallback to merchant logo.
    const hasProductImage = !!product?.product_image;
    const mainImageSrc = hasProductImage
        ? getBaseImageUrl(domain, product?.product_image, "")
        : merchantLogoSrc;

    // 3. Calculate Discount Logic
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
        // <Link href={finalProductUrl} className="text-decoration-none h-100 d-block">
        <div className="t2-card t2-grid-card">
            <div className="t2-card-img-wrapper">
                {/* --- Top Right: Discount Tag --- */}
                {finalDiscountTag && (
                    <div className="t2-discount-tag" style={{ color: '#e74c3c' }}>
                        <FontAwesomeIcon icon={faFire} height={15} width={15} /> 
                        {finalDiscountTag}
                    </div>
                )}

                <Image
                    src={mainImageSrc}
                    alt={offer?.offer_title || merchant_name || "Offer Image"}
                    width={200}
                    height={200}
                    className="t2-card-img"
                    style={{ objectFit: hasProductImage ? 'contain' : 'contain', padding: hasProductImage ? '0' : '20px' }}
                />

                {hasProductImage && (
                    <div className="t2-merchant-overlay">
                        <Link href={merchantHref}>
                            <Image
                                src={merchantLogoSrc}
                                alt={`${merchant_name} logo`}
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                )}
            </div>

            <div className="t2-grid-body">
                    <h4 className="t2-grid-title truncate-3-lines" title={discardHTMLTags(offer?.offer_title)}>
                        {discardHTMLTags(offer?.offer_title)}
                    </h4>
                <OfferDetailsToggle
                    offer={offer}
                    merchantHref={merchantHref}
                    imageSrc={mainImageSrc}
                    domain={domain}
                    type="anchor"
                    buttonClass="f-13 fw-bold text-muted hover-purple text-center"
                    isDetail={product?.is_detail}
                    productDetailUrl={productDetailUrl}
                />
                <div className="mt-auto pt-2">
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
                            customClass="t2-btn-pill"
                        >
                            {offer?.offer_type?.name === "product" ? "Shop Now" : "Get Deal"}
                        </OfferOutUrl>
                    )}
                </div>
            </div>
        </div>
        // </Link>
    );
}

export default EventOfferCard;