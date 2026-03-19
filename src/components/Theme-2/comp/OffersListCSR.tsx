"use client";

import React, { useEffect, useState } from "react";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating, splitDiscountTag } from "@/constants/hooks";
import { Offer, OffersOffer } from "@/services/dataTypes";
import RenderRating from "./RenderRating";
import Image from "next/image";
import OfferModal from "./OfferModal";
import { apiOfferDetails } from "@/apis/offers";
import { faClock, FontAwesomeIcon } from "@/constants/icons";
import SimpleOfferModal from "./SimpleOfferModal";

interface Props {
    product: OffersOffer;
    companyId: string;
    awaited_p_id?: string;
    mer_slug_type: string;
    mer_slug: string;
    domain: string;
    ads_campaign: boolean;
}

let renderCount = 0;
const OffersListCSR = ({ product, companyId, mer_slug, mer_slug_type, awaited_p_id, domain, ads_campaign }: Props) => {
    const [showMore, setShowMore] = useState(false);
    const [p_data, setP_data] = useState<Offer | null>(null);
    const [showModal, setShowModal] = useState(false);
    const merchantHref = getMerchantHref(product.merchant, mer_slug, mer_slug_type);

    useEffect(() => {
        if (!awaited_p_id || !companyId) return;

        let cancelled = false;

        const fetchOfferDetails = async () => {
            try {
                const offer_details = await apiOfferDetails(awaited_p_id, companyId);
                if (!cancelled) {
                    setP_data(offer_details.data);
                    renderCount += 1;
                }
                if (renderCount === 1) {
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Error fetching offer details:", error);
            }
        };

        fetchOfferDetails();

        return () => {
            cancelled = true;
        };
    }, [awaited_p_id, companyId]);

    const offer = product.offer;
    const type = offer?.offer_type?.name || "";

    const originalPrice = offer?.original_price ? parseFloat(offer.original_price) : 0;
    const salePrice = offer?.sale_price ? parseFloat(offer.sale_price) : 0;
    const discountPercent =
        originalPrice > 0 && salePrice > 0
            ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
            : null;

    const imageSrc = getBaseImageUrl(domain, offer?.product_image, "");
    const offerDetails = discardHTMLTags(product?.offer?.offer_detail)
    const expiry = calculateOfferDuration(offer?.end_date)
    const finalDiscountTag = getFinalDiscountTag(
        product?.offer?.offer_title || product?.offer?.offer_detail,
        discountPercent,
    );
    const { discountValue, discountLabel } = splitDiscountTag(finalDiscountTag);

    return (
        <>
            {showModal && p_data != null && !ads_campaign && (
                <OfferModal
                    data={p_data}
                    companyId={companyId}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                    merchantHref={merchantHref}
                />
            )}
            {(showModal && ads_campaign && p_data != null) && (
                <SimpleOfferModal
                    data={p_data}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                    finalDiscountTag={finalDiscountTag}
                />
            )}
            <div className="col-12 col-sm-6 col-lg-12 mb-3 position-relative">
                <div className="coupon-row-card">
                    <div className="coupon-row-body">
                        {type === "product" && finalDiscountTag && (
                            <div className="ribbon ribbon-top-left">
                                <span>{finalDiscountTag}</span>
                            </div>
                        )}
                        {(type === "product" || offer?.product_image) && (  
                        <div className="coupon-left-section">
                            {type === "product" && offer?.product_image ? (
                                <div className="coupon-product-img-wrapper">
                                    <Image
                                        src={imageSrc}
                                        alt={offer?.offer_title || "Product"}
                                        width={100}
                                        height={100}
                                        className="coupon-product-img"
                                    />
                                </div>
                            ) : (
                                <>
                                    <span className="coupon-value">{discountValue}</span>
                                    <span className="coupon-label">{discountLabel}</span>
                                </>
                            )}
                        </div>
                        )}

                        <div className="coupon-mid-section">
                            {offer?.end_date && (
                                <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                                    <span className="badge-gray">
                                        <FontAwesomeIcon icon={faClock} className="me-1" height={15} width={15}/>
                                        {expiry}
                                    </span>
                                </div>
                            )}

                            <h3 className="coupon-title">
                                <OfferOutUrl
                                    unique_id={offer?.unique_id}
                                    outUrl={offer?.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass="coupon-title"
                                >
                                    {offer?.offer_title}
                                </OfferOutUrl>
                            </h3>
                            <div className="offer-promo-line">
                                {type === "product" && (
                                    <div className="price-info">
                                        {salePrice>0 && (
                                            <span className="price-sale">
                                                {getCurrencySymbol(offer?.currency)}{salePrice}
                                            </span>
                                        )}
                                        {originalPrice>0 && (
                                            <span className="price-original ms-2">
                                                {getCurrencySymbol(offer?.currency)}{originalPrice}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SECTION: Button */}
                        <div className="coupon-right-section">
                            {offer?.coupon_code ? (
                                <OfferOutUrl
                                    unique_id={offer?.unique_id}
                                    outUrl={offer?.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass="btn-peel-action"
                                >
                                    Show Code
                                    <span className="peel-effect"></span>
                                </OfferOutUrl>
                            ) : (
                                <OfferOutUrl
                                    unique_id={offer?.unique_id}
                                    outUrl={offer?.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass="btn-peel-action btn-get-deal"
                                >
                                    Get Deal
                                </OfferOutUrl>
                            )}
                        </div>
                    </div>

                    {/* FOOTER: Details Toggle */}
                    {offerDetails && (
                        <div className="coupon-row-footer">
                            {showMore && (
                                <div className="coupon-details-content">
                                    <p className="m-0">{offerDetails}</p>
                                </div>
                            )}
                            <div className="d-flex w-100 justify-content-end">
                                <button
                                    className="btn-toggle-details"
                                    onClick={() => setShowMore(!showMore)}
                                >
                                    {showMore ? "Hide Details" : "See Details"}
                                    <span className="ms-1 fw-bold">{showMore ? "−" : "+"}</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default OffersListCSR;
