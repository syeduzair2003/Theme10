import cookieService from "@/services/CookiesService";
import {
  EventMerchant,
  Merchant,
  minimalMerchantData,
} from "@/services/dataTypes";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getBaseImageUrl,
  getMerchantHref,
  getRandomStoreSeoTitle,
} from "@/constants/hooks";

interface Props {
  merchant: EventMerchant | Merchant | minimalMerchantData;
  merSlug: string;
  slugType: string;
}

const SidebarRoundMerchantCard = async ({
  merchant,
  merSlug,
  slugType,
}: Props) => {
  const domainData = await cookieService.get("domain");
  const domain = domainData?.domain;

  return (
    <Link
  href={getMerchantHref(merchant, merSlug, slugType)}
  className="no-underline group relative flex flex-col items-center py-8 px-5 transition-all duration-500"
>
  {/* --- 1. THE LAYERED FRAME --- */}
  {/* Ye card ke piche ek geometric "L" shape accent hai jo sirf hover par nazar ata hai */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-[#800000]/0 rounded-full group-hover:border-[#800000]/10 group-hover:scale-125 transition-all duration-700 -z-10"></div>
  
  <div className="relative z-10">
    {/* --- 2. LOGO CONTAINER (The Floating Diamond/Circle Hybrid) --- */}
    <div
      className="relative w-24 h-24 flex items-center justify-center 
      rounded-[2.5rem] bg-[#FDFBE7]/50 backdrop-blur-sm border border-[#EADDCA]/40 
      transition-all duration-700 
      group-hover:rounded-2xl group-hover:bg-white group-hover:rotate-[10deg]
      group-hover:shadow-[20px_20px_60px_-15px_rgba(128,0,0,0.1)]"
    >
      {/* Subtle Corner Accent */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#800000]/0 group-hover:border-[#800000]/20 rounded-tr-xl transition-all duration-500"></div>

      {/* Logo Image */}
      <div className="relative w-14 h-14 flex items-center justify-center transition-all duration-700 group-hover:-rotate-[10deg] group-hover:scale-110">
        <Image
          src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
          alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
          height={56}
          width={56}
          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </div>

    {/* --- 3. THE "OFFER COUNT" BUBBLE --- */}
    <div className="absolute -bottom-2 -right-2 bg-[#800000] text-white text-[7px] font-black w-7 h-7 flex items-center justify-center rounded-full shadow-lg border-2 border-white scale-0 group-hover:scale-100 transition-all duration-500 delay-100">
      HOT
    </div>
  </div>

  {/* --- 4. TYPOGRAPHY (Editorial Style) --- */}
  <div className="mt-8 flex flex-col items-center gap-1">
    <span className="text-[10px] font-black text-[#1A1A1A] tracking-[0.3em] uppercase group-hover:text-[#800000] transition-colors">
      {merchant?.merchant_name}
    </span>
    
    {/* Minimalist Progress Indicator */}
    <div className="relative w-8 h-[2px] bg-[#EADDCA] overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-[#800000] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
    </div>
  </div>
</Link>
  );
};

export default SidebarRoundMerchantCard;
