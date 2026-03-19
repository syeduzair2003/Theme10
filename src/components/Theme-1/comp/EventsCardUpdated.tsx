import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Offer, ProductData } from "@/services/dataTypes";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import cookieService from "@/services/CookiesService";
import {
    calculateOfferDuration,
    discardHTMLTags,
    getBaseImageUrl,
    getCurrencySymbol,
    getFinalDiscountTag,
} from "@/constants/hooks";
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
    item: Offer | ProductData;
    merchant_name: string;
    merchantHref: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const EventsCardUpdated = async ({
    item,
    merchant_name,
    merchantHref,
    merchant_logo,
    productDetailUrl,
}: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name
       const imageSrc =
               type === "product"
                   ? getBaseImageUrl(domain, item?.product_image, "")
                   : getBaseImageUrl(domain, merchant_logo, "");

    // Days left
    const daysLeft = calculateOfferDuration(item?.end_date);

    // Price logic
    const originalPrice = item?.original_price
        ? parseFloat(item.original_price)
        : 0;

    const salePrice = item?.sale_price
        ? parseFloat(item.sale_price)
        : 0;

    const discountPercent =
        originalPrice > 0 && salePrice > 0
            ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
            : null;

    // Coupon / Label logic
    const couponLabel =
        item?.coupon_code
            ? `Code: ${item.coupon_code}`
            : discountPercent
                ? `${discountPercent}% OFF`
                : "Get Deal";

    const description = "Limited Time Offer";
    const finalDiscountTag = getFinalDiscountTag(
        item?.offer_title || item?.offer_detail,
        discountPercent,
    );


    return (
        <div
            className=" event-card-hover d-flex flex-column justify-content-between rounded-4 shadow-sm position-relative bg-white h-100"
            style={{ maxWidth: 380, border: "1px solid rgba(0, 0, 0, 0.23)" }}
        >
            {finalDiscountTag && (
                <div className="event-ribbon">
                    <span>
                        {finalDiscountTag}
                    </span>
                </div>
            )}

            {/* Top Image */}
            <div
                className="position-relative p-3"
                style={{
                    borderBottom: "1px solid rgba(0, 0, 0, 0.23)"
                }}
            >
                <Image
                    src={imageSrc}
                    width={300}
                    height={200}
                    alt={item?.offer_title || "Offer image"}
                    className="w-100"
                    style={{ objectFit: "contain", height: "140px" }}
                />
            </div>

            {/* Content */}
            <div className="p-3 h-100 d-flex flex-column justify-content-between">
                {/* Merchant */}
                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="fw-semibold">{merchant_name}</span>
                </div>

                {/* Title */}
                {item?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl} className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-2">
                            {discardHTMLTags(item?.offer_title)}
                        </Link>
                    ))
                ) : (
                    <p className="truncate-3-lines fs-six f-16 n17-color fw-bold mb-2">
                        {discardHTMLTags(item?.offer_title)}
                    </p>
                )}


                {/* Subtitle */}
                {/* {finalDiscountTag && (
                    <p className="cus-tags mb-2">
                        {finalDiscountTag}
                    </p>
                )} */}

                {/* Button */}
                <div className="d-flex flex-column justify-content-between align-items-stretch mb-3">

                    {/* price section */}
                    <div className="price-info d-flex align-items-start  justify-content-between mb-2">
                        
                        <OfferDetailsToggle domain={domain} imageSrc={imageSrc} merchantHref={imageSrc} offer={item} type='anchor' />

                        {type === "product" ? (
                            item?.sale_price ? (
                                <div className="price-info d-flex flex-row align-items-center gap-2 justify-content-center">
                                    {item?.original_price ? (
                                        <>
                                            <span className="fw-bold text-success f-15">
                                                {getCurrencySymbol(item?.currency)}
                                                {item?.sale_price}
                                            </span>
                                            <span className="text-decoration-line-through f-14 text-muted">
                                                {getCurrencySymbol(item?.currency)}
                                                {item?.original_price}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="fw-bold text-success f-15">
                                            {getCurrencySymbol(item?.currency)}
                                            {item?.sale_price}
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
                        outUrl={item?.url}
                        merchantHref={merchantHref}
                        unique_id={item?.unique_id}
                        customClass="btn-get-deal w-100"
                        domain={domain}
                    >
                        Shop Now
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
};

export default EventsCardUpdated;
