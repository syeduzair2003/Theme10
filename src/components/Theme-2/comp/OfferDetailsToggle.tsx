"use client";

import React, { useState } from 'react';
import OfferModal from './SimpleOfferModal';
import { Offer, ProductData } from '@/services/dataTypes';
import { getFinalDiscountTag } from '@/constants/hooks';
import Link from 'next/link';

interface Props {
    offer: Offer | ProductData;
    merchantHref: string;
    imageSrc: string;
    domain: string;
    type: 'anchor' | 'button';
    buttonClass?: string;
    isDetail?: number;           // NEW
    productDetailUrl?: string | null;  // NEW
}

const OfferDetailsToggle = ({ offer, merchantHref, domain, type, buttonClass, imageSrc, isDetail, productDetailUrl }: Props) => {
    const [showModal, setShowModal] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true);
    };

    const originalPrice = offer?.original_price ? parseFloat(offer?.original_price) : 0;
    const salePrice = offer?.sale_price ? parseFloat(offer?.sale_price) : 0;
    const discountPercent =
        originalPrice > 0 && salePrice > 0
            ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
            : null;

    const finalDiscountTag = getFinalDiscountTag(
        offer?.offer_title || offer?.offer_detail,
        discountPercent,
    );

    const label = 'See Details';
    const sharedClass = `${type === 'anchor' ? 'offer-details-anchor' : 'offer-details-btn'} cursor-pointer ${buttonClass || ''}`;

    // If is_detail === 1 and we have a URL, navigate to the detail page
    if (isDetail === 1 && productDetailUrl) {
        return (
            <Link href={productDetailUrl} className={sharedClass}>
                {label}
            </Link>
        );
    }

    // Otherwise, show modal as before
    return (
        <>
            {type === 'anchor' ? (
                <span onClick={handleClick} className={sharedClass}>
                    {label}
                </span>
            ) : (
                <button onClick={handleClick} className={sharedClass}>
                    {label}
                </button>
            )}

            {showModal && (
                <OfferModal
                    data={offer}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                    finalDiscountTag={finalDiscountTag}
                    merchantSrc={imageSrc}
                />
            )}
        </>
    );
};

export default OfferDetailsToggle;