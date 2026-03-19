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

const EventsCard = async ({
    item,
    merchant_name,
    merchantHref,
    merchant_logo,
    productDetailUrl,
}: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name;

    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, item?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    const daysLeft = calculateOfferDuration(item?.end_date);

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

    const finalDiscountTag = getFinalDiscountTag(
        item?.offer_title || item?.offer_detail,
        discountPercent
    );

    return (
        <div className="event-card d-flex flex-column justify-content-between h-100">
            {/* Ribbon */}
            {finalDiscountTag && (
                <div className="event-card__ribbon">
                    <span>{finalDiscountTag}</span>
                </div>
            )}

            <div
                className="position-relative p-3"
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


            {/* Body */}
            <div className="event-card__body d-flex flex-column justify-content-between h-100">

                {/* TOP SECTION: Merchant & Title */}
                <div>
                    {/* Merchant Name (Added to match layout) */}
                    <div className="mb-2">
                        <span className="travel-card__meta">{merchant_name}</span>
                    </div>

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
                </div>

                {/* MIDDLE SECTION: Toggle & Price (Grouped together above button) */}
                <div className="event-card__meta d-flex align-items-center justify-content-between w-100 mb-3">

                    {/* Toggle Icon */}
                    <OfferDetailsToggle domain={domain} imageSrc={imageSrc} merchantHref={imageSrc} offer={item} type='anchor' />

                    {/* Price Logic (Moved from Footer to here) */}
                    {type === "product" && (item?.sale_price || item?.original_price) ? (
                        <div className="d-flex flex-row align-items-center gap-2">
                            {item?.sale_price ? (
                                <span className="fw-bold">
                                    {getCurrencySymbol(item?.currency)}{item?.sale_price}
                                </span>
                            ) : (
                                <span className="fw-bold">
                                    {getCurrencySymbol(item?.currency)}{item?.original_price}
                                </span>
                            )}

                            {item?.original_price && item?.sale_price && (
                                <span className="text-decoration-line-through text-muted small">
                                    {getCurrencySymbol(item?.currency)}{item?.original_price}
                                </span>
                            )}
                        </div>
                    ) : (
                        /* Fallback to Days Left if no price or not a product */
                        <span className="product-item__prevPrice">
                            {daysLeft}
                        </span>
                    )}
                </div>

                {/* BOTTOM SECTION: Footer Button */}
                <div className="event-card__footer mt-0">
                    <OfferOutUrl
                        outUrl={item?.url}
                        merchantHref={merchantHref}
                        unique_id={item?.unique_id}
                        customClass="event-card__btn w-100"
                        domain={domain}
                    >
                        Shop Now
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
};

export default EventsCard;
