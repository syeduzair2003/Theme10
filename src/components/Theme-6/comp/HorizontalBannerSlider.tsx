"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { OffersOffer } from "@/services/dataTypes";
import { apiRandomOfferBanners } from "@/apis/offers";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import Banner from "./Banner";
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from "@/constants/icons";

interface Props {
    companyId: string;
    mer_slug: string;
    slug_type: string;
    domain: string;
}
const HorizontalBannerSlider = ({ companyId, slug_type, mer_slug, domain }: Props) => {
    const [offers, setOffers] = useState<OffersOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [pagination, setPagination] = useState<{ current_page: number; last_page: number; next_page: number | null } | null>(null);
    const latestRequest = useRef(0);
    const MAX_EMPTY_ATTEMPTS = 1;
    const emptyAttempts = useRef(0);
    // 1. Ref and state for intersection observer
    const sliderSectionRef = useRef<HTMLElement | null>(null);
    const [sliderInView, setSliderInView] = useState(false);
    const [isSliderReady, setIsSliderReady] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    const offersRef = useRef(offers);
    const hasMoreRef = useRef(hasMore);
    const loadingRef = useRef(loading);
    const paginationRef = useRef(pagination);
    const sliderInViewRef = useRef(sliderInView);

    useEffect(() => { offersRef.current = offers; }, [offers]);
    useEffect(() => { hasMoreRef.current = hasMore; }, [hasMore]);
    useEffect(() => { loadingRef.current = loading; }, [loading]);
    useEffect(() => { paginationRef.current = pagination; }, [pagination]);
    useEffect(() => { sliderInViewRef.current = sliderInView; }, [sliderInView]);

    // Keen slider
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        mode: 'snap',
        created: () => {
            setIsSliderReady(true);
        },
        slideChanged: (s) => {
            if (
                sliderInViewRef.current &&
                s.track.details.rel === offersRef.current.length - 1 &&
                hasMoreRef.current &&
                !loadingRef.current &&
                paginationRef.current?.next_page
            ) {
                getOffers(paginationRef.current.next_page);
            }
        },
    });
    const autoplayInterval = 6000;

    const startAutoplay = () => {
        if (!slider.current || !isSliderReady || autoplayRef.current) return;
        autoplayRef.current = setInterval(() => {
            const details = slider.current?.track.details;
            const currentAbsIndex = details?.abs || 0;
            slider.current?.moveToIdx(currentAbsIndex + 1, true, {
                duration: 3000,
                easing: (t) => t,
            });
        }, autoplayInterval);
    };

    const stopAutoplay = () => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    };

    useEffect(() => {
        if (!slider.current || !isSliderReady) return;

        startAutoplay();

        const wrapper = sliderSectionRef.current;
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopAutoplay);
            wrapper.addEventListener('mouseleave', startAutoplay);
        }

        return () => {
            stopAutoplay();
            if (wrapper) {
                wrapper.removeEventListener('mouseenter', stopAutoplay);
                wrapper.removeEventListener('mouseleave', startAutoplay);
            }
        };
    }, [slider, isSliderReady]);

    const getOffers = useCallback(async (pageNum: number, reset = false) => {
        setLoading(true);
        const requestId = Date.now();
        latestRequest.current = requestId;
        try {
            const bannerOffers = await apiRandomOfferBanners(companyId, pageNum);
            if (latestRequest.current !== requestId) return;
            const apiOffers = bannerOffers?.data?.offers || [];
            const filterOfferBanner = filterOfferBanners(apiOffers, 300, 1000, 0, 150);
            const paginationData = bannerOffers?.data?.pagination || {};
            setPagination({
                current_page: paginationData.current_page,
                last_page: paginationData.last_page,
                next_page: paginationData.next_page,
            });
            if (filterOfferBanner.length === 0 && paginationData.next_page && emptyAttempts.current < MAX_EMPTY_ATTEMPTS) {
                emptyAttempts.current += 1;
                await getOffers(paginationData.next_page, false);
                return;
            } else {
                emptyAttempts.current = 0;
            }
            if (reset) {
                setOffers(filterOfferBanner);
            } else if (filterOfferBanner.length > 0) {
                setOffers(prev => [...prev, ...filterOfferBanner]);
            }
            setHasMore(paginationData.next_page !== null);
        } finally {
            setLoading(false);
        }
    }, [companyId]);
    // 2. Set up intersection observer
    useEffect(() => {
        if (!sliderSectionRef.current) return;
        const observer = new window.IntersectionObserver(
            (entries) => {
                setSliderInView(entries[0].isIntersecting);
            },
            { threshold: 0.1 }
        );
        observer.observe(sliderSectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setOffers([]);
        setPagination(null);
        emptyAttempts.current = 0;
        getOffers(1, true);
    }, [companyId]);

    useEffect(() => {
        if (slider.current) {
            slider.current.update();
        }
    }, [offers]);

    // Keen slider navigation
    const goPrev = () => slider.current?.prev();
    const goNext = () => slider.current?.next();

    return (
        <section ref={sliderSectionRef} className="container-fluid custom-width">
            {offers?.length > 0 ? (
                <div className="banner-slider-container position-relative">
                    <div ref={sliderRef} className="keen-slider">
                        {offers.map((items: OffersOffer, i: number) => {
                            const dimension = getBannerDimensions(items);
                            return (
                                <div key={i} className="keen-slider__slide" style={sliderItemStyle}>
                                    <Banner data={items} height={dimension?.height} width={dimension?.width} offerLink={null} mer_slug={mer_slug} slug_type={slug_type} domain={domain} />
                                </div>
                            );
                        })}
                        {loading && (
                            <div className="keen-slider__slide" style={sliderItemStyle}>
                                <div className="d-flex justify-content-center align-items-center w-100 h-100">
                                    <span>Loading more banners...</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Arrows */}
                    <div
                        className="custom-slider-prev-shared"
                        style={{
                            background: "#066168",
                            position: "absolute",
                            top: "50%",
                            left: 0,
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            borderRadius: "50%",
                            padding: 0,
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={goPrev}
                    >
                        <button className="custom-arrow-button" style={{ background: "transparent", border: "none", padding: 0 }}>
                            <FontAwesomeIcon icon={faAngleLeft} style={{ width: '16px', height: '16px', color: 'white' }} />
                        </button>
                    </div>
                    <div
                        className="custom-slider-next-shared"
                        style={{
                            background: "#066168",
                            position: "absolute",
                            top: "50%",
                            right: 0,
                            transform: "translateY(-50%)",
                            zIndex: 2,
                            borderRadius: "50%",
                            padding: 0,
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={goNext}
                    >
                        <button className="custom-arrow-button" style={{ background: "transparent", border: "none", padding: 0 }}>
                            <FontAwesomeIcon icon={faAngleRight} style={{ width: '16px', height: '16px', color: 'white' }} />
                        </button>
                    </div>
                </div>
            ) : loading ? (
                <div style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span>Loading banners...</span>
                </div>
            ) : null}
        </section>
    );
};
export default HorizontalBannerSlider;
const sliderItemStyle = {
    width: "100%",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
};
