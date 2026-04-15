"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

export default function BannerSection({ merchants }: { merchants: any[] }) {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    if (merchants && merchants.length > 0) {
      const selected = merchants.slice(0, 8).map((m, i) => ({
        name: m.merchant_name,
        logo: m.merchant_logo,
        left: `${i * 12 + 5}%`,
        delay: i * 2,
        duration: 10 + Math.random() * 5,
      }));
      setBubbles(selected);
    }
  }, [merchants]);

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] flex flex-col items-center justify-center bg-[#fffde0]/80 text-white overflow-hidden pt-28 pb-10">
      {/* Background Spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D1C7A7]/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#800000]/10 rounded-full blur-[120px]" />
      </div>

      {/* 🔹 Main Content Wrapper */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.9fr,1.4fr] gap-10 items-center px-6 max-w-7xl mx-auto w-full text-center lg:text-left">
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-center lg:items-start lg:pr-4 order-2 lg:order-1">
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tighter text-[#1A1A1A]">
            The future of <br />
            <span className="text-[#800000]">smart savings.</span>
          </motion.h1>

          <motion.p className="text-base text-[#0D0D0D]/60 mb-8 max-w-md leading-relaxed font-medium italic">
            Discover elite coupon codes and deals from 15,000+ brands. Verified
            daily. Saved instantly.
          </motion.p>
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link
            href="/#recent-deals-section"
             className="w-full sm:w-auto px-8 py-4 bg-[#800000] text-[#FFFDF5] rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-lg active:scale-95">
              Recent Deals
            </Link>
            <Link
            href={"/category"}
             className="w-full no-underline sm:w-auto px-8 py-4 bg-[#0D0D0D] text-[#FFFDF5] rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-transparent hover:text-[#0D0D0D] border border-[#0D0D0D] transition-all active:scale-95">
              Categories
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-video lg:aspect-[16/9] z-10 order-1 lg:order-2"
        >
          <div className="absolute inset-0 bg-[#800000]/5 rounded-[2.5rem] -rotate-2 translate-x-3 translate-y-2"></div>

          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-[#D1C7A7] shadow-2xl bg-white">
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect={"fade"}
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              className="h-full w-full"
            >
              {/* Slide 1 */}
              <SwiperSlide className="h-full w-full">
                <div className="relative h-full w-full group">
                  <Image
                    src="/uploads/company_5/images/1754425975_68926a778d774.jpg"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Deal 1"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide className="h-full w-full">
                <div className="relative h-full w-full group">
                  <Image
                    src="/uploads/company_5/images/1748025392_6830c030a518b.png"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Deal 2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              </SwiperSlide>

              {/* Slide 3 */}
              <SwiperSlide className="h-full w-full">
                <div className="relative h-full w-full group">
                  <Image
                    src="/uploads/company_5/images/1753911160_688a8f78eaaee.jpg"
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    alt="Deal 2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
              </SwiperSlide>
            </Swiper>

            {/* Live Tag */}
            <div className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
              <span className="flex h-2 w-2 rounded-full bg-[#800000] animate-pulse"></span>
              <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">
                Live Premium Discounts
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
