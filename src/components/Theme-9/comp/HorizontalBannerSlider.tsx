"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { apiRandomOfferBanners } from "@/apis/offers";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import Banner from "./Banner";
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from "@/constants/icons";

const HorizontalBannerSlider = ({
  companyId,
  slug_type,
  mer_slug,
  domain,
}: any) => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const sliderSectionRef = useRef<HTMLElement | null>(null);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  });

  const getOffers = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      try {
        const bannerOffers = await apiRandomOfferBanners(companyId, pageNum);
        const apiOffers = bannerOffers?.data?.offers || [];
        const filtered = filterOfferBanners(apiOffers, 300, 1000, 0, 150);
        setOffers(filtered);
      } finally {
        setLoading(false);
      }
    },
    [companyId],
  );

  useEffect(() => {
    getOffers(1);
  }, [getOffers]);

  return (
    <section
      ref={sliderSectionRef}
      className="relative group w-full bg-[#FDFCF0] py-4"
    >
      {offers.length > 0 ? (
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(128,0,0,0.15)] border border-[#800000]/5">
            {/* Slider Main View */}
            <div
              ref={sliderRef}
              className="keen-slider h-[180px] md:h-[300px] lg:h-[400px] bg-white"
            >
              {offers.map((item, i) => (
                <div
                  key={i}
                  className="keen-slider__slide flex items-center justify-center overflow-hidden"
                >
                  <Banner
                    data={item}
                    mer_slug={mer_slug}
                    slug_type={slug_type}
                    domain={domain}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}

            {/* Left Button */}
            <button
              onClick={() => slider.current?.prev()}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md border border-[#800000]/10 rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#800000] hover:text-[#FDFCF0] group/btn z-10"
            >
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="text-[#1A1A1A] group-hover/btn:text-[#FDFCF0] transition-colors"
              />
            </button>

            {/* Right Button */}
            <button
              onClick={() => slider.current?.next()}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md border border-[#800000]/10 rounded-full shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-[#800000] hover:text-[#FDFCF0] group/btn z-10"
            >
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-[#1A1A1A] group-hover/btn:text-[#FDFCF0] transition-colors"
              />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="w-8 h-1 bg-[#800000]/40 rounded-full"></div>
              <div className="w-2 h-1 bg-[#800000]/10 rounded-full"></div>
              <div className="w-2 h-1 bg-[#800000]/10 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="h-[180px] md:h-[300px] lg:h-[400px] flex flex-col gap-4 items-center justify-center animate-pulse bg-[#FDFCF0] border border-[#800000]/5 rounded-[2rem]">
            <div className="w-12 h-12 rounded-full border-4 border-[#800000]/10 border-t-[#800000] animate-spin"></div>
            <span className="text-[10px] font-black text-[#800000] uppercase tracking-[0.4em]">
              Loading Signature Banners
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default HorizontalBannerSlider;
