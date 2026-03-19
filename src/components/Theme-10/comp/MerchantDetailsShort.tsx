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
        <div className="w-full bg-white rounded-xl p-4 border border-slate-100 group">
            <div className="relative">
                <p className="text-slate-600 leading-relaxed text-sm md:text-base line-clamp-3 md:line-clamp-4">
                    {shortSentence}
                </p>
                
                {hasMoreContent && (
                    <div className="mt-3 flex items-center gap-2">
                        <div className="h-px flex-grow bg-slate-200"></div>
                        <Link 
                            href={`#fullDetails`}
                            className="text-blue-600 font-bold text-sm flex-shrink-0 hover:underline flex items-center gap-1"
                        >
                            See Full Details
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MerchantDetailsShort;