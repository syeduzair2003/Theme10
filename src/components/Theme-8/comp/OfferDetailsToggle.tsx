"use client";

import React, { useState } from 'react';
import SimpleOfferModal from './SimpleOfferModal';
import { Offer,ProductData } from '@/services/dataTypes';
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

const OfferDetailsToggle = ({ offer,merchantImg, merchantHref, domain, type, buttonClass, imageSrc }: Props) => {
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

    return (
        <>
            {type === 'anchor' ? (
                <span
                    onClick={handleClick}
                    className={`cursor-pointer text-blue-600 underline underline-offset-4 hover:text-blue-800 transition-colors font-medium text-sm ${buttonClass || ''}`}
                >
                    View Details
                </span>
            ) : (
                <button
                    onClick={handleClick}
                    className={`px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-sm transition-all active:scale-95 ${buttonClass || ''}`}
                >
                    View Details
                </button>
            )}

            {showModal && (
                <SimpleOfferModal
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