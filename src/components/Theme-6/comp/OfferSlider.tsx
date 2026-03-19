"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css"; // Import Keen Slider CSS

interface OfferSliderProps {
  children: React.ReactNode;
}

export default function OfferSlider({ children }: OfferSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const items = React.Children.toArray(children);

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    selector: ".Trend-keen-slider__slide",
    loop: true, // Infinite scrolling
    slides: {
      perView: 1, // Default mobile
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 769px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  return (
    <div className="offer-slider-container">
      {/* Left Arrow */}
      <button
        className="slider-arrow left"
        onClick={() => slider?.current?.prev()}
        style={{ display: items.length <= 1 ? "none" : "flex" }}
      >
        ❮
      </button>

      {/* Keen Slider Track */}
      <div ref={sliderRef} className="Trend-keen-slider">
        {items.map((child, index) => (
          <div className="Trend-keen-slider__slide " key={index}>
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="slider-arrow right"
        onClick={() => slider?.current?.next()}
        style={{ display: items.length <= 1 ? "none" : "flex" }}
      >
        ❯
      </button>

      {/* Pagination Bullets */}
      {items.length > 1 && (
        <div className="slider-pagination">
          {items.map((_, idx) => (
            <div
              key={idx}
              className={`pagination-bar ${currentSlide === idx ? "active" : ""}`}
              onClick={() => slider?.current?.moveToIdx(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
