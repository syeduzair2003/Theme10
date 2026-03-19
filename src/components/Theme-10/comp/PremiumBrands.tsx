import React from 'react'
import Link from 'next/link';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { ArrowRight } from "lucide-react";
import TopMerchants from './TopMerchants';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const PremiumBrand = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const merchants = await apiGetTopMerchants(companyId);
    const heading = merchants?.data?.top_merchants_widget?.widget_heading || "Premium Brands";
    const subHeading = merchants?.data?.top_merchants_widget?.widget_text;

    if (merchants.data?.merchants?.length > 0) {
        return (
            <section className="bg-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Section Fix */}
                    <div className="relative mb-12">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="max-w-full">
                                <p className="text-blue-500 font-bold text-xs mb-3 uppercase tracking-widest">
                                    Trusted by millions
                                </p>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tighter leading-[1.1] mb-4">
                                    {heading}
                                </h2>
                                {subHeading && (
                                    <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-full">
                                        {subHeading}
                                    </p>
                                )}
                            </div>

                            {/* View All Button - Positioned Top Right for Desktop */}
                            <Link 
                                href={`/all-stores/A`} 
                                className="inline-flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-black transition-colors whitespace-nowrap mt-2 md:mt-4"
                                target='_blank'
                            >
                                <span className="border-b-2 border-transparent hover:border-black">View all</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Brands Grid Rendering */}
                    <div className="mt-8">
                        <TopMerchants 
                            merchantData={merchants?.data?.merchants} 
                            mer_slug_type={mer_slug_type} 
                            mer_slug={mer_slug} 
                        />
                    </div>
                </div>
            </section>
        )
    }
    return null;
}

export default PremiumBrand