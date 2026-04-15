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
      className="no-underline group relative flex flex-col items-center py-5 px-3 transition-all duration-500"
    >
      {/* Background Soft Glow - Maroon Tint */}
      <div
        className="absolute inset-0 scale-50 group-hover:scale-110 opacity-0 group-hover:opacity-100 
        transition-all duration-700 bg-[#800000]/5 rounded-[3rem] blur-3xl"
      ></div>

      {/* Merchant Logo Container */}
      <div
        className="relative z-10 w-20 h-20 flex items-center justify-center 
        rounded-2xl bg-white border border-[#EADDCA] 
        shadow-[0_8px_20px_-10px_rgba(0,0,0,0.1)] 
        transition-all duration-500 
        group-hover:-translate-y-2 
        group-hover:shadow-[0_15px_40px_-12px_rgba(128,0,0,0.15)] 
        group-hover:border-[#800000]/20"
      >
        <div
          className="absolute inset-0 rounded-2xl p-[1px] 
          bg-gradient-to-tr from-[#800000] via-[#A52A2A] to-[#1A1A1A] 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        >
          <div className="w-full h-full bg-white rounded-2xl"></div>
        </div>

        {/* Logo Image */}
        <div className="relative z-10 w-12 h-12 flex items-center justify-center">
          <Image
            src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
            alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
            height={48}
            width={48}
            className="object-contain transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="mt-4 text-center relative z-10">
        <p
          className="text-[10px] font-black tracking-[0.15em] text-[#4A4A4A] 
          group-hover:text-[#800000] transition-colors duration-300 uppercase leading-tight"
        >
          {merchant?.merchant_name}
        </p>

        <div
          className="mx-auto mt-2 h-[1.5px] w-0 bg-[#800000] 
          rounded-full group-hover:w-6 transition-all duration-300"
        ></div>
      </div>
    </Link>
  );
};

export default SidebarRoundMerchantCard;
