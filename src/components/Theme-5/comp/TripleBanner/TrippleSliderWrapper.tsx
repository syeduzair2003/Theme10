'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Carousel from './Carousel';
import { CompanyBanner } from '@/services/dataTypes';
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from '@/constants/icons';

interface Props {
  domain: string;
  companySliders: CompanyBanner[][];
}

const TrippleBannerWrapper = ({ domain, companySliders }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) return;
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

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [slider]);

  return (
    <div className="relative w-full"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}>
      <div ref={sliderInstanceRef} className="keen-slider">
        {companySliders?.map((sliderGroup, index) => (
          <div key={index} className="keen-slider__slide">
            <Carousel bannerResponse={sliderGroup} domain={domain} />
          </div>
        ))}
      </div>

      {companySliders?.length > 1 && (
        <>
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/50 cursor-pointer hover:bg-gray-600/50 transition"
            onClick={() => slider.current?.prev()}
          >
            <button className="bg-transparent border-0 p-0">
              <FontAwesomeIcon
                icon={faAngleLeft}
                style={{ width: '16px', height: '16px', color: 'white' }}
              />
            </button>
          </div>

          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 z-10 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-500/50 cursor-pointer hover:bg-gray-600/50 transition"
            onClick={() => slider.current?.next()}
          >
            <button className="bg-transparent border-0 p-0">
              <FontAwesomeIcon
                icon={faAngleRight}
                style={{ width: '16px', height: '16px', color: 'white' }}
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TrippleBannerWrapper;
