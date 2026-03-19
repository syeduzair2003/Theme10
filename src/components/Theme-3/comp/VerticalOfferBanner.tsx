"use client";

import { OffersOffer, PaginationType } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import { apiOfferBanners } from '@/apis/offers'; // Adjust path if needed
import Spinner from 'react-bootstrap/Spinner';
import Banner from './Banner';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
    merchantId: string;
    companyId: string;
    pagination: PaginationType;
}

const VerticalOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type, merchantId, companyId, pagination }: Props) => {
    const [banners, setBanners] = useState<OffersOffer[]>([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const initialFiltered = filterOfferBanners(bannerResponse, 20, 2000, 20, 2000);
        setBanners(initialFiltered);
         if (pagination?.next_page === null) {
            setHasMore(false);  
        }
    }, [bannerResponse]);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const res = await apiOfferBanners(merchantId, companyId, page);
            const newBanners = filterOfferBanners(res.data?.offers || [], 20, 2000, 20, 2000);

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
        const initialFiltered = filterOfferBanners(bannerResponse, 20, 2000, 20, 2000);
        setBanners(initialFiltered);
        setPage(2);
        setHasMore(true);
        setIsExpanded(false);
    };

    if (banners?.length === 0) return null;

    return (
        <div className="side-bar sidebar-review-box text-center" style={{ borderRadius: "8px" }}>
            <h4 className="n17-color mb-4 mb-md-6">Related Banner Offers</h4>
            <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
            <div className="banner-slider-container p-3">
                {banners?.map((offer_data, i) => {
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
            <div className={`d-flex align-items-center ${isExpanded? 'justify-content-between': 'justify-content-center'}`}>
                {hasMore && (
                    <button onClick={loadMore} className="box-style box-second gap-2 gap-md-3 rounded-pill py-2 py-md-3 px-5 px-md-7 d-center d-inline-flex">
                        {loading ? <Spinner size="sm" animation="border" /> : "Show More"}
                    </button>
                )}
                {isExpanded && (
                    <button onClick={showLess} className="box-style box-second gap-2 gap-md-3 second-alt rounded-pill py-2 py-md-3 px-5 px-md-7 d-center d-inline-flex">
                        {loading ? <Spinner size="sm" animation="border" /> : "Show Less"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerticalOfferBanner;