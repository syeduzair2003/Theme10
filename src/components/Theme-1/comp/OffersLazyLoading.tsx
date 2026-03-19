"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Offer, OffersOffer, PaginationType } from "@/services/dataTypes";
import AllProductListView from "./AllProductLIstView";
import Spinner from 'react-bootstrap/Spinner';
import { apiOfferDetails, apiSpecificOffers } from '@/apis/offers';
import { apiExpiredOffers } from '@/apis/user';
import { filterOfferBanners, getBannerDimensions, getBaseImageUrl } from '@/constants/hooks';
import Banner from './Banner';

interface Props {
    merchant_id: string;
    company_id: string;
    product_id: string | null;
    slug_type: string;
    mer_slug: string;
    offerBanner: OffersOffer[];
    merchantName: string;
    domain: string;
    initialOffers?: OffersOffer[];
    pagination?: PaginationType;
}

const OffersLazyLoading = ({ initialOffers = [], merchant_id, company_id, product_id, mer_slug, slug_type, offerBanner, merchantName, domain, pagination }: Props) => {
    const [offers, setOffers] = useState<OffersOffer[]>(initialOffers);
    const [expiredOffers, setExpiredOffers] = useState<OffersOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const [filteredOfferBanners, setFilteredOfferBanners] = useState<OffersOffer[]>([]);
    const bannerDisplayAfter = 2;
    const [productData, setProductData] = useState<Offer | null>(null);

    useEffect(() => {
        setOffers(initialOffers);
        setPage(1);
        setHasMore(true);
        fetchExpiredOffers();
    }, [initialOffers]);

    useEffect(() => {
        if (offerBanner?.length > 0) {
            setFilteredOfferBanners(filterOfferBanners(offerBanner, 300, 600, 50, 150))
        }
    }, [offerBanner]);

    useEffect(() => {
        if (product_id) {
            getProductDetails(product_id);
        }
        // eslint-disable-next-line
    }, [product_id]);

    const getProductDetails = async (p_id: string) => {
        const response = await apiOfferDetails(p_id, company_id);
        if (productData == null) {
            setProductData(response.data);
        }
    };

    const loadMore = async () => {
        if (loading || !hasMore) return;
        if (pagination && page >= pagination.last_page) {
            setHasMore(false);
            return;
        }
        setLoading(true);
        try {
            const nextPage = page + 1;
            const response = await apiSpecificOffers(merchant_id, company_id, nextPage);
            if (response.data?.offers.length > 0) {
                setOffers(prev => [...prev, ...response.data.offers]);
                setPage(nextPage);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            // console.error("Error loading more offers:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExpiredOffers = async () => {
        try {
            const response = await apiExpiredOffers(merchant_id, company_id);
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

    return (
        <>
            <section className="all-product list-view">
                <div className="row gy-4 list-grid-wrapper gap-2">
                    {offers.length === 0 && !loading ? (
                        <div className="w-100 text-center py-5"><h2 className="text-danger">No Offers Found</h2></div>
                    ) : (
                        offers.map((product: OffersOffer, index: number) =>
                            product.status === 1 && product.offer.status === 1 ? (
                                <React.Fragment key={product.id}>
                                    <div ref={index === offers.length - 1 ? observerCallback : undefined}>
                                        <AllProductListView
                                            product={product}
                                            companyId={company_id}
                                            product_details={productData}
                                            mer_slug={mer_slug}
                                            slug_type={slug_type}
                                            domain={domain}
                                        />
                                    </div>

                                    {(index + 1) % bannerDisplayAfter === 0 &&
                                        filteredOfferBanners.length > 0 &&
                                        filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (() => {
                                            const bannerIndex = Math.floor(index / bannerDisplayAfter);
                                            const dimension = getBannerDimensions(filteredOfferBanners); // You can also move this outside if needed
                                            return (
                                                <div className="banner-container" key={`banner-${bannerIndex}`}>
                                                    <Banner
                                                        data={filteredOfferBanners[bannerIndex]}
                                                        offerLink={null}
                                                        domain={domain}
                                                        height={dimension?.height}
                                                        width={dimension?.width}
                                                    />
                                                </div>
                                            );
                                        })
                                    ()}
                                </React.Fragment>
                            ) : null
                        )
                    )}
                    {loading && (
                        <div className="d-flex justify-content-center align-items-center mt-4" style={{ height: "80px" }}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </div>
            </section>
            {expiredOffers?.length > 0 ? (
                <section className="all-product list-view mt-5">
                    <h3>Old deals & coupons that might still work for {merchantName}</h3>
                    <div className="row gy-4 list-grid-wrapper gap-2">
                        {expiredOffers.map((product) =>
                            product.status === 1 && product.offer.status === 1 ? (
                                <AllProductListView
                                    product={product}
                                    key={product.id}
                                    companyId={company_id}
                                    product_details={productData}
                                    mer_slug={mer_slug}
                                    slug_type={slug_type}
                                    domain={domain}
                                />
                            ) : null
                        )}
                    </div>
                </section>
            ) : null}
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

export default OffersLazyLoading
