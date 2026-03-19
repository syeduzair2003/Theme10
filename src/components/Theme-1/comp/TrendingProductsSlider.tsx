"use client";

import { useState } from "react";

interface Props {
  children: React.ReactNode[];
  itemsPerSlide?: number;
}

export default function TrendingProductsSlider({
  children,
  itemsPerSlide = 3.2,
}: Props) {
  const totalSlides = Math.ceil(children.length / itemsPerSlide);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () =>
    setIndex((i) => Math.min(i + 1, totalSlides - 1));

  return (
    <div className="trend-slider position-relative">

      {/* Viewport */}
      <div className="trend-slider-viewport">
        <div
          className="trend-slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slide) => (
            <div className="trend-slide" key={slide}>
              <div className="row g-3">
                {children
                  .slice(
                    slide * itemsPerSlide,
                    slide * itemsPerSlide + itemsPerSlide
                  )
                  .map((card, i) => (
                    <div className="col-xl-4 col-md-12" key={i}>
                      {card}
                    </div>
                  ))
                  }
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {index > 0 && (
        <button
          className="trend-arrow prev"
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>
      )}

      {index < totalSlides - 1 && (
        <button
          className="trend-arrow next"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
      )}

      {/* ✅ TRACKER (ADDED ONLY) */}
      <div className="trend-slider-tracker">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`trend-tracker-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </div>
  );
}
