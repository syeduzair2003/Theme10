"use client"
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RenderRating from './RenderRating'
import OfferModal from './OfferModal'
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import { apiOfferDetails } from '@/apis/offers'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
// import Image from "@/components/shared/Image";
import OfferDuration from './OfferDuration'
import SocialMediaShare from './SocialMediaShare'
import Link from 'next/link'
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons'
import SimpleOfferModal from './SimpleOfferModal'

interface Props {
    product: OffersOffer,
    companyId: string,
    awaited_p_id?: string,
    mer_slug_type: string,
    mer_slug: string,
    domain: string,
    rating: number,
    ads_campaign: boolean;
}

let renderCount = 0;
const OffersListView = ({ product, companyId, awaited_p_id, mer_slug_type, mer_slug, domain, rating, ads_campaign }: Props) => {

    console.log('pid: ', awaited_p_id, 'ads: ', ads_campaign)
    const [p_data, setP_data] = useState<Offer | null>(null);
    const [showModal, setShowModal] = useState(false);
    const merchantHref = getMerchantHref(product.merchant, mer_slug, mer_slug_type);
    const daysLeft = calculateOfferDuration(product?.offer?.end_date)
    const [showMoreDetails, setShowMoreDetails] = useState(false);
    const offerDetails = discardHTMLTags(product?.offer?.offer_detail)

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

    const originalPrice = product?.offer?.original_price ? parseFloat(product?.offer?.original_price) : 0;
    const salePrice = product?.offer?.sale_price ? parseFloat(product?.offer?.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer?.offer_title || product?.offer?.offer_detail,
        discountPercent,
    );

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
                    merchantHref={merchantHref}
                />
            )}
            <div className="col-lg-12 mb-3">
                <div className="Display-Offer-card border rounded-4 p-4 mb-4 position-relative">

                    {/* top tag */}
                    {/* <div className="offer-duration-badge  justify-content-center"> */}
                    {(finalDiscountTag) && (
                        <div className="ribbon">
                            <span>{finalDiscountTag}</span>
                        </div>
                    )}

                    <div className="all-main-parent d-flex align-items-center justify-content-start">
                        {/* Product image  */}
                        {product?.offer?.offer_type?.name === "product" && (
                            <div className="prod-image">
                                <div
                                    style={{ width: '100px', height: '100px', marginRight: '20px' }}
                                >
                                    <Image
                                        // src={imageUrl}
                                        src={getBaseImageUrl(domain, product?.offer?.product_image, "")}
                                        alt={
                                            product?.offer?.offer_type?.name === "product"
                                                ? `${product?.offer?.offer_title || "Product"} image`
                                                : `${product?.merchant?.merchant_name} Deals and Coupons`
                                        }
                                        className="img-fluid object-fit-contain"
                                        height={100}
                                        width={100}
                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                        layout='responsive'
                                    />
                                </div>
                            </div>
                        )}
                        <div className="main-parent-content">
                            {/* Title */}
                            <h4 className="text-start n17-color f-18 fw-bold m-0">{discardHTMLTags(product?.offer?.offer_title?.replaceAll('_', ' '))}</h4>

                            {product?.offer?.offer_type?.name === "product" && (
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="price-info d-flex flex-row align-items-center gap-3 justify-content-center">
                                        {product?.offer?.sale_price && (
                                            <span className="fw-bold text-success f-20">
                                                ${product?.offer?.sale_price}
                                            </span>
                                        )}
                                        {product?.offer?.original_price && (
                                            <span className="text-decoration-line-through f-14 text-muted">
                                                ${product?.offer?.original_price}
                                            </span>
                                        )}
                                    </div>
                                    <SocialMediaShare offerUrl={`/${product?.offer?.url}`} offerTitle={product?.offer?.offer_title} merchantHref={merchantHref} unique_id={product?.offer?.unique_id} domain={domain} />
                                </div>
                            )}

                        </div>

                    </div>
                    {/* Rating + Social Icons + Button */}
                    <div className="cus-border border-top border-bottom b-seventh p-2 mt-2">
                        <div className="d-flex align-items-center w-100 justify-content-between gap-1 flex-lg-row flex-xl-row flex-column">
                            {/* rating  */}

                            <div className="rating d-flex justify-content-center align-items-center">
                                <RenderRating rating={rating} /> ({rating})
                            </div>
                            {/* Ribbon for product */}
                            {product?.offer?.offer_type?.name === "product" && (discountPercent ?? 0) > 0 && (
                                <div className="offer-duration-badge justify-content-center">
                                    <span className="product-item__prevPrice">
                                        {discountPercent}% OFF
                                    </span>
                                </div>
                            )}

                            {/* Socials  */}

                            {product?.offer?.offer_type?.name !== 'product' && (
                                <SocialMediaShare offerUrl={`/${product?.offer?.url}`} offerTitle={product?.offer?.offer_title} merchantHref={merchantHref} unique_id={product?.offer?.unique_id} domain={domain} />
                            )}

                            {product?.offer?.coupon_code ? (
                                <>
                                    <OfferOutUrl
                                        unique_id={product?.offer?.unique_id}
                                        outUrl={product?.offer?.url}
                                        merchantHref={merchantHref}
                                        domain={domain}
                                        customClass='btn-mer-offer'
                                    >
                                        {/* <span className="f5-color fw-semibold coupon-code w-100 d-center">
                                            {(() => {
                                                if (!product?.offer?.coupon_code) return "";
                                                const code = product?.offer?.coupon_code.trim();
                                                const spaceIndex = code.indexOf(" ");
                                                // Stop at first space OR limit to 7 characters
                                                const endIndex = spaceIndex !== -1 ? spaceIndex : 7;
                                                return code.slice(0, endIndex);
                                            })()}
                                        </span> */}
                                        <span className="fw-semibold" >
                                            Show Coupon
                                        </span>
                                    </OfferOutUrl>
                                </>
                            ) : (
                                <OfferOutUrl unique_id={product.offer.unique_id}
                                    outUrl={product.offer.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass='btn-mer-offer'
                                >
                                    <span className="fw-semibold">
                                        {product?.offer?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                                    </span>
                                </OfferOutUrl>
                            )}

                        </div>
                    </div>
                    <div className="off-desc">
                        <p className="offerx-short text-center">
                            {showMoreDetails
                                ? offerDetails
                                : offerDetails?.length > 140
                                    ? offerDetails?.slice(0, 140) + "..."
                                    : offerDetails}
                        </p>
                        {offerDetails?.length > 140 && (
                            <button
                                className="offerx-toggle text-primary fw-bold"
                                onClick={() => setShowMoreDetails(!showMoreDetails)}
                            >
                                {showMoreDetails ? "Hide Details" : "Show More Details"}
                                {/* <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} /> */}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OffersListView
