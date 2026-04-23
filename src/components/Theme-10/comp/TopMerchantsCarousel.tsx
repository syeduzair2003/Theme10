"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

interface CarouselProps {
  children: React.ReactNode[]; // Hum cards as children lenge
}

const TopMerchantsCarousel = ({ children }: CarouselProps) => {
  return (
    <div className="w-full relative pb-12">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={2}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        className="!static"
      >
        {children.map((card, index) => (
          <SwiperSlide key={index} className="py-2">
            {/* Yahan Server Side render hua card show hoga */}
            {card}
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active { background: #800000 !important; }
        .swiper-pagination { bottom: 0 !important; }
      `}</style>
    </div>
  );
};

export default TopMerchantsCarousel;