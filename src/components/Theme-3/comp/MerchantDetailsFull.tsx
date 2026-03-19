import { cleanHtmlContent } from '@/constants/hooks';
import React from 'react'

interface Props {
    details: string;
}

const MerchantDetailsFull = ({ details }: Props) => {
    if (!details) return null;
    const cleanText = cleanHtmlContent(details || '');

    return (
        <div id="fullDetails" className="merchant-details-wrapper text-jus w-100 pt-4">
            <div className="text-container">
                <span
                    className="text-content custom-mer-det-css"
                    dangerouslySetInnerHTML={{ __html: cleanText }}
                />
            </div>
        </div>
    );
};

export default MerchantDetailsFull;
