import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Offer, OffersOffer } from "@/services/dataTypes";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import cookieService from "@/services/CookiesService";
import {
    calculateOfferDuration,
    getCurrencySymbol,
    getRandomStoreSeoTitle,
} from "@/constants/hooks";

interface Props {
    item: Offer;
    preloadedImage: string;
    merchant_name: string;
    merchantHref: string;
}

const EventCard = async ({
    item,
    preloadedImage,
    merchant_name,
    merchantHref,
}: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name

    // Calculate discount percentage if available
    const daysLeft = calculateOfferDuration(item?.end_date)

    // checking price
    const originalPrice = item?.original_price ? parseFloat(item.original_price) : 0;
    const salePrice = item?.sale_price ? parseFloat(item.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;



    return (
        <div className="deal-card text-center shadow-sm border border-info-subtle rounded-4 p-3 h-100 position-relative">
            {/* Days Left Badge */}
            {daysLeft !== null && (
                <div className="ribbon">
                    <span >
                        {daysLeft}
                    </span>
                </div>
            )}

            {/* Product Image */}
            <div className="deal-image-container mb-3 border rounded-circle" style={{ padding: "20px", width: "170px", margin: "0 auto" }}>
                <Image
                    src={preloadedImage}
                    width={180}
                    height={180}
                    alt={item?.offer_title || "Product image"}
                    className="bg-white p-2 "
                    style={{ objectFit: "contain", height: "130px", width: "100px" }}
                />
            </div>

            {/* Title */}
            <h6 className="deal-title fw-semibold px-2 mb-2">
                {item?.offer_title}
            </h6>

            {/* Price */}
            <div className="price-info d-flex flex-column align-items-center mb-2">
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

                {/* Merchant Name */}
                <p className="text-muted small mb-3">{merchant_name}</p>

                {/* Buy Now Button */}
                <OfferOutUrl
                    outUrl={item?.url}
                    merchantHref={merchantHref}
                    unique_id={item?.unique_id}
                    customClass="btn btn-buy-now w-100 py-2 fw-semibold"
                    domain={domain}
                >
                    Buy Now
                </OfferOutUrl>
            </div>
        </div>
    );
};

export default EventCard;
