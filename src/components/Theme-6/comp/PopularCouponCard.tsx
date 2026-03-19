import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { OffersOffer } from '@/services/dataTypes';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import cookieService from '@/services/CookiesService';
import OfferDetailsToggle from './OfferDetailsToggle';
import SocialMediaShare from './SocialMediaShare';

// Import the CSS file here if using modules, or ensure it's in globals.css

interface Props {
    item: OffersOffer;
    mer_slug: string;
    slug_type: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const PopularCouponCard = async ({ item, mer_slug, slug_type, merchant_logo, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(item?.merchant?.merchant_detail);
    const product = item?.offer;
    const type = product?.offer_type?.name;

    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    const daysLeft = calculateOfferDuration(item?.offer?.end_date);

    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const merchantLink = getMerchantHref(item.merchant, mer_slug, slug_type);

    return (
        <div className="travel-card">
            {/* Image Banner Section */}
            <div className="travel-card__img-container">
                <Link href={merchantLink} className="text-decoration-none">
                    <Image
                        src={imageSrc}
                        alt={item?.merchant?.merchant_name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: "contain" }}
                    />
                </Link>
            </div>

            {/* Content Body */}
            <div className="travel-card__body">
                {/* Meta Row: Duration and Tag */}
                <Link href={merchantLink} className="travel-card__meta">
                    {/* <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{daysLeft} Left</span>  */}
                    <span>{item?.merchant?.merchant_name}</span>
                </Link>

                {/* Title */}
                {product?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl} className="truncate-3-lines travel-card__title">
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ))
                ) : (
                    <p className=" truncate-3-lines travel-card__title">
                        {discardHTMLTags(product?.offer_title)}
                    </p>
                )}

                {/* Subtitle / Details */}
                {/* <div className="travel-card__subtitle">
                     {heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(item?.merchant?.merchant_name)}
                     {details && ` - ${discardHTMLTags(details)}`}
                </div> */}

                {/* Price Section */}
                {/* <div className="travel-card__price-block">
                    <div className="travel-card__prices">
                        {originalPrice > 0 && (
                            <span className="price-original">${originalPrice}</span>
                        )}   
                    </div>
                </div> */}


                {/* Footer Action */}
                <div className="travel-card__footer d-flex flex-column justify-content-between gap-3 align-items-stretch">
                    {/* Top Section of Footer */}
                    <div className="travel-card__rating d-flex align-items-center justify-content-between w-100">
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <span className="product-item__prevPrice fw-semibold">
                                {daysLeft}
                            </span>
                            <OfferDetailsToggle
                                domain={domain}
                                imageSrc={imageSrc}
                                merchantHref={merchantLink}
                                offer={product}
                                type='anchor'
                            />
                        </div>

                        {/* Social Share aligned to the right */}
                        <SocialMediaShare
                            offerUrl={`/${product?.url}`}
                            offerTitle={product?.offer_title}
                            merchantHref={merchantLink}
                            unique_id={product?.unique_id}
                            domain={domain}
                        />
                    </div>

                    {/* Bottom Section (Button) */}
                    <OfferOutUrl
                        outUrl={item.offer.url}
                        merchantHref={merchantLink}
                        unique_id={item.offer.unique_id}
                        customClass='event-card__btn w-100 text-center'
                        domain={domain}
                    >
                        Buy Now
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
};

export default PopularCouponCard;