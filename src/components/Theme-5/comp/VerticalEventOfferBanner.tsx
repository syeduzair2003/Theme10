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
    const [visibleCount, setVisibleCount] = useState(20);
    const [loading, setLoading] = useState(false);

    const handleShowMore = () => {
        if (loading) return;

        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 6, filtered?.length));
            setLoading(false);
        }, 500);
    };

    const handleShowLess = () => {
        setVisibleCount(20);
    };

    const isExpanded = visibleCount > 4;
    const hasMore = visibleCount < filtered.length;
    if (filtered.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="space-y-4">
                {filtered.slice(0, visibleCount).map((offer_data, i) => {
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
        </div>
    );
};

export default VerticalEventOfferBanner;