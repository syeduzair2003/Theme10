import React from "react";
import { ArrowRight } from "lucide-react";

export default function Subscribe() {
  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#0a0a0c]">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D1C7A7]/40 blur-[120px] rounded-full z-0" />

      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#800000]/10 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-5xl md:text-7xl font-black text-[#D1C7A7] mb-6 tracking-tighter leading-[0.9]">
          Never miss <br /> a deal.
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-lg md:text-xl font-medium mb-12 max-w-xl mx-auto">
          Join 100,000+ smart shoppers. Get exclusive deals delivered to your
          inbox.
        </p>

        {/* Subscribe Form */}
        <form className="flex flex-col sm:flex-row items-center justify-center max-w-2xl mx-auto mb-6 gap-3">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email address"
            required
            className="
              w-full
              h-[60px]
              bg-white/10
              border border-white/15
              text-white
              px-8
              rounded-full
              outline-none
              backdrop-blur-md
              transition-all
              focus:bg-white/15
              focus:border-white/40
              placeholder:text-gray-400
            "
          />

          {/* Button */}
          <button
            type="submit"
            className="
    h-[60px]
    px-10
    rounded-full
    bg-[#800000]
    text-[#FFFDF5]
    font-bold
    flex
    items-center
    justify-center
    gap-2
    hover:bg-[#660000]
    hover:shadow-2xl
    hover:shadow-[#800000]/30
    transition-all
    active:scale-95
    whitespace-nowrap
    shadow-lg
    group
  "
          >
            Subscribe
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-gray-400 text-sm hover:text-gray-100">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
