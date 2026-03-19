"use client";

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { faChevronLeft, faChevronRight, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    children: React.ReactNode;
}

const OfferSlider = ({ children }: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        mode: "snap",
        slides: {
            perView: 3,
            spacing: 10,
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        breakpoints: {
            // Laptop/Tablet: Show 2 full cards + 1 half card
            '(max-width: 1200px)': {
                slides: { perView: 2.5, spacing: 10 },
            },
            // Smaller Tablets: Show 1 full card + big peek
            '(max-width: 768px)': {
                slides: { perView: 1.5, spacing: 15 },
            },
            // Mobile: Standard peek effect
            '(max-width: 576px)': {
                slides: { 
                    perView: 1.15, 
                    spacing: 10,
                    origin: 'center' 
                },
            },
        },
    });

    return (
        <div className="t3-slider-wrapper">
            {/* Slider Track */}
            <div ref={sliderRef} className="keen-slider">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return (
                            <div className="keen-slider__slide t3-slide-height">
                                {child}
                            </div>
                        );
                    }
                    return child;
                })}
            </div>

            {/* Custom Orange Arrows */}
            {loaded && instanceRef.current && (
                <>
                    <Arrow
                        left
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                    />
                    <Arrow
                        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                    />
                </>
            )}

            {/* Pagination Dots */}
            {loaded && instanceRef.current && (
                <div className="t3-dots">
                    {/* Logic: We map over the total number of distinct slides (excluding clones).
                       Keen-slider handles the relative index (rel) so this automatically
                       loops back to 0 when you clone past the end.
                    */}
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"t3-dot" + (currentSlide === idx ? " active" : "")}
                                aria-label={`Go to slide ${idx + 1}`}
                            ></button>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

// --- Arrow Component ---
function Arrow(props: {
    disabled?: boolean;
    left?: boolean;
    onClick: (e: any) => void;
}) {
    const disabledClass = props.disabled ? " t3-arrow--disabled" : "";
    return (
        <div
            onClick={props.onClick}
            className={`t3-arrow ${props.left ? "t3-arrow--left" : "t3-arrow--right"} ${disabledClass}`}
        >
            <FontAwesomeIcon icon={props.left ? faChevronLeft : faChevronRight} />
        </div>
    );
}

export default OfferSlider;