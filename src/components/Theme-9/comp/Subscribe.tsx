import React from "react";
import { ArrowRight, Mail } from "lucide-react";
import StoreCardHorizontal from "./StoreCardHorizontal";
import { apiRecentlyUpdatedStores } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import FreshDealsSlider from "./FreshDealsSlider";

interface Props {
  slug_type: string;
  store_slug: string;
}

const Subscribe = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;

  return (
    <section className="relative w-full py-12 md:py-16 overflow-hidden bg-[#1A1A1A] min-h-fit lg:h-auto flex items-center">
      {/* Background Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-[#800000]/10 blur-[100px] rounded-full z-0" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#D1C7A7]/5 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 w-full pr-10 pl-10  mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        {/* Left Side Subscribe Content */}
        <div className="w-full lg:w-5/12 text-left space-y-5">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl font-black text-[#D1C7A7] tracking-tighter leading-[0.95] uppercase">
              Never miss <br />
              <span className="text-[#800000]">a deal.</span>
            </h2>
            <div className="h-1 w-16 bg-[#800000] rounded-full" />
          </div>

          <p className="text-gray-400 text-base md:text-lg max-w-xs leading-snug">
            Get the world&apos;s best coupon codes and elite deals delivered straight
            to your inbox daily.
          </p>

          <form className="relative flex flex-col gap-3 max-w-sm group">
            <div className="relative">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#800000] transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-[55px] bg-white/5 backdrop-blur-md border border-white/10 text-white pl-12 pr-6 rounded-xl outline-none focus:border-[#800000]/50 transition-all text-sm"
              />
            </div>

            <button className="w-full h-[55px] rounded-xl bg-[#800000] text-white font-black uppercase tracking-widest hover:bg-[#a00000] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group text-sm shadow-xl shadow-[#800000]/10">
              Subscribe Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest text-center">
              No spam. Just pure savings.
            </p>
          </form>
        </div>

        {/* Right Side Slider Section */}
        <div className="w-full lg:w-7/12 relative transform lg:scale-95 origin-right">
          {promoMerchants?.length > 0 && (
            <div className="relative p-3 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-sm shadow-inner">
              <FreshDealsSlider>
                {promoMerchants.map((merchant: any, i: number) => (
                  <div key={i} className="px-1.5">
                    <StoreCardHorizontal
                      merchant={merchant}
                      mer_slug={store_slug}
                      mer_slug_type={slug_type}
                    />
                  </div>
                ))}
              </FreshDealsSlider>
            </div>
          )}

          {/* Premium Theme Badge */}
          <div className="absolute -top-3 -right-2 z-30 scale-90 md:scale-100">
            <div className="relative group/badge overflow-hidden bg-[#800000] text-[#D1C7A7] text-[9px] font-black px-5 py-2 rounded-full rotate-12 shadow-2xl border border-[#D1C7A7]/20 uppercase tracking-[0.12em] flex items-center gap-2 transition-all hover:rotate-0 hover:scale-110 duration-500 cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />

              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D1C7A7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D1C7A7]"></span>
              </span>
              <span>Recently Updated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
