"use client";

import { OffersOffer } from '@/services/dataTypes';
import React, { useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import Banner from './Banner';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
}

const VerticalPromotionOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type }: Props) => {
    const filtered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000);
    const [visibleCount, setVisibleCount] = useState(6);
    const [loading, setLoading] = useState(false);

    const handleShowMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 6);
            setLoading(false);
        }, 300);
    };

    if (!filtered || filtered.length === 0) return null;

    const displayedBanners = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    return (
        <div className="relative group/sidebar mb-10">
            {/* Elegant Background Layer */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8bc94a20] to-[#ff912f10] rounded-[2.5rem] blur opacity-50 group-hover/sidebar:opacity-100 transition duration-1000 -z-10" />

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/50 overflow-hidden text-center">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8bc94a08] rounded-full blur-3xl -mr-16 -mt-16" />

                <h4 className="text-xl font-black text-[#222e48] mb-8 pb-4 border-b border-gray-50 flex items-center justify-center relative">
                    Banner Offers
                </h4>

                <div className="flex flex-col gap-2 mb-8">
                    {displayedBanners.map((offer_data, i) => {
                        const dimension = getBannerDimensions(offer_data);
                        return (
                            <Banner
                                key={i}
                                data={offer_data}
                                height={dimension?.height}
                                mer_slug={mer_slug}
                                slug_type={slug_type}
                                domain={domain}
                                width={dimension?.width}
                            />
                        );
                    })}
                </div>

                {hasMore && (
                    <div className="mt-4">
                        <button
                            onClick={handleShowMore}
                            className="relative group/btn overflow-hidden rounded-full py-3 px-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center gap-2 mx-auto"
                        >
                            <span className="relative z-10 text-sm font-bold text-[#222e48] group-hover/btn:text-[#8bc94a] transition-colors">
                                {loading ? <Spinner size="sm" animation="border" className="border-[#8bc94a]" /> : "Show More"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8bc94a08] to-[#ff912f08] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerticalPromotionOfferBanner;
