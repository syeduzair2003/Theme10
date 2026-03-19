"use client";

import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { CompanyBanner } from "@/services/dataTypes";
import Carousel from "./Carousel";

interface Props {
    banners: CompanyBanner[][];
    domain: string;
}

const animations = ["fade", "zoom", "flip", "slide-up", "slide-right"];

const TripleBannerSlider = ({ banners, domain }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [incomingAnim, setIncomingAnim] = useState<string>("fade");
    const autoplayRef = useRef<number | null>(null);

    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        defaultAnimation: {
            duration: 0, // ⛔ disable Keen’s animation
        },
        slideChanged(s) {
            setActiveIndex(s.track.details.rel);
            setIncomingAnim(animations[Math.floor(Math.random() * animations.length)]);
        },
        created(s) {
            setActiveIndex(s.track.details.rel);
        },
        // slideChanged(s) {
        //     const idx = s.track.details.rel;
        //     const rand = animations[Math.floor(Math.random() * animations.length)];
        //     setIncomingAnim(rand);
        //     setActiveIndex(idx);
        // },
    });

    // autoplay
    useEffect(() => {
        const start = () => {
            if (autoplayRef.current) return;
            autoplayRef.current = window.setInterval(() => {
                slider.current?.next();
            }, 10000000);
        };
        const stop = () => {
            if (autoplayRef.current) {
                window.clearInterval(autoplayRef.current);
                autoplayRef.current = null;
            }
        };

        // start autoplay after mount
        // start();
        return () => stop();
    }, [slider]);

    if (!banners || banners.length === 0) return null;

    if (banners.length === 1) {
        return (
        <div className="triple-banner-slider position-relative">
            <Carousel bannerResponse={banners[0]} domain={domain} />
        </div>
        );
    }

    return (
        <div className="triple-banner-slider position-relative"
            style={{ 
                //  height: '100%', 
                //  maxHeight: '500px', // 1. STOPS the giant expansion on zoom/wide screens
                //  minHeight: '400px'  // Optional: ensures it's never too small
             }}>
            <div
                ref={sliderRef}
                className="keen-slider h-100"
                onMouseEnter={() => {
                    if (autoplayRef.current) {
                        window.clearInterval(autoplayRef.current);
                        autoplayRef.current = null;
                    }
                }}
                onMouseLeave={() => {
                    if (!autoplayRef.current) {
                        autoplayRef.current = window.setInterval(() => {
                            slider.current?.next();
                        }, 4000);
                    }
                }}
            >
                {banners.map((group, idx) => (
                    <div key={idx} className="keen-slider__slide">
                        {/* animate .slide-inner only for active slide */}
                        <div
                            className={`slide-inner h-100 ${idx === activeIndex ? `animate ${incomingAnim}` : "" }`}
                        >
                            <Carousel bannerResponse={group} domain={domain} />
                        </div>
                    </div>
                ))}
            </div>

            {/* arrows */}
            <button
                aria-label="Prev"
                className="slider-arrow slider-arrow--left"
                onClick={() => slider.current?.prev()}
            >
                ‹
            </button>
            <button
                aria-label="Next"
                className="slider-arrow slider-arrow--right"
                onClick={() => slider.current?.next()}
            >
                ›
            </button>

            {/* dots */}
            <div className="slider-dots">
                {banners.map((_, i) => (
                    <span
                        key={i}
                        className={`slider-dot ${i === activeIndex ? "active" : ""}`}
                        onClick={() => slider.current?.moveToIdx(i)}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TripleBannerSlider;
