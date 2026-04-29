"use client";

import { OffersOffer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react';
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
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
        <div className="relative group/sidebar mb-10 w-full">
            {/* Elegant Background Layer */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8bc94a20] to-[#ff912f10] rounded-[2.5rem] blur opacity-50 group-hover/sidebar:opacity-100 transition duration-1000 -z-10" />

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/50 overflow-hidden text-center w-full">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8bc94a08] rounded-full blur-3xl -mr-16 -mt-16" />

                <h4 className="text-xl font-black text-[#222e48] mb-8 pb-4 border-b border-gray-50 flex items-center justify-center relative">
                    Banner Offers
                </h4>

                <div className="flex flex-col gap-2 mb-8">
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

                {(hasMore || isExpanded) && (
                    <div className={`mt-4 flex w-full flex-col sm:flex-row items-center gap-4 ${isExpanded && hasMore ? 'justify-between' : 'justify-center'}`}>
                        {hasMore && (
                            <button 
                                onClick={loadMore} 
                                disabled={loading}
                                className="relative group/btn overflow-hidden rounded-full py-3 px-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mx-auto sm:mx-0 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 text-sm font-bold text-[#222e48] group-hover/btn:text-[#8bc94a] transition-colors flex items-center gap-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4 text-[#8bc94a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : "Show More"}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#8bc94a08] to-[#ff912f08] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                            </button>
                        )}
                        {isExpanded && (
                            <button 
                                onClick={showLess} 
                                disabled={loading}
                                className="relative group/btn-less overflow-hidden rounded-full py-3 px-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mx-auto sm:mx-0 w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 text-sm font-bold text-gray-600 group-hover/btn-less:text-[#ff912f] transition-colors">
                                    Show Less
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ff912f08] to-[#ff912f10] opacity-0 group-hover/btn-less:opacity-100 transition-opacity" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerticalCategoryOfferBanner;
