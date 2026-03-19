'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";

interface SlideItem {
  image: string;
  url?: string;
  text?: string;
}

interface SliderProps {
  slides: SlideItem[][];
}

const Slider = ({ slides }: SliderProps) => {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      loop={false}
      navigation
      autoplay={{ delay: 30000 }}
      className="w-full md:h-[480px] mx-auto px-4"
    >
      {slides.map((group, index) => (
        <SwiperSlide key={index}>
          <div className="flex gap-4 h-full w-full justify-center items-center min-w-0">
            {group.map((src, i) => (
              <div
                key={i}
                className="relative group flex flex-col items-center rounded-lg overflow-hidden"
              >
                {/* Image with hover overlay */}
                <Link href={src.url || "#"} className="relative block overflow-hidden rounded-lg">
                  <img
                    src={src.image}
                    alt={`Image ${i + 1}`}
                    className="object-contain transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />

                  {/* Text overlay */}
                  <div
                    className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-2 text-sm 
                    opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                  >
                    {src.text}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
