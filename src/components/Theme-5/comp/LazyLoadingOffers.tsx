"use client"
import { apiSpecificOffers } from '@/apis/offers';
import { apiExpiredOffers } from '@/apis/user';
import { OffersOffer, PaginationType } from '@/services/dataTypes';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { filterOfferBanners, getBannerDimensions } from '@/constants/hooks';
import dynamic from 'next/dynamic';
import OffersListView from './OffersListView';

const Banner = dynamic(() => import('./Banner'), {
    ssr: false,
});

interface Props {
    initialOffers: OffersOffer[];
    companyId: string;
    merchantId: string;
    awaited_p_id: string;
    mer_slug_type: string;
    mer_slug: string;
    offerBanner: OffersOffer[];
    domain: string;
    merchantName: string;
    pagination: PaginationType;
    ads_campaign: boolean;
}

const LazyLoadingOffers = ({ initialOffers, companyId, merchantId, awaited_p_id, mer_slug_type, mer_slug, offerBanner, domain, merchantName, pagination, ads_campaign }: Props) => {
    const [offers, setOffers] = useState<OffersOffer[]>(initialOffers);
    const [expiredOffers, setExpiredOffers] = useState<OffersOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const [filteredOfferBanners, setFilteredOfferBanners] = useState<OffersOffer[]>([]);
    const bannerDisplayAfter = 2;

    useEffect(() => {
        setOffers(initialOffers);
        fetchExpiredOffers();
    }, [initialOffers]);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        if (page == pagination?.last_page) {
            setHasMore(false);
            return;
        }
        setLoading(true);
        try {
            const nextPage = page + 1;
            const response = await apiSpecificOffers(merchantId, companyId, nextPage);

            if (response.data?.offers.length > 0) {
                setOffers(prev => [...prev, ...response.data.offers]);
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error loading more offers:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpiredOffers = async () => {
        try {
            const response = await apiExpiredOffers(merchantId, companyId);
            setExpiredOffers(response.data?.offers || []);
        } catch (error) {
            // console.error("Error fetching expired offers:", error);
        }
    };

    const observerCallback = useCallback(
        (node: any) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            }, { threshold: 0.1 });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore, loadMore]
    );

    useEffect(() => {
        if (offerBanner?.length > 0) {
            setFilteredOfferBanners(filterOfferBanners(offerBanner, 300, 600, 50, 150))
        }
    }, [offerBanner])

    return (
        <div className="space-y-6">
            {offers.map((offer, index) => (
                offer.status === 1 && offer.offer.status === 1 ? (
                    <div key={offer.id} ref={index === offers.length - 1 ? observerCallback : undefined}>
                        <OffersListView
                            product={offer}
                            companyId={companyId}
                            mer_slug_type={mer_slug_type}
                            mer_slug={mer_slug}
                            domain={domain}
                            ads_campaign={ads_campaign}
                        />
                        {(index + 1) % bannerDisplayAfter === 0 &&
                            filteredOfferBanners.length > 0 &&
                            filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (() => {
                                const banner = filteredOfferBanners[Math.floor(index / bannerDisplayAfter)];
                                const dimension = getBannerDimensions(banner);
                                return (
                                    <div className="my-6" key={`banner-${Math.floor(index / bannerDisplayAfter)}`}>
                                        <Banner
                                            data={banner} height={dimension?.height} width={dimension?.width} offerLink={null} domain={domain} mer_slug={mer_slug} slug_type={mer_slug_type}
                                        />
                                    </div>
                                );
                            })()
                        }
                    </div>
                ) : null
            ))}

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
            )}

            {expiredOffers?.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Old deals & coupons that might still work for {merchantName}
                    </h2>
                    <div className="space-y-4">
                        {expiredOffers?.slice(0, 10).map((item, i) => (
                            <OffersListView
                                key={i}
                                product={item}
                                companyId={companyId}
                                mer_slug_type={mer_slug_type}
                                mer_slug={mer_slug}
                                domain={domain}
                                ads_campaign={ads_campaign}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default LazyLoadingOffers