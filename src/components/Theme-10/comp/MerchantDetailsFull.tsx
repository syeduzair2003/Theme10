import { cleanHtmlContent } from '@/constants/hooks';
import React from 'react'

interface Props {
    details: string;
}

const MerchantDetailsFull = ({ details }: Props) => {
    if (!details) return null;
    const cleanText = cleanHtmlContent(details || '');

    return (
        <div id="fullDetails" className="w-full mt-8 scroll-mt-20">
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 md:p-8">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Detailed Information
                </h3>
                
                <div className="prose prose-slate prose-sm md:prose-base max-w-none prose-a:text-blue-600 prose-strong:text-slate-800 prose-headings:text-slate-900">
                    <div
                        className="text-slate-600 leading-loose space-y-4"
                        dangerouslySetInnerHTML={{ __html: cleanText }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MerchantDetailsFull;