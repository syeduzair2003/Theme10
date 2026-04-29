"use client";

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { faChevronLeft, faChevronRight, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    children: React.ReactNode;
}

const TrendingProductsSlider = ({ children }: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        mode: "snap",
        slides: {
            perView: 5,
            spacing: 16,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        breakpoints: {
            '(max-width: 1280px)': {
                slides: { perView: 4, spacing: 14 },
            },
            '(max-width: 1024px)': {
                slides: { perView: 3, spacing: 12 },
            },
            '(max-width: 768px)': {
                slides: { perView: 2.2, spacing: 10 },
            },
            '(max-width: 480px)': {
                slides: { perView: 1.2, spacing: 10 },
            },
        },
    });

    return (
        <div className="relative group w-full px-4 md:px-8">
            <div ref={sliderRef} className="keen-slider py-4">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return (
                            <div className="keen-slider__slide flex justify-center h-auto">
                                {child}
                            </div>
                        );
                    }
                    return child;
                })}
            </div>

            {/* Navigation Arrows */}
            {loaded && instanceRef.current && (
                <>
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-gray-500 hover:text-[#ff912f] hover:scale-110 transition-all focus:outline-none disabled:opacity-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.prev();
                        }}
                        aria-label="Previous slide"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-gray-500 hover:text-[#ff912f] hover:scale-110 transition-all focus:outline-none disabled:opacity-50"
                        onClick={(e) => {
                            e.stopPropagation();
                            instanceRef.current?.next();
                        }}
                        aria-label="Next slide"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </>
            )}

            {/* Pagination Bullets */}
            {loaded && instanceRef.current && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                        const isActive = currentSlide === idx;
                        return (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-8 bg-[#8bc94a]" : "w-2.5 bg-gray-300 hover:bg-[#ff912f]"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TrendingProductsSlider;
