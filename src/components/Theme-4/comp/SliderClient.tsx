"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Merchant, MerchantWithOffers, OffersMerchant, OffersOffer } from "@/services/dataTypes";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import { getMerchantHref } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";


interface SliderClientProps {
    banners: OffersOffer[];
    merchant: MerchantWithOffers | Merchant | OffersMerchant;
    mer_slug: string;
    slug_type: string;
    domain: string;
}

const SliderClient = ({ banners, mer_slug, merchant, slug_type, domain }: SliderClientProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="rounded-xl overflow-hidden w-full"
        >
            {banners.map((banner, idx) => (
                <SwiperSlide key={idx} className="flex justify-center">
                    <OfferOutUrl
                        outUrl={banner.offer.url}
                        merchantHref={getMerchantHref(merchant, mer_slug, slug_type)}
                        unique_id={banner.offer.unique_id}
                        domain={domain}
                    >
                        <img
                            src={`${banner.offer.banner_image}`}
                            alt={`${banner.offer.banner_image}`}
                            className="mx-auto"
                        />
                    </OfferOutUrl>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SliderClient;
