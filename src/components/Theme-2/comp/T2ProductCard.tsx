import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { OffersOffer } from '@/services/dataTypes';
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import OfferDetailsToggle from './OfferDetailsToggle';
import OfferOutUrl from '@/components/shared/OfferOutUrl';

interface CardProps {
    offer: OffersOffer;
    merchant: any;
    mer_slug_type: string;
    domain: string;
    merchantHref: string;
}

const T2ProductCard = async ({ offer, merchant, mer_slug_type, domain, merchantHref }: CardProps) => {

    const productUrl = offer?.offer?.slug ? getProductDetailHref(merchant, mer_slug_type, offer?.offer?.slug) : null;

    return (
        <div className="text-decoration-none h-100 d-block p-2">
            <div className="t2-product-card">
                {/* Image Area */}
                <div className="t2-card-img-wrapper">
                    <Image
                        src={getBaseImageUrl(domain, offer?.offer?.product_image, "")}
                        alt={offer?.offer?.offer_title || "Product"}
                        width={200}
                        height={200}
                        className="t2-card-img"
                    />
                </div>
                    <h3 className="t2-grid-title truncate-3-lines" title={discardHTMLTags(offer?.offer?.offer_title)}>
                        {discardHTMLTags(offer?.offer?.offer_title)}
                    </h3>

                <OfferDetailsToggle
                    offer={offer?.offer}
                    merchantHref={merchantHref}
                    imageSrc={offer?.offer?.product_image}
                    domain={domain}
                    type="anchor"
                    buttonClass="f-13 fw-bold text-muted hover-purple text-center mb-2"
                    isDetail={offer?.offer?.is_detail}
                    productDetailUrl={productUrl}
                />

                {offer?.offer?.coupon_code ? (
                    <OfferOutUrl
                        unique_id={offer?.offer?.unique_id}
                        outUrl={offer?.offer?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="btn-reveal-action w-100"
                    >
                        Show Code
                    </OfferOutUrl>
                ) : (
                    <OfferOutUrl
                        unique_id={offer?.offer?.unique_id}
                        outUrl={offer?.offer?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="t2-btn-pill"
                    >
                        {offer?.offer?.offer_type?.name === "product" ? "Shop Now" : "Get Deal"}
                    </OfferOutUrl>
                )}
            </div>
        </div>
    );
};

export default T2ProductCard;