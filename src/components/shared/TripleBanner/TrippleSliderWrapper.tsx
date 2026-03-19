'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Carousel from './Carousel';
import { CompanyBanner } from '@/services/dataTypes';
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from '@/constants/icons';
import TripleBannerSkeleton from './TrippleBannerSkeleton';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl } from '@/constants/hooks';
import MobileSlider from './MobileSlider';

interface Props {
  domain: string;
  companySliders: CompanyBanner[][];
}

const TrippleBannerWrapper = ({ domain, companySliders }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  // Simulate initial loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) return; // Prevent multiple intervals
    autoplayRef.current = setInterval(() => {
      if (slider.current) {
        slider.current.next();
      }
    }, 4000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  // Start autoplay on mount
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Clean up on unmount
  }, [slider]);

  if (isLoading) return <TripleBannerSkeleton />;

  return (
    <>
      <div className="position-relative d-md-none d-lg-block"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}>
        {/* Keen Slider Container */}
        <div ref={sliderInstanceRef} className="keen-slider">
          {companySliders?.map((sliderGroup, index) => (
            <div key={index} className="keen-slider__slide">
              <Carousel bannerResponse={sliderGroup} domain={domain} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {companySliders?.length > 1 && (
          <>
            <div
              className="custom-slider-prev-shared d-none d-lg-flex"
              onClick={() => slider.current?.prev()}
            >
              <button className="custom-arrow-button">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{ width: '16px', height: '16px', color: 'white' }}
                />
              </button>
            </div>

            <div
              className="custom-slider-next-shared d-none d-lg-flex"
              onClick={() => slider.current?.next()}
            >
              <button className="custom-arrow-button">
                <FontAwesomeIcon
                  icon={faAngleRight}
                  style={{ width: '16px', height: '16px', color: 'white' }}
                />
              </button>
            </div>
          </>
        )}
      </div>
      <div className="d-md-none">
        <MobileSlider banners={companySliders.flat()} domain={domain} />
      </div>
    </>
  );
};

export default TrippleBannerWrapper;