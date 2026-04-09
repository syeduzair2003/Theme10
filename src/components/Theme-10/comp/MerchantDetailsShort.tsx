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
        <div className="w-full py-2 group">
    <div className="relative">
        {/* Text styling updated to match premium feel */}
        <p className="text-slate-600 leading-relaxed text-sm md:text-[0.95rem] font-medium line-clamp-2 md:line-clamp-3">
            {shortSentence}
        </p>
        
        {hasMoreContent && (
            <div className="mt-3 flex items-center gap-3">
                {/* Horizontal line updated to match cream/border theme */}
                <div className="h-[1px] flex-grow bg-[#EADDCA]"></div>
                
                <Link 
                    href={`#fullDetails`}
                    className="text-[#800000] font-black text-[10px] uppercase tracking-widest flex-shrink-0 no-underline flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                    See Full Details
                    <div className="w-4 h-4 rounded-full bg-[#800000]/5 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-[#800000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </Link>
            </div>
        )}
    </div>
</div>
    );
};

export default MerchantDetailsShort;