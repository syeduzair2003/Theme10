"use client";

import { OffersOffer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import Spinner from 'react-bootstrap/Spinner';
import Banner from './Banner';
import { apiCategoryOfferBanners } from '@/apis/user';

interface Props {
    bannerResponse: OffersOffer[];
    domain: string;
    mer_slug: string;
    slug_type: string;
    categoryId: string;
    companyId: string;
}

const VerticalCategoryOfferBanner = ({ bannerResponse, domain, mer_slug, slug_type, categoryId, companyId }: Props) => {
    // console.log(bannerResponse);
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
            const res = await apiCategoryOfferBanners(categoryId, companyId, page);
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
        const initialFiltered = filterOfferBanners(bannerResponse, 50, 2000, 65, 2000);
        setBanners(initialFiltered);
        setPage(2);
        setHasMore(true);
        setIsExpanded(false);
    };

    if (banners?.length === 0) return null;

    return (
        <div className="side-bar sidebar-review-box text-center" style={{ borderRadius: "8px" }}>
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

export default VerticalCategoryOfferBanner
