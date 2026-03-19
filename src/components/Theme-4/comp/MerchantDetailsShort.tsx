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

    const hasMoreContent = plainText.length > (shortSentence.length + 5);

    return (
        <div className="merchant-details-wrapper text-jus w-100 bg-white text-black py-3 px-3 rounded" id="merhchantDetailsShort">
            <div className="text-container">
                <span className="text-content custom-mer-det-css truncate-3-lines">
                    {shortSentence}
                </span>
                
                {/* 4. Only render the link if there is actually more content */}
                {hasMoreContent && (
                    <span className="toggle-button ">
                        <Link href={`#fullDetails`} className='text-[#e41717] pl-2'>See Full Details</Link>
                    </span>
                )}
            </div>
        </div>
    );
};

export default MerchantDetailsShort;