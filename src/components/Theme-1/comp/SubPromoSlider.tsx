"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
  children: React.ReactNode[];
  itemsPerSlide?: number; // still supported
  autoPlayDelay?: number;
}

export default function SubPromoSlider({
  children,
  itemsPerSlide = 3,
  // autoPlayDelay = 3000,
}: Props) {
  /* ✅ NEW: responsive items per slide */
  const [responsiveItems, setResponsiveItems] = useState(itemsPerSlide);

  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 768) {
        setResponsiveItems(1);
      } else if (window.innerWidth < 1200) {
        setResponsiveItems(2);
      } else {
        setResponsiveItems(itemsPerSlide);
      }
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, [itemsPerSlide]);

  /* ❗ LOGIC UNCHANGED — only variable swapped */
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < children.length; i += responsiveItems) {
      result.push(children.slice(i, i + responsiveItems));
    }
    return result;
  }, [children, responsiveItems]);

  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // useEffect(() => {
  //   if (isPaused) return;

  //   intervalRef.current = setInterval(next, autoPlayDelay);

  //   return () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current);
  //   };
  // }, [isPaused, autoPlayDelay]);

  useEffect(() => {
    if (index === extendedSlides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 300);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(extendedSlides.length - 2);
      }, 300);
    }
  }, [index, extendedSlides.length]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

  return (
    <div
      className="trend-slider position-relative overflow-hidden mb-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="trend-slider-viewport">
        <div
          className="trend-slider-track d-flex"
          style={{
            transform: `translateX(-${index * 100}%)`,
            transition: transition ? "transform 0.4s ease" : "none",
          }}
        >
          {extendedSlides.map((group, slideIndex) => (
            <div className="trend-slide flex-shrink-0 w-100" key={slideIndex}>
              <div className="row g-3">
                {group.map((card, i) => (
                  <div
                    key={i}
                    className="
                      col-12
                      col-md-6
                      col-xl-4
                    "
                  >
                    {card}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button className="trend-arrow prev" onClick={prev}>
        ‹
      </button>
      <button className="trend-arrow next" onClick={next}>
        ›
      </button>
    </div>
  );
}
