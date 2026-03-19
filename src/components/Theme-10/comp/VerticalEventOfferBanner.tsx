"use client";

import { OffersOffer } from '@/services/dataTypes';
import React, { useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import Banner from './Banner';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
}

const VerticalEventOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type }: Props) => {
    const filtered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000);
    const [visibleCount, setVisibleCount] = useState(10); // Reduced initial count for better performance

    if (filtered.length === 0) return null;

    return (
        <div className="w-full">
            <div className="flex flex-col gap-6 mt-3">
                {filtered.slice(0, visibleCount).map((offer_data, i) => {
                    const dimension = getBannerDimensions(offer_data);
                    return (
                        <div key={i} className="rounded-2xl overflow-hidden border border-slate-50 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <Banner
                                data={offer_data}
                                height={dimension?.height}
                                mer_slug={mer_slug}
                                slug_type={slug_type}
                                domain={domain}
                                width={dimension?.width}
                            />
                        </div>
                    );
                })}
            </div>
            
            {visibleCount < filtered.length && (
                <button 
                    onClick={() => setVisibleCount(prev => prev + 5)}
                    className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 text-slate-400 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                >
                    Load More Offers
                </button>
            )}
        </div>
    );
};

export default VerticalEventOfferBanner;