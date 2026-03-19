"use client";

import React, { useState } from 'react';
import OfferModal from './SimpleOfferModal';
import { Offer, ProductData } from '@/services/dataTypes';
import { getFinalDiscountTag } from '@/constants/hooks';

interface Props {
    offer: Offer | ProductData;
    merchantHref: string;
    imageSrc: string;
    merchantImg?: string | null;
    domain: string;
    type: 'anchor' | 'button';
    buttonClass?: string;
}

const OfferDetailsToggle = ({ offer, merchantHref, domain, type, buttonClass, imageSrc, merchantImg }: Props) => {
    const [showModal, setShowModal] = useState(false);

    // Prevent parent Link click when clicking this button
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

    return (
        <>
            {type === 'anchor' ? (
                <span
                    onClick={handleClick}
                    className={`offer-details-anchor cursor-pointer ${buttonClass || ''}`}
                    style={{ textDecoration: 'underline' }}
                >
                    View Details
                </span>
            ) : (
                <button
                    onClick={handleClick}
                    className={`offer-details-btn cursor-pointer ${buttonClass || ''}`}
                >
                    View Details
                </button>
            )}

            {showModal && (
                <OfferModal
                    data={offer}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                    finalDiscountTag={finalDiscountTag}
                    merchantHref={merchantHref}
                    merchantImg={merchantImg}
                    productImg={imageSrc}
                />
            )}
        </>
    );
};

export default OfferDetailsToggle;