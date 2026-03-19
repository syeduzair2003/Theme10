"use client";

import React, { useState } from 'react';
import { Offer, ProductData } from '@/services/dataTypes';
import { getFinalDiscountTag } from '@/constants/hooks';
import SimpleOfferModal from './SimpleOfferModal';


interface Props {
    offer: Offer | ProductData;
    merchantHref: string;
    imageSrc: string;
    domain: string;
    type: 'anchor' | 'button';
    buttonClass?: string;
}

const OfferDetailsToggle = ({ offer, merchantHref, domain, type, buttonClass, imageSrc }: Props) => {
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
                    className={`offer-details-anchor ${buttonClass || ''}`}
                >
                    View Details
                </span>
            ) : (
                <button
                    onClick={handleClick}
                    className={`offer-details-btn ${buttonClass || ''}`}
                >
                    View Details
                </button>
            )}


            {showModal && (
                <SimpleOfferModal
                    data={offer}
                    onClose={() => setShowModal(false)}
                    domain={domain}
                    merchantHref={merchantHref}
                    merchantImg={imageSrc}
                />
            )}
        </>
    );
};

export default OfferDetailsToggle;