import React from 'react'
import Image from "next/image";
import {
    calculateOfferDuration,
    discardHTMLTags,
    extractPromoDiscountTag,
    getBaseImageUrl,
    getCurrencySymbol,
    getFinalDiscountTag,
    getMerchantHref
} from '@/constants/hooks';
import { Merchant, OffersOffer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import cookieService from '@/services/CookiesService';
import OfferDetailsToggle from './OfferDetailsToggle';
import { faFire, FontAwesomeIcon } from '@/constants/icons';
import Link from 'next/link';

interface Props {
    offer: OffersOffer;
    mer_slug_type: string;
    mer_slug: string;
    type?: string;
    merchant: Merchant;
    productDetailUrl?: string | null;
}

const ProductCard = async ({ offer, mer_slug_type, mer_slug, type, merchant, productDetailUrl }: Props) => {
    const merchantHref = getMerchantHref(merchant, mer_slug, mer_slug_type);
    const domain = (await cookieService.get("domain")).domain;

    const product = offer?.offer || offer;
    const imageSrc = type === "product"
        ? getBaseImageUrl(domain, product?.product_image, "")
        : getBaseImageUrl(domain, merchant?.merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null;

    const finalDiscountTag =
        extractPromoDiscountTag(product?.offer_title || product?.offer_detail) ||
        (discountPercent ? `${discountPercent}% Off` : null);

    return (
        <div className="offer-card position-relative">
            <div className="ribbon-thick">
                <span>{calculateOfferDuration(product?.end_date)}</span>
            </div>

            {/* LEFT SIDE: Image */}
            <div className="offer-card__image-box">
                <Image
                    src={imageSrc}
                    alt={product?.offer_title || "Offer"}
                    fill
                    className="offer-card__image"
                    loading="lazy"
                />
            </div>

            {/* RIGHT SIDE: Content */}
            <div className="offer-card__content">

                {/* Top Section: Badge & Title */}
                <div>
                    {finalDiscountTag && (
                        <div className="offer-card__badge">
                            <FontAwesomeIcon icon={faFire} className="fire-icon me-1" height={15} width={15} />
                            {finalDiscountTag}
                        </div>
                    )}
                    {product?.is_detail === 1 ? (
                        (productDetailUrl && (
                            <Link href={productDetailUrl}>
                                <h3 className="fs-six f-15 n17-color fw-mid m-0 truncate-3-lines">
                                    {discardHTMLTags(product?.offer_title)}
                                </h3>
                            </Link>
                        ))
                    ) : (
                        <h3 className="fs-six f-15 n17-color fw-mid m-0 truncate-3-lines">
                            {discardHTMLTags(product?.offer_title)}
                        </h3>
                    )}
                    {/* <h3 className="fs-six f-15 n17-color fw-mid m-0 truncate-3-lines">
                        {type === "product"
                            ? product?.offer_title
                            : discardHTMLTags(offer?.offer?.offer_title)
                        }
                    </h3> */}
                </div>

                <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantImg={merchant?.merchant_logo} merchantHref={merchantHref} offer={product} type='anchor' />
                <div className="offer-card__btn-wrapper">
                    <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="check-price-btn"
                    >
                        Get Deal
                    </OfferOutUrl>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;