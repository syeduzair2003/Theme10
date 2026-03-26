"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BannerSection({ merchants }: { merchants: any[] }) {
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    if (merchants && merchants.length > 0) {
      // Top 8 merchants ka data map karein
      const selected = merchants.slice(0, 8).map((m, i) => ({
        name: m.merchant_name,
        logo: m.merchant_logo,
        // Responsive left position (taaki mobile par overlap na ho)
        left: `${i * 12 + 5}%`,
        delay: i * 2,
        duration: 10 + Math.random() * 5, // Random speed for natural look
      }));
      setBubbles(selected);
    }
  }, [merchants]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#fffde0]/80 text-white overflow-hidden pt-20 pb-10">
      {/* Background Spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#D1C7A7]/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#800000]/10 rounded-full blur-[120px]" />
      </div>

      {/* 🔹 Main Content (Z-Index ensure karein) */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-10"
        >
          <div className="p-3 rounded-xl bg-[#0D0D0D]/5 border border-[#800000]/10 flex items-center gap-3 hover:bg-[#800000]/5 hover:border-[#800000]/20 transition-all duration-300 shadow-sm">
  {/* Pulsing Maroon Dot */}
  <span className="flex h-2 w-2 rounded-full bg-[#800000] animate-pulse shadow-[0_0_8px_rgba(128,0,0,0.4)]"></span>
  
  {/* Matte Black Text */}
  <span className="text-xs md:text-sm font-black text-[#0D0D0D] uppercase tracking-[0.2em] opacity-90">
    Live Premium Discounts
  </span>
</div>
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-transparent bg-clip-text bg-[#1A1A1A]">
            The future of
          </span>{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-[#857e6a]">
            smart savings.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-[#0D0D0D]/60 mb-12 max-w-2xl mx-auto leading-relaxed font-medium tracking-tight italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Discover elite coupon codes and deals from 15,000+ brands. Verified
          daily. Saved instantly.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-8 py-4 bg-[#800000] text-[#FFFDF5] rounded-full font-black text-xs uppercase tracking-[0.25em] hover:scale-105 hover:bg-[#A52A2A] transition-all duration-500 shadow-[0_10px_30px_rgba(128,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(128,0,0,0.5)] active:scale-95 overflow-hidden">
            <span className="relative z-10">Get Started</span>
            {/* Subtle Shine Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
          <button className="px-8 py-4 bg-[#0D0D0D] border border-[#0D0D0D] rounded-full font-black text-xs text-[#FFFDF5] uppercase tracking-[0.25em] hover:bg-transparent hover:text-[#800000] hover:border-[#800000] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95 group">
            <span className="flex items-center gap-2">Categories</span>
          </button>
        </div>
      </div>
    </section>
  );
}
