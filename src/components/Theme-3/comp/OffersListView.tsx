"use client"
import { Offer, OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import RenderRating from './RenderRating'
import OfferModal from './OfferModal'
import { discardHTMLTags, extractPromoDiscountTag, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import { apiOfferDetails } from '@/apis/offers'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
// import Image from "@/components/shared/Image";
import OfferDuration from './OfferDuration'
import SocialMediaShare from './SocialMediaShare'
import SimpleOfferModal from './SimpleOfferModal'
import OfferDetailsToggle from './OfferDetailsToggle'

interface Props {
    product: OffersOffer,
    companyId: string,
    awaited_p_id?: string,
    mer_slug_type: string,
    mer_slug: string,
    domain: string,
    ads_campaign: boolean,
}

let renderCount = 0;
const OffersListView = ({ product, companyId, awaited_p_id, mer_slug_type, mer_slug, domain, ads_campaign }: Props) => {
    const [p_data, setP_data] = useState<Offer | null>(null);
    // const [imageSrc, setImageSrc] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const merchantHref = getMerchantHref(product.merchant, mer_slug, mer_slug_type);

    // useEffect(() => {
    //     if (product?.offer?.offer_type?.name === "product") {
    //         setImageSrc(getBaseImageUrl(domain, product?.offer?.product_image, ""));
    //     }else {
    //         setImageSrc(getBaseImageUrl(domain, product?.merchant?.merchant_logo, ""));
    //     }
    // }, [product]);


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

        
    
    // const imageSrc =
    // product?.offer?.offer_type?.name === "product"
    //     ? getBaseImageUrl(domain, product?.offer?.product_image, "")
    //     : getBaseImageUrl(domain, product?.merchant?.merchant_logo, "");

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
                    finalDiscountTag={finalDiscountTag}
                />
            )}
            <div className="col-12 col-sm-6 col-lg-12 mb-3">
                <div className="single-box transition h-100 rounded-4 n1-bg-color cus-border border b-eighth p-2 p-md-3 d-center align-items-center flex-column flex-xl-row position-relative">
                    {(finalDiscountTag) && (
                        <div className="ribbon">
                            <span>{finalDiscountTag}</span>
                        </div>
                    )}
                    <div className="d-none">
                        Type Name: {product?.offer?.offer_type?.name}, Discount: {finalDiscountTag}
                    </div>
                    <div className="start-area w-100 d-flex flex-column flex-sm-column gap-3 gap-md-4 p-3">
                        <OfferDuration endDate={product?.offer?.end_date} />
                        <h4 className="text-start n17-color f-18 fw-bold">{discardHTMLTags(product?.offer?.offer_title?.replaceAll('_', ' '))}</h4>
                        {(product?.offer?.offer_type?.name === "product" || product?.offer?.product_image !== null) && (
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="price-info d-flex flex-row align-items-center gap-3 justify-content-center">
                                    {product?.offer?.sale_price && (
                                        <span className="fw-bold text-success f-20">
                                        {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.sale_price}
                                        </span>
                                    )}
                                    {product?.offer?.original_price && (
                                        <span className="text-decoration-line-through f-14 text-muted">
                                        {getCurrencySymbol(product?.offer?.currency)}{product?.offer?.original_price}
                                        </span>
                                    )}
                                </div>
                                <SocialMediaShare offerUrl={`/${product?.offer?.url}`} offerTitle={product?.offer?.offer_title} merchantHref={merchantHref} unique_id={product?.offer?.unique_id} domain={domain} />
                            </div>
                        )}
                        <div className="w-100 my-2 cus-border border-top border-bottom b-seventh py-2 py-md-3 d-center justify-content-between">
                            <div className="d-center justify-content-start gap-1">
                                {/* <div className="rating">
                                    <RenderRating rating={getRandomRating(product.offer?.rating)} /> ({getRandomRating(product?.offer?.rating)})
                                </div> */}
                                <OfferDetailsToggle domain={domain} imageSrc={product?.offer?.product_image} merchantHref={merchantHref} offer={product?.offer} type='anchor' merchantImg={product?.merchant?.merchant_logo} />
                            </div>
                            {(product?.offer?.product_image === null) && (
                                <SocialMediaShare offerUrl={`/${product?.offer?.url}`} offerTitle={product?.offer?.offer_title} merchantHref={merchantHref} unique_id={product?.offer?.unique_id} domain={domain} />
                            )}
                            {product?.offer?.coupon_code ? (
                                <>
                                    <OfferOutUrl
                                        unique_id={product?.offer?.unique_id}
                                        outUrl={product?.offer?.url}
                                        merchantHref={merchantHref}
                                        domain={domain}
                                        customClass="cmn-btn res_buttion btn-overlay border-dash rounded-pill px-4 px-md-6 py-2 py-md-3 position-relative d-center show-coupon-btn"
                                    >
                                        <span className="f5-color fw-semibold coupon-code w-100 d-center">
                                            {(() => {
                                                if (!product?.offer?.coupon_code) return "";
                                                const code = product?.offer?.coupon_code.trim();
                                                const spaceIndex = code.indexOf(" ");
                                                // Stop at first space OR limit to 7 characters
                                                const endIndex = spaceIndex !== -1 ? spaceIndex : 7;
                                                return code.slice(0, endIndex);
                                            })()}
                                        </span>
                                        <span className="position-absolute fw-semibold show transition n1-color f-14">
                                            Show Coupon
                                        </span>
                                    </OfferOutUrl>
                                </>
                            ) : (
                                <OfferOutUrl unique_id={product.offer.unique_id}
                                    outUrl={product.offer.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass='box-style res_buttion box-second gap-2 gap-md-3 rounded-pill py-2 py-md-3 px-5 px-md-7 d-center d-inline-flex'
                                >
                                    <span className="f5-color fw-semibold f-14">
                                        {product?.offer?.offer_type?.name === "product" ? "Buy Now" : "Get Deal"}
                                    </span>
                                </OfferOutUrl>
                            )}
                        </div>
                    </div>
                    {product?.offer?.product_image && (
                        <div className="end-area border-left-button-cus d-flex align-items-center justify-content-center flex-column gap-3 gap-md-4 custom-card-width-new">
                            {/* <Image
                                src={getBaseImageUrl(domain, product?.offer?.product_image, "")}
                                alt={
                                    product?.offer?.offer_type?.name === "product"
                                        ? `${product?.offer?.offer_title || "Product"} image`
                                        : `${product?.merchant?.merchant_name} Deals and Coupons`
                                }
                                // height={150}
                                // width={230}
                                // className="merchant-top-image w-100"
                                // layout="responsive"
                                // objectFit="contain"
                                // loading="lazy"
                                height={100}
                                width={100}
                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                                layout='responsive'
                            /> */}
                            <div
                                style={{ maxWidth: 120, maxHeight: 200}}
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
                </div>
            </div>
        </>
    )
}

export default OffersListView
