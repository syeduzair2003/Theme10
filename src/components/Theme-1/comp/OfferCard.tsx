import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { OffersOffer } from '@/services/dataTypes'
import { calculateOfferDuration, discardHTMLTags, getCurrencySymbol, getMerchantHref, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
// import OfferOutUrl from './OfferOutUrl'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import cookieService from '@/services/CookiesService'
import RenderRating from './RenderRating'
import SocialMediaShare from './SocialMediaShare'

interface Props {
    item: OffersOffer;
    mer_slug: string;
    slug_type: string;
    preloadedImage: string;
}
const OfferCard = async ({ item, mer_slug, slug_type, preloadedImage }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const [heading, details] = splitHeadingFromDetails(item?.merchant?.merchant_detail);
    console.log("img", preloadedImage)
    const product = item?.offer;

    // declaring type for the condition 
    const type = product?.offer_type?.name

    // price calculation for badges 
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const daysLeft = calculateOfferDuration(item?.offer?.end_date)
    return (
        <div className="col-lg-3 d-flex">
            <div className="product-item product-item-cus shadow overlay-none flex-grow-1 d-flex flex-column">
                {type === "product" && (
                    <div className="ribbon-long-wrapper">
                        {/* Ribbon Badge */}
                        <div className="ribbon-long-tag">
                            <span>{discountPercent}% OFF</span>
                        </div>
                    </div>
                )}
                <div className="product-item__thumb d-flex max-h-unset">
                    <Link href={getMerchantHref(item.merchant, mer_slug, slug_type)} className="link">
                        {/* <div className="off-mer-image" style={{ height: 200, width: 250, padding: 15 }}>  */}
                        <div className="off-mer-image-unique">
                            <Image
                                src={preloadedImage}
                                alt={
                                    heading
                                        ? discardHTMLTags(heading)
                                        : getRandomStoreSeoTitle(item?.merchant?.merchant_name)
                                }
                                height={100}
                                width={100}
                                sizes="(max-width: 576px) 100vw, 250px"
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                    </Link>
                </div>
                {/* chhange implementation from here */}
                <div className="product-item__content">
                    <div className=''>
                    <div className="top-area d-flex mb-1" style={{height: '38px'}}>
                        <span className="font-12">
                            <Link href={getMerchantHref(item.merchant, mer_slug, slug_type)}>
                                {heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(item?.merchant?.merchant_name)}
                            </Link>
                        </span>
                    </div>

                    {/* 🟢 Section 2: Offer Title */}
                    <div className="title-area d-flex" style={{minHeight: '100px', maxHeight: '180px'}} >
                        <h6 className="product-item__title custom-heading-animation top-new-border f-15 sp-2 pt-2 pb-2">
                            <OfferOutUrl outUrl={item.offer.url} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={item.offer.unique_id} customClass='link' domain={domain}>
                                {item.offer.offer_title}
                            </OfferOutUrl>
                        </h6>
                    </div>
                    </div>

                    {/*  Section 3: Details Area */}
                    <div className="bottom-area d-flex flex-column gap-1 gap-md-1 text-center">

                        {/* Offer Duration daysleft */}
                        <div className="offer-duration-badge justify-content-center">
                            <span className="product-item__prevPrice">
                                {daysLeft}
                            </span>
                        </div>
                        {/* Price Info */}
                        {type === "product" && (
                            <div className="price-info d-flex flex-row align-items-center gap-2 justify-content-center">
                                {product?.sale_price ? (
                                    <>
                                        <span className="fw-bold text-success f-16">
                                            {getCurrencySymbol(product?.currency)}
                                            {product?.sale_price}
                                        </span>
                                        <span className="text-decoration-line-through f-14 text-muted ">
                                            {getCurrencySymbol(product?.currency)}
                                            {product?.original_price}
                                        </span>
                                    </>
                                ) : (
                                    product?.original_price && (
                                        <span className="fw-bold text-success f-16">
                                            {getCurrencySymbol(product?.currency)}
                                            {product?.original_price}
                                        </span>
                                    )
                                )}
                            </div>
                        )}

                        {/* Rating */}
                        <div className="rounded-1 n1-bg-color d-center gap-1 gap-md-1 justify-content-center">
                            <div className="rating">
                                <RenderRating rating={getRandomRating(product?.rating)} />
                            </div>
                        </div>

                        {/* Social Share */}
                        <div className="d-flex justify-content-center">
                            <SocialMediaShare offerUrl={`/${product?.url}`} offerTitle={product?.offer_title} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={product?.unique_id} domain={domain} />
                        </div>

                        {/* get coupon button  */}
                        <div className="product-item__bottom flx-between gap-1 border-0">
                            <div className="mx-auto">
                                <OfferOutUrl outUrl={item.offer.url} merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)} unique_id={item.offer.unique_id} customClass='custom-btn-dark f-13' domain={domain}>
                                    Get Coupon
                                </OfferOutUrl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfferCard
