"use client";

import React, { useEffect, useMemo, useState } from "react";

// --- The Slider Component ---
interface SliderProps {
    children: React.ReactNode;
    itemsPerSlide?: number;
}

export function SubPromoSlider({ children, itemsPerSlide = 3 }: SliderProps) {
    const [responsiveItems, setResponsiveItems] = useState(itemsPerSlide);

    // 1. Safe handling of children
    const arrayChildren = React.Children.toArray(children);

    // 2. Responsive Logic
    useEffect(() => {
        const updateItems = () => {
            if (window.innerWidth < 768) setResponsiveItems(1);
            else if (window.innerWidth < 1200) setResponsiveItems(2);
            else setResponsiveItems(itemsPerSlide);
        };
        updateItems();
        window.addEventListener("resize", updateItems);
        return () => window.removeEventListener("resize", updateItems);
    }, [itemsPerSlide]);

    // 3. Group slides
    const slides = useMemo(() => {
        const result = [];
        for (let i = 0; i < arrayChildren.length; i += responsiveItems) {
            result.push(arrayChildren.slice(i, i + responsiveItems));
        }
        return result;
    }, [arrayChildren, responsiveItems]);

    // 4. Infinite Loop Clones
    const extendedSlides = [
        slides[slides.length - 1],
        ...slides,
        slides[0],
    ];

    const [index, setIndex] = useState(1);
    const [transition, setTransition] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    const next = () => setIndex((i) => i + 1);
    const prev = () => setIndex((i) => i - 1);

    // 5. Handle Infinite Loop Reset (SYNCED TIMING)
    useEffect(() => {
        if (index === extendedSlides.length - 1) {
            setTimeout(() => {
                setTransition(false);
                setIndex(1);
            }, 500); // Matches CSS transition duration
        }
        if (index === 0) {
            setTimeout(() => {
                setTransition(false);
                setIndex(extendedSlides.length - 2);
            }, 500); // Matches CSS transition duration
        }
    }, [index, extendedSlides.length]);

    // Re-enable transition after a reset
    useEffect(() => {
        if (!transition) {
            // Force reflow/repaint so the removal of transition takes effect immediately
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setTransition(true));
            });
        }
    }, [transition]);

    if (!arrayChildren.length) return null;

    return (
        <div
            className="trend-slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="trend-slider-viewport">
                <div
                    className="trend-slider-track d-flex"
                    style={{
                        transform: `translateX(-${index * 100}%)`,
                        // Ensure this matches the setTimeout above (0.5s)
                        transition: transition ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
                    }}
                >
                    {extendedSlides.map((group, slideIndex) => (
                        <div className="trend-slide" key={slideIndex}>
                            <div className="row g-4 justify-content-center">
                                {group.map((card, i) => (
                                    <div key={i} className="col-12 col-md-6 col-xl-4">
                                        {card}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="trend-arrow prev" onClick={prev} aria-label="Previous">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="trend-arrow next" onClick={next} aria-label="Next">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
        </div>
    );
}