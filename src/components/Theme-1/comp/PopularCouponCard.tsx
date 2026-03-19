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
    mer_slug: string;
    slug_type: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}
const PopularCouponCard = async ({ item, mer_slug, slug_type, merchant_logo, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(item?.merchant?.merchant_detail);
    const product = item?.offer;
     const type = product?.offer_type?.name
           const imageSrc =
                   type === "product"
                       ? getBaseImageUrl(domain, product?.product_image, "")
                       : getBaseImageUrl(domain, merchant_logo, "");
    const daysLeft = calculateOfferDuration(item?.offer?.end_date)

    // checking price
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    return (
        <div className="card-offer d-flex flex-column justify-content-between position-relative border-0 shadow-sm hover-shadow-lg transition h-100">

            {/* Top Tag */}
            <div className="top-tag d-flex align-items-center gap-1 text-white fw-semibold text-uppercase">
                {type === "product" && discountPercent ? (
                    <span>{discountPercent}% OFF</span>
                ) : (
                    <span className="status-live text-white">{daysLeft}</span>
                )}
            </div>

            {/* Header Section */}
            <div className="card-header bg-light d-flex align-items-center justify-content-center">
                <div className="product-item__thumb">
                    <Link href={getMerchantHref(item.merchant, mer_slug, slug_type)} className="link text-decoration-none">
                        <div className="off-mer-image-unique text-center">
                            <Image
                                src={imageSrc}
                                alt={
                                    item?.merchant?.merchant_name
                                }
                                height={100}
                                width={100}
                                sizes="(max-width: 576px) 100vw, 250px"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-between gap-3 h-100">
                <div className="card-body d-flex justify-content-between flex-column card-body text-center pb-2 pt-3">
                    <span className="d-block fw-semibold text-dark mb-2 font-15">
                        <Link
                            href={getMerchantHref(item.merchant, mer_slug, slug_type)}
                            className="text-decoration-none text-dark"
                        >
                            {heading
                                ? discardHTMLTags(heading)
                                : getRandomStoreSeoTitle(item?.merchant?.merchant_name)}
                        </Link>
                    </span>

                   {product?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl} className="truncate-3-lines fs-six f-16 n17-color fw-bold m-0">
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ))
                ) : (
                    <p className=" truncate-3-lines fs-six f-16 n17-color fw-bold m-0">
                        {discardHTMLTags(product?.offer_title)}
                    </p>
                )}

                    <div className="d-flex align-items-center justify-content-between px-3">
                        <OfferDetailsToggle domain={domain} imageSrc={imageSrc} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} offer={product} type='anchor' />
                        {/* {type === "product" ? (
                            product?.sale_price ? (
                                <div className="price-info d-flex flex-row align-items-center gap-2 justify-content-center">
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
                        )} */}

                        <OfferOutUrl outUrl={item.offer.url} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={item.offer.unique_id} customClass='btn-get-deal text-decoration-none' domain={domain}>
                            Get Coupon
                        </OfferOutUrl>

                    </div>
                </div>
                <div>
                    {/* Footer Section */}
                    <div className="card-footer d-flex justify-content-between align-items-center small text-muted bg-light py-2 px-3">
                        {/* Social Share */}
                        <div className="d-flex justify-content-center">
                            <SocialMediaShare offerUrl={`/${product?.url}`} offerTitle={product?.offer_title} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={product?.unique_id} domain={domain} />
                        </div>
                        <span className="status-verified text-success fw-semibold">✔ Verified</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default PopularCouponCard
