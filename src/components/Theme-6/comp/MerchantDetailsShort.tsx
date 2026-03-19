import { cleanHtmlContent, extractFirstSentences } from '@/constants/hooks';
import Link from 'next/link'
import React from 'react'
import { stripHtml } from 'string-strip-html';

interface Props {
    details: string;
}

const MerchantDetailsShort = ({ details }: Props) => {
    if (!details) return null;
    const cleanText = cleanHtmlContent(details || '');
    const plainText = stripHtml(cleanText).result;
    const shortSentence = extractFirstSentences(plainText);

    return (
        <div className="merchant-details-wrapper text-jus w-100" id="merhchantDetailsShort">
            <div className="text-container">
                <span className="text-content custom-mer-det-css truncate-3-lines">
                    {shortSentence}
                </span>
                <span className="toggle-button">
                    <Link href={`#fullDetails`}>See Full Details</Link>
                </span>
            </div>
        </div>
    );
};

export default MerchantDetailsShort;

