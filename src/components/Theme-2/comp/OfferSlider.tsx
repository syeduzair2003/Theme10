"use client";

import React, { useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import './OfferSlider.css';

interface Props {
    children: React.ReactNode;
}

const OfferSlider = ({ children }: Props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true, // 1. Enable Infinite Scrolling (Cloning)
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
        mode: "snap",
        slides: {
            perView: 4.25,
            spacing: 10,
        },
        breakpoints: {
            '(max-width: 1200px)': {
                slides: { perView: 4.25, spacing: 10 },
            },
            '(max-width: 992px)': {
                slides: { perView: 2.25, spacing: 10 },
            },
            '(max-width: 576px)': {
                slides: { 
                    perView: 1.2,
                    spacing: 10,
                    origin: 'center' 
                },
            },
        },
    });

    return (
        <div className="slider-wrapper pb-5"> {/* Added padding-bottom for dots */}
            <div ref={sliderRef} className="keen-slider">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return (
                            <div className="keen-slider__slide">
                                {child}
                            </div>
                        );
                    }
                    return child;
                })}
            </div>

            {/* Arrows */}
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

            {/* 2. Bullets / Dots at the bottom */}
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

// --- Arrow Component (Unchanged) ---
function Arrow(props: {
    disabled?: boolean;
    left?: boolean;
    onClick: (e: any) => void;
}) {
    const disabledClass = props.disabled ? " arrow--disabled" : "";
    return (
        <div
            onClick={props.onClick}
            className={`custom-keen-arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabledClass}`}
        >
            <FontAwesomeIcon icon={props.left ? faChevronLeft : faChevronRight} />
        </div>
    );
}

export default OfferSlider;