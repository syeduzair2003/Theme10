"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import TrendingMerchantsCard from "./TrendingMerchantsCard";

interface Merchant {
    merchant_logo: string;
    merchant_name: string;
    slug: string;
}

interface MerchantsCarouselProps {
    merchants: Merchant[];
}

export default function MerchantsCarousel({ merchants }: MerchantsCarouselProps) {
    return (
        <section className="relative my-4">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={6}
                slidesPerView={2}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {merchants.map((merchant, idx) => (
                    <SwiperSlide key={idx}>
                        <TrendingMerchantsCard
                            image={merchant.merchant_logo}
                            name={merchant.merchant_name}
                            slug={`/store/${merchant.slug}`}
                            
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
