"use client"
import { apiSpecificOffers } from '@/apis/offers';
import { apiExpiredOffers } from '@/apis/user';
import { OffersOffer, PaginationType } from '@/services/dataTypes';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
// import Banner from "@/components/Theme-1/comp/Banner";
import { filterOfferBanners, getBannerDimensions, getBaseImageUrl, getRandomRating } from '@/constants/hooks';
import dynamic from 'next/dynamic';

const Banner = dynamic(() => import('./Banner'), {
    ssr: false,
});

const OffersListView = dynamic(() => import('./OffersListView'), {
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
    const [lazy, setLazy] = useState(false);
    const bannerDisplayAfter = 2;
    useEffect(() => {
        const timer = setTimeout(() => setLazy(true), 400);
        return () => clearTimeout(timer);
    }, []);

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
        <>
            <section className="product-shop-full-grid">
                <div className="container">
                    <div className="row">
                        <div className="section-title-center text-center mt-5">
                            {offers.map((offer, index) => (
                                offer.status === 1 && offer.offer.status === 1 ? (
                                    <React.Fragment key={offer.id}>
                                        <div
                                            ref={index === offers.length - 1 ? observerCallback : undefined}
                                        >
                                            <OffersListView
                                                product={offer}
                                                companyId={companyId}
                                                awaited_p_id={awaited_p_id}
                                                mer_slug_type={mer_slug_type}
                                                mer_slug={mer_slug}
                                                domain={domain}
                                                rating={getRandomRating(offer?.offer?.rating)}
                                                ads_campaign={ads_campaign}
                                            />
                                        </div>
                                        {(index + 1) % bannerDisplayAfter === 0 &&
                                            filteredOfferBanners.length > 0 &&
                                            filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (() => {
                                                const banner = filteredOfferBanners[Math.floor(index / bannerDisplayAfter)];
                                                const dimension = getBannerDimensions(banner);
                                                return (
                                                    <div className="banner-container" key={`banner-${Math.floor(index / bannerDisplayAfter)}`}>
                                                        <Banner
                                                            data={banner} height={dimension?.height} width={dimension?.width} offerLink={null} domain={domain} mer_slug={mer_slug} slug_type={mer_slug_type}
                                                        />
                                                    </div>
                                                );
                                            })()
                                        }
                                    </React.Fragment>
                                ) : null
                            ))}
                            {loading && (
                                <div className="d-flex justify-content-center align-items-center mt-4" style={{ height: "80px" }}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            {expiredOffers?.length > 0 ?
                <section className="product-shop-full-grid">
                    <div className="container">
                        <div className="row">
                            <div className="section-title-center text-center mt-5">
                                <h2 className="display-four n17-color mb-4 mb-md-6 fs-three f-30">Old deals & coupons that might still work for {merchantName}</h2>
                            </div>
                            {expiredOffers?.length > 0 && expiredOffers?.map((item, i) => {
                                if (i <= 9) {
                                    return (
                                        <OffersListView
                                            key={i}
                                            product={item}
                                            companyId={companyId}
                                            awaited_p_id={awaited_p_id}
                                            mer_slug_type={mer_slug_type}
                                            mer_slug={mer_slug}
                                            domain={domain}
                                            rating={getRandomRating(item?.offer?.rating)}
                                            ads_campaign={ads_campaign}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </div>
                </section>
                : <></>}
            <script
                type="application/ld+json"
                id='AggregateOffer'
                dangerouslySetInnerHTML={{
                    "__html": JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AggregateOffer",
                        "name": `${merchantName} Coupons & Deals`,
                        "description": `Currently, there are several active coupons and deals available for ${merchantName} products.`,
                        "offerCount": offers.length,
                        "offers": offers.map((offer) => ({
                            "@type": "Offer",
                            "name": offer?.offer?.offer_title,
                            "description": offer?.offer?.offer_detail,
                            "url": getBaseImageUrl(`${domain}`, `${offer.offer?.url}`, ""),
                        }))
                    })
                }}
            />
        </>
    )
}

export default LazyLoadingOffers
