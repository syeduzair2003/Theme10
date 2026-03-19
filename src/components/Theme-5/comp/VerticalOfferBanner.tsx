"use client";

import { OffersOffer, PaginationType } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import { apiOfferBanners } from '@/apis/offers';
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
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100">
                <h4 className="text-xl font-bold text-slate-900">Related Banner Offers</h4>
                <div className="w-full h-px bg-slate-200 mt-4"></div>
            </div>
            <div className="p-6 space-y-4">
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
            <div className={`p-6 pt-0 flex items-center gap-4 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
                {hasMore && (
                    <button
                        onClick={loadMore}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Loading...
                            </>
                        ) : (
                            "Show More"
                        )}
                    </button>
                )}
                {isExpanded && (
                    <button
                        onClick={showLess}
                        className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition-colors"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerticalOfferBanner;