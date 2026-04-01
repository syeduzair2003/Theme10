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
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center">
            {/* Banners List */}
            <div className="flex flex-col gap-4 p-4">
                {banners?.map((offer_data, i) => {
                    const dimension = getBannerDimensions(offer_data);
                    return (
                        <div key={i} className="w-full flex justify-center transition-transform duration-300 hover:scale-[1.02]">
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

            {/* Buttons Section */}
            <div className={`flex items-center p-4 pt-0 gap-3 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
                {hasMore && (
                    <button 
                        onClick={loadMore} 
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full transition-all hover:bg-slate-800 active:scale-95 disabled:opacity-70"
                    >
                        {loading ? <Spinner size="sm" animation="border" /> : "Show More"}
                    </button>
                )}

                {isExpanded && (
                    <button 
                        onClick={showLess} 
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-bold rounded-full transition-all hover:bg-gray-200 active:scale-95"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerticalCategoryOfferBanner;