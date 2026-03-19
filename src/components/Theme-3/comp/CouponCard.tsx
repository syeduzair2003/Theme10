import { discardHTMLTags, extractOfferCodeFromUrl, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getRandomRating, getRandomStoreSeoTitle, splitOfferTitle } from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import Image from 'next/image';
import React from 'react';
import RenderRating from './RenderRating';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import OfferDuration from './OfferDuration';
import Link from 'next/link';
import SocialMediaShare from './SocialMediaShare';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    product: Offer;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
    pageType?: string;
    productDetailUrl?: string | null;
}

const CouponCard = async ({ product, merchantHref, domain, merchant_name, merchant_logo, pageType, productDetailUrl }: Props) => {
    const rating = getRandomRating(product?.rating);
    const imageUrl = getBaseImageUrl(domain, merchant_logo, '');
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
        <div className="single-box transition h-100 rounded-4 n1-bg-color w-100 cus-border b-eighth rounded-4 p-3 p-md-4 bg-white border shadow-sm d-flex gap-1 flex-column justify-content-between h-100 position-relative">
            {product?.offer_type?.name === "product" && (discountPercent ?? 0) > 0 && (
                <div className="ribbon">
                    <span>{finalDiscountTag}</span>
                </div>
            )}
            {product?.offer_type?.name === "product" && (
                <OfferDuration endDate={product?.end_date} />
            )}
            <div className={`d-flex align-items-center gap-3`}>
                <div
                    className="p-2 border rounded-3 d-flex align-items-center justify-content-center"
                    style={{ minWidth: 100, maxWidth: 120, height: 80 }}
                >
                    <Image
                        // src={imageUrl}
                        src={(product?.offer_type?.name === "product" && product?.product_image) ? getBaseImageUrl(domain, product?.product_image, '') : imageUrl}
                        alt={merchant_name}
                        className="img-fluid object-fit-contain"
                        height={100}
                        width={100}
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        layout='responsive'
                    />
                </div>
                <div className="d-flex flex-column">
                {product?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl}>
                            <h4 className="n17-color fw-bold truncate-3-lines" style={{ fontSize: '0.97rem' }}>
                                {discardHTMLTags(product?.offer_title)}
                            </h4>
                        </Link>
                    ))
                ) : (
                    <h4 className="n17-color fw-bold truncate-3-lines" style={{ fontSize: '0.97rem' }}>
                        {discardHTMLTags(product?.offer_title)}
                    </h4>
                )}
                <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantHref={merchantHref} offer={product} type='anchor' merchantImg={merchant_logo} />
                </div>
                {/* <h4 className="n17-color fw-bold" style={{ fontSize: '0.97rem' }}>{splitOfferTitle(product?.offer_title).join(' / ')}</h4> */}
            </div>

            <div className={`${pageType !== 'events' ? 'border-bottom' : ''}`}>
                <div className="d-flex align-items-center gap-1 justify-content-between border-bottom pb-1">
                    {product?.offer_type?.name !== "product" && (
                        <OfferDuration endDate={product?.end_date} />
                    )}
                    {product?.offer_type?.name === "product" && (product?.original_price || product?.sale_price) && (
                        <div className="d-flex flex-column align-items-center justify-content-center">
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
                                        const endIndex = spaceIndex !== -1 ? spaceIndex : 7;
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
                                    {product?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                                </span>
                            </OfferOutUrl>
                        )}
                    </div>
                </div>
                <div className="d-flex align-items-center gap-1 justify-content-between py-3">
                    <div className="rating">
                        <RenderRating rating={rating} />
                        <span className="small text-muted">({rating})</span>
                    </div>
                    <SocialMediaShare offerUrl={`/${product?.url}`} offerTitle={product?.offer_title} merchantHref={merchantHref} unique_id={product?.unique_id} domain={domain} />
                </div>
            </div>
            {pageType !== 'events' && (
                <Link href={merchantHref}>
                    <small className="text-muted fw-bold f-14">{getRandomStoreSeoTitle(merchant_name)}</small>
                </Link>
            )}
        </div>
    );
};

export default CouponCard;
