import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { OffersOffer } from '@/services/dataTypes'
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getMerchantHref, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
// import OfferOutUrl from './OfferOutUrl'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import cookieService from '@/services/CookiesService'
import RenderRating from './RenderRating'
import SocialMediaShare from './SocialMediaShare'
import OfferDetailsToggle from './OfferDetailsToggle'

interface Props {
    item: OffersOffer;
    merchantHref: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}
const TrendingProductsCard = async ({ item, merchantHref, merchant_logo, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(item?.merchant?.merchant_detail);
    const product = item?.offer;
    const type = product?.offer_type?.name
    const daysLeft = calculateOfferDuration(item?.offer?.end_date)
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");


    // checking price
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    return (
        <div className="trend-prod-card position-relative d-flex flex-xl-row flex-lg-row flex-column h-100">

            {/* Ribbon */}
            <div className="prod-ribbon">
                <span>
                    {type === "product" && discountPercent
                        ? `${discountPercent}% OFF`
                        : "Live Now"}
                </span>
            </div>

            {/* LEFT: Image */}
            <div className="trend-prod-image mb-sm-3">
                <Image
                    src={imageSrc}
                    alt={item?.merchant?.merchant_name}
                    width={140}
                    height={140}
                    className="img-fluid"
                    style={{ objectFit: "contain" }}
                />
            </div>

            {/* RIGHT: Content */}
            <div className="trend-prod-body d-flex flex-column justify-content-between flex-grow-1">

                {/* Title */}
                {product?.is_detail === 1 ? (
                    productDetailUrl && (
                        <Link
                            href={productDetailUrl}
                            className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-1"
                        >
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    )
                ) : (
                    <p className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-1">
                        {discardHTMLTags(product?.offer_title)}
                    </p>
                )}

                <OfferDetailsToggle
                    domain={domain}
                    imageSrc={product?.product_image}
                    merchantHref={imageSrc}
                    offer={product}
                    type="anchor"
                />

                {/* Price / Badge */}
                <div className="price-wrapper mt-1 mb-2">
                    {type === "product" ? (
                        product?.sale_price ? (
                            <div className="d-flex align-items-center gap-2">
                                {product?.original_price ? (
                                    <>
                                        <span className="fw-bold text-success f-15">
                                            {getCurrencySymbol(product?.currency)}
                                            {product?.sale_price}
                                        </span>
                                        <span className="text-decoration-line-through f-14 text-muted">
                                            {getCurrencySymbol(product?.currency)}
                                            {product?.original_price}
                                        </span>
                                    </>
                                ) : (
                                    <span className="fw-bold text-success f-15">
                                        {getCurrencySymbol(product?.currency)}
                                        {product?.sale_price}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <span className="badge-lifetime">Discount</span>
                        )
                    ) : (
                        <span className="badge-lifetime">{daysLeft}</span>
                    )}
                </div>

                {/* CTA */}
                <OfferOutUrl
                    outUrl={item.offer.url}
                    merchantHref={merchantHref}
                    unique_id={item.offer.unique_id}
                    customClass="event-card__btn w-100"
                    domain={domain}
                >
                    Buy Now
                </OfferOutUrl>
            </div>
        </div>
    );

};

export default TrendingProductsCard
