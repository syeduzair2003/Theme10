"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { apiRandomOfferBanners } from "@/apis/offers";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import Banner from "./Banner";
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from "@/constants/icons";

const HorizontalBannerSlider = ({ companyId, slug_type, mer_slug, domain }: any) => {
    const [offers, setOffers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const sliderSectionRef = useRef<HTMLElement | null>(null);

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
    });

    // Fetch data logic (Wahi rahegi jo aapne di thi)
    const getOffers = useCallback(async (pageNum: number) => {
        setLoading(true);
        try {
            const bannerOffers = await apiRandomOfferBanners(companyId, pageNum);
            const apiOffers = bannerOffers?.data?.offers || [];
            const filtered = filterOfferBanners(apiOffers, 300, 1000, 0, 150);
            setOffers(filtered);
        } finally { setLoading(false); }
    }, [companyId]);

    useEffect(() => { getOffers(1); }, [getOffers]);

    return (
        <section ref={sliderSectionRef} className="relative group w-full bg-slate-200">
            {offers.length > 0 ? (
                <>
                    <div ref={sliderRef} className="keen-slider h-[160px] md:h-[220px] lg:h-[280px]">
                        {offers.map((item, i) => (
                            <div key={i} className="keen-slider__slide flex items-center justify-center overflow-hidden bg-white">
                                <Banner data={item} mer_slug={mer_slug} slug_type={slug_type} domain={domain} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Navigation Buttons */}
                    <button onClick={() => slider.current?.prev()} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <FontAwesomeIcon icon={faAngleLeft} className="text-slate-800" />
                    </button>
                    <button onClick={() => slider.current?.next()} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <FontAwesomeIcon icon={faAngleRight} className="text-slate-800" />
                    </button>
                </>
            ) : (
                <div className="h-[200px] flex items-center justify-center animate-pulse bg-slate-100 text-slate-400">
                    Loading banners...
                </div>
            )}
        </section>
    );
};

export default HorizontalBannerSlider;