"use client"
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RenderRating from './RenderRating'
// import OfferModal from './OfferModal'
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import { apiOfferDetails } from '@/apis/offers'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import SocialMediaShare from './SocialMediaShare'
import SimpleOfferModal from './SimpleOfferModal'
import OfferModal from './OfferModal'
import OfferDetailsToggle from './OfferDetailsToggle'

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
    const hasProductImage =
        product?.offer?.offer_type?.name === "product" &&
        product?.offer?.product_image;


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
            <div className="row">
                <div className="col-12 col-sm-12 col-md-12 mb-3 force-two-columns">
                    <div className="single-box transition h-100 rounded-4 n1-bg-color cus-border border b-eighth p-0 d-flex flex-column flex-md-row position-relative overflow-hidden">

                        {/* --- RIBBON --- */}
                        {(finalDiscountTag) && (
                            <div className="event-card__ribbon">
                                <span>{finalDiscountTag}</span>
                            </div>
                        )}

                        <div className="d-none">
                            Type Name: {product?.offer?.offer_type?.name}, Discount: {finalDiscountTag}
                        </div>

                        {/* --- LEFT SIDE: IMAGE (ONLY IF EXISTS) --- */}
                        {product?.offer?.offer_type?.name === "product" && product?.offer?.product_image && (
                            <div className="col-12 col-md-4 d-flex align-items-center justify-content-center p-3 border-end">
                                <div style={{ maxWidth: '180px', width: '100%' }}>
                                    <Image
                                        src={getBaseImageUrl(domain, product?.offer?.product_image, "")}
                                        alt={`${product?.offer?.offer_title || "Product"} image`}
                                        className="img-fluid object-fit-contain"
                                        height={150}
                                        width={150}
                                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                                        layout="responsive"
                                    />
                                </div>
                            </div>
                        )}

                        {/* --- RIGHT SIDE: CONTENT --- */}
                        <div
                            className={`d-flex flex-column justify-content-center p-3 p-md-4 
                                ${product?.offer?.offer_type?.name === "product" && product?.offer?.product_image
                                    ? "col-12 col-md-8"
                                    : "col-12 col-md-12"}`}
                        >

                            {/* 1. Days Left Badge */}
                            <div className="mb-2">
                                <span className='product-item__prevPrice'>
                                    {daysLeft}
                                </span>
                            </div>

                            {/* 2. Title */}
                            <h4 className="n17-color f-20 fw-bold mb-3">
                                {discardHTMLTags(product?.offer?.offer_title?.replaceAll('_', ' '))}
                            </h4>

                            {/* 3. Price & Social Row */}
                            {product?.offer?.offer_type?.name === "product" && (
                                <div className="d-flex  flex-column justify-content-between align-items-center flex-md-row flex-lg-row flex-xl-row mb-3">
                                    <div className="price-info d-flex align-items-center gap-3">
                                        {product?.offer?.sale_price && (
                                            <span className="fw-bold text-success f-24">
                                                {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.sale_price}
                                            </span>
                                        )}
                                        {product?.offer?.original_price && (
                                            <span className="text-decoration-line-through f-16 text-muted">
                                                {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.original_price}
                                            </span>
                                        )}
                                    </div>

                                    <div className="d-center justify-content-start gap-1">
                                        <OfferDetailsToggle
                                            domain={domain}
                                            imageSrc={product?.offer?.product_image}
                                            merchantHref={merchantHref}
                                            offer={product?.offer}
                                            type='anchor'
                                        />
                                    </div>

                                    <div>
                                        <SocialMediaShare
                                            offerUrl={`/${product?.offer?.url}`}
                                            offerTitle={product?.offer?.offer_title}
                                            merchantHref={merchantHref}
                                            unique_id={product?.offer?.unique_id}
                                            domain={domain}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 4. Divider */}
                            <hr className="my-2 text-muted opacity-25" />

                            {/* 5. Footer */}
                            {/* 5. Footer */}
                            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-1">

                                {hasProductImage ? (
                                    <>
                                        {/* Rating (only when image exists) */}
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="rating text-warning">
                                                <RenderRating rating={getRandomRating(product.offer?.rating)} />
                                            </div>
                                            <span className="text-muted f-14 fw-semibold">
                                                ({getRandomRating(product?.offer?.rating)})
                                            </span>
                                        </div>

                                        {/* Non-product share */}
                                        {product?.offer?.offer_type?.name !== 'product' && (
                                            <SocialMediaShare
                                                offerUrl={`/${product?.offer?.url}`}
                                                offerTitle={product?.offer?.offer_title}
                                                merchantHref={merchantHref}
                                                unique_id={product?.offer?.unique_id}
                                                domain={domain}
                                            />
                                        )}
                                    </>
                                ) : (
                                    /* --- NO IMAGE → ONLY OFFER TOGGLE --- */
                                    <div className="d-center justify-content-start gap-1">
                                        <OfferDetailsToggle
                                            domain={domain}
                                            imageSrc={product?.offer?.product_image}
                                            merchantHref={merchantHref}
                                            offer={product?.offer}
                                            type='anchor'
                                        />
                                    </div>
                                )}

                                {/* Button stays unchanged */}
                                <div className="ms-auto">
                                    {product?.offer?.coupon_code ? (
                                        <OfferOutUrl
                                            unique_id={product?.offer?.unique_id}
                                            outUrl={product?.offer?.url}
                                            merchantHref={merchantHref}
                                            domain={domain}
                                            customClass="btn btn-outline-warning rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                                        >
                                            <span className="fw-bold text-dark">
                                                {(() => {
                                                    if (!product?.offer?.coupon_code) return "";
                                                    const code = product?.offer?.coupon_code.trim();
                                                    const spaceIndex = code.indexOf(" ");
                                                    const endIndex = spaceIndex !== -1 ? spaceIndex : 7;
                                                    return code.slice(0, endIndex);
                                                })()}
                                            </span>
                                            <span className="small text-uppercase fw-bold text-dark">Show Coupon</span>
                                        </OfferOutUrl>
                                    ) : (
                                        <OfferOutUrl
                                            unique_id={product.offer.unique_id}
                                            outUrl={product.offer.url}
                                            merchantHref={merchantHref}
                                            domain={domain}
                                            customClass='event-card__btn px-5 py-2 fw-bold shadow-sm'
                                        >
                                            <span>
                                                {product?.offer?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                                            </span>
                                        </OfferOutUrl>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default OffersListView
