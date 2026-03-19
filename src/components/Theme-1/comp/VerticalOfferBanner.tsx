"use client";

import Banner from './Banner';
import { OffersOffer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import { apiOfferBanners } from '@/apis/offers';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
    merchantId: string;
    companyId: string;
}

const VerticalOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type, merchantId, companyId }: Props) => {
    const [banners, setBanners] = useState<OffersOffer[]>([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const initialFiltered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000);
        setBanners(initialFiltered);
    }, [bannerResponse]);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await apiOfferBanners(merchantId, companyId, page);
            const newBanners = filterOfferBanners(res.data?.offers || [], 50, 2000, 65, 2000);
            setBanners(prev => [...prev, ...newBanners]);
            if (res?.data?.pagination?.next_page) {
                setPage(prev => prev + 1);
                setIsExpanded(true);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error loading more vertical banners", error);
        } finally {
            setLoading(false);
        }
    };

    const showLess = () => {
        const initialFiltered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000)
        setBanners(initialFiltered);
        setPage(2);
        setHasMore(true);
        setIsExpanded(false);
    };

    if (banners.length === 0) return null;

    return (
        <div className="common-sidebar-wrapper sidebar-bg mb-4" style={{ maxHeight: "100%" }}>
            <div className="common-sidebar">
                <h4 className="common-sidebar__title" style={{ textAlign: "center", marginBottom: "10px" }}>
                    Top Promotions
                </h4>
                {banners.map((offer_data, i) => {
                    const dimension = getBannerDimensions(offer_data);
                    console.log("testing",i,dimension);
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
                <div className={`d-flex align-items-center ${isExpanded ? 'justify-content-between' : 'justify-content-center'}`}>
                    {hasMore && (
                        <button onClick={loadMore}>
                            {loading ? <Spinner size="sm" animation="border" /> : "Show More"}
                        </button>
                    )}
                    {isExpanded && (
                        <button onClick={showLess}>
                            {loading ? <Spinner size="sm" animation="border" /> : "Show Less"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerticalOfferBanner;
