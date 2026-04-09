import { cleanHtmlContent } from '@/constants/hooks';
import React from 'react'

interface Props {
    details: string;
}

const MerchantDetailsFull = ({ details }: Props) => {
    if (!details) return null;
    const cleanText = cleanHtmlContent(details || '');

    return (
        <div id="fullDetails" className="w-full mt-2 scroll-mt-24">
            {/* --- Transparent Container with Zero Borders --- */}
            <div className="w-full transition-all duration-500">
                
                <div className="prose prose-slate max-w-none relative z-10
                    prose-p:text-slate-600 prose-p:text-[14px] prose-p:leading-relaxed prose-p:mb-4
                    prose-strong:text-[#1A1A1A] prose-strong:font-bold
                    prose-headings:text-[#1A1A1A] prose-headings:text-base prose-headings:font-black prose-headings:mb-3
                    prose-a:text-[#800000] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                    prose-ul:list-disc prose-li:marker:text-[#800000]/60 prose-li:text-[14px] prose-li:mb-1
                    prose-ol:list-decimal prose-ol:marker:text-[#800000]/60">
                    
                    <div
                        className="space-y-4"
                        dangerouslySetInnerHTML={{ __html: cleanText }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantDetailsFull;