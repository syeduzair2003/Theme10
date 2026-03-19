import Link from 'next/link';
import Image from 'next/image';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getFinalDiscountTag } from '@/constants/hooks';
import { Offer, ProductData } from '@/services/dataTypes';
import React from 'react';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import OfferDetailsToggle from './OfferDetailsToggle';

interface Props {
    product: Offer | ProductData;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const ProductCard = async ({
    product,
    merchantHref,
    domain,
    merchant_name,
    merchant_logo,
    productDetailUrl
}: Props) => {

    const type = product?.offer_type?.name;

    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, product?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
    const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;

    const discountPercent =
        originalPrice > 0 && salePrice > 0
            ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
            : null;

    const finalDiscountTag = getFinalDiscountTag(
        product?.offer_title || product?.offer_detail,
        discountPercent,
    );

    const daysLeft = calculateOfferDuration(product?.end_date)

    return (
        <div className="prod-card card h-100 text-center position-relative">

            {/* discount badge */}
            {finalDiscountTag && (
                <div className="prod-card__discount">
                    {finalDiscountTag}
                </div>
            )}

            <div className="card-body d-flex flex-column justify-content-between">

                {/* image */}
                <div className="prod-card__img mb-3">
                    <Image
                        src={imageSrc}
                        alt={merchant_name}
                        width={160}
                        height={120}
                        className="img-fluid"
                    />
                </div>

                {/* merchant */}
                <Link href={merchantHref} className="prod-card__merchant">
                    {merchant_name}
                </Link>

                {/* title */}
                {product?.is_detail === 1 ? (
                    (productDetailUrl && (
                        <Link href={productDetailUrl} className="fs-six f-16 n17-color fw-bold m-0 truncate-3-lines">
                            {discardHTMLTags(product?.offer_title)}
                        </Link>
                    ))
                ) : (
                    <p className="fs-six f-16 n17-color fw-bold m-0 truncate-3-lines">
                        {discardHTMLTags(product?.offer_title)}
                    </p>
                )}

                {/* view details */}
                <div className='prod-card__details mb-4'>
                    <OfferDetailsToggle domain={domain} imageSrc={product?.product_image} merchantHref={imageSrc} offer={product} type='anchor' />
                </div>

                <div className="product-item__prevPrice">
                    {daysLeft} 
                </div>

                {/* price */}
                <div className="prod-card__price mt-2">
                    {salePrice > 0 && (
                        <span className="sale">
                            ${salePrice.toFixed(2)}
                        </span>
                    )}

                    {originalPrice > 0 && (
                        <span className="original ms-2">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>

                {/* button */}
                <div className="event-card__btn">
                    <OfferOutUrl outUrl={product?.url} merchantHref={merchantHref} unique_id={product?.unique_id} customClass="f-17" domain={domain}>
                        {product?.offer_type.name.includes('Coupon') ? 'Show Code' : 'Get Deal'}
                    </OfferOutUrl>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;
