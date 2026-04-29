import React from 'react';
import cookieService from '@/services/CookiesService';
import RoundedMerchantSlider from './RoundedMerchantSlider';

interface Props {
    merchants: any[];
    storeSlug: string;
    slugType: string;
}

const RoundedMerchant = async ({ merchants, storeSlug, slugType }: Props) => {
    const companyDomainObj = await cookieService.get("domain");
    const companyDomain = companyDomainObj?.domain || '';

    if (!merchants || merchants.length === 0) return null;

    return (
        <section className="py-10 bg-white relative w-full mb-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* ── Section header row ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                    <div className="flex-1 min-w-0">
                        {/* Heading */}
                        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                            <span style={{ color: '#8bc94a' }}>Trending</span> <span className="text-gray-800">Merchants</span>
                        </h2>
                        <p className="mt-2 text-[13px] text-gray-500 max-w-2xl">
                            Discover the most popular stores offering the best cashback and discounts across all product categories.
                        </p>
                    </div>
                </div>

                {/* ── Slider Component ── */}
                <div className="relative">
                    <RoundedMerchantSlider 
                        merchants={merchants} 
                        companyDomain={companyDomain} 
                        mer_slug={storeSlug} 
                        mer_slug_type={slugType} 
                    />
                </div>
            </div>
            
            {/* Elegant Divider */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-8">
                <div 
                    className="w-full h-px" 
                    style={{ background: 'linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%)' }} 
                    aria-hidden="true" 
                />
            </div>
        </section>
    );
};

export default RoundedMerchant;
