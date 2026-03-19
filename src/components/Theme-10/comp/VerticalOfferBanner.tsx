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
    }, [bannerResponse, pagination]);

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
        <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 text-center mb-4">
                Related Banner Offers
            </h4>
            
            {/* Divider Line */}
            <div className="relative flex items-center py-2 mb-4">
                <div className="flex-grow border-t border-slate-100"></div>
                <div className="flex-shrink mx-4 h-1 w-1 bg-slate-300 rounded-full"></div>
                <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* Banners List */}
            <div className="flex flex-col gap-4 mb-6">
                {banners?.map((offer_data, i) => {
                    const dimension = getBannerDimensions(offer_data);
                    return (
                        <div key={i} className="hover:scale-[1.02] transition-transform duration-300">
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

            {/* Action Buttons */}
            <div className={`flex items-center gap-3 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
                {hasMore && (
                    <button 
                        onClick={loadMore} 
                        disabled={loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-100 disabled:opacity-70"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : "Show More"}
                    </button>
                )}
                
                {isExpanded && (
                    <button 
                        onClick={showLess} 
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all text-center border border-slate-200"
                    >
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default VerticalOfferBanner;