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
        left: `${(i * 12) + 5}%`, 
        delay: i * 2,
        duration: 10 + Math.random() * 5 // Random speed for natural look
      }));
      setBubbles(selected);
    }
  }, [merchants]);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#0a0a0c] text-white overflow-hidden pt-20 pb-10">
      
      {/* Background Spotlights */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 🔹 Floating Store Bubbles */}
      {bubbles.map((deal, i) => (
        <motion.div
          key={i}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            opacity: [0, 1, 1, 0],
          }}
          transition={{ 
            duration: deal.duration, 
            repeat: Infinity, 
            delay: deal.delay,
            ease: "linear" 
          }}
          className="absolute z-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl px-6 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
          style={{ left: deal.left }}
        >
          {/* Merchant Name */}
          <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1">
            {deal.name}
          </span>
          <span className="text-xl font-black tracking-tighter">Verified</span>
          <span className="text-[9px] opacity-40 font-bold uppercase mt-1 tracking-widest text-white">Coupon</span>
        </motion.div>
      ))}

      {/* 🔹 Main Content (Z-Index ensure karein) */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 mb-10"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs md:text-sm font-bold text-blue-400 uppercase tracking-widest">
            Live Premium Discounts
          </span>
        </motion.div>

        <motion.h1 
          className="text-6xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          The future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
            smart savings.
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Discover elite coupon codes and deals from 15,000+ brands. 
          Verified daily. Saved instantly.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-5 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all duration-300">
            Get Started
          </button>
          <button className="px-5 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
            Categories
          </button>
        </div>
      </div>
    </section>
  );
}