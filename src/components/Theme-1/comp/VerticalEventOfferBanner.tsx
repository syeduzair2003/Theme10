"use client";

import { OffersOffer } from '@/services/dataTypes';
import React, { useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import Spinner from 'react-bootstrap/Spinner';
import Banner from './Banner';
import Banners from '@/components/shared/Banner/Banners';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
}

const VerticalEventOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type }: Props) => {
    const filtered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000);
    const [visibleCount, setVisibleCount] = useState(4);
    const [loading, setLoading] = useState(false);

    const handleShowMore = () => {
        if (loading) return;

        setLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => Math.min(prev + 2, filtered.length));
            setLoading(false);
        }, 500); // Simulate load delay for UX polish
    };

    const handleShowLess = () => {
        setVisibleCount(4);
    };

    const isExpanded = visibleCount > 4;
    const hasMore = visibleCount < filtered.length;
    if (filtered.length === 0) return null;

    return (
        <div className="side-bar sidebar-review-box text-center" style={{ borderRadius: "8px" }}>
            <div className="banner-slider-container p-3">
                {filtered.slice(0, visibleCount).map((offer_data, i) => {
                    const dimension = getBannerDimensions(offer_data);
                    return (
                        <Banners
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
            <div className={`d-flex align-items-center ${isExpanded ? 'justify-content-between' : 'justify-content-center'}`}>
                {hasMore && (
                    <button
                        onClick={handleShowMore}
                        className="event-button-link"
                        disabled={loading}
                    >
                        {loading ? <Spinner size="sm" animation="border" /> : "Show More"}
                    </button>
                )}
                {isExpanded && (
                    <button
                        onClick={handleShowLess}
                        className="event-button-link"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerticalEventOfferBanner;
