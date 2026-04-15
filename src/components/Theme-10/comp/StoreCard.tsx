import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getMerchantHref,
  getRandomStoreSeoTitle,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
  merchant: Merchant | CompanyWiseMerchant;
  mer_slug: string;
  mer_slug_type: string;
}

const StoreCard = async ({ merchant, mer_slug, mer_slug_type }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const domain = companyDomain?.domain;

  const logoSrc = getBaseImageUrl(domain, merchant.merchant_logo, "");

  return (
    <Link
      href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
      className="no-underline group relative flex flex-col items-center w-full"
    >
      {/* Main Container */}
      <div className="relative w-full aspect-square mb-5 transition-all duration-500">
        <div className="absolute inset-0 bg-[#800000]/0 group-hover:bg-[#800000]/5 rounded-[2.5rem] blur-2xl transition-all duration-500" />

        {/* Logo Frame */}
        <div className="relative w-full h-full bg-[#F5F2E8] border border-[#E0DBCF] rounded-[2.5rem] flex items-center justify-center p-8 shadow-sm group-hover:shadow-3xl group-hover:shadow-[#800000]/20 group-hover:border-[#800000]/40 transition-all duration-500 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#800000]/5 rounded-full group-hover:scale-[3] transition-transform duration-700" />

          <div className="relative w-full h-full z-10">
            <Image
              src={logoSrc}
              alt={merchant.merchant_name}
              fill
              className="object-contain grayscale-[0.8] group-hover:grayscale-0 transition-all duration-500 scale-95 group-hover:scale-110"
              sizes="200px"
            />
          </div>
        </div>

        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-[#FFFDF5] p-2.5 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 shadow-2xl z-50 overflow-visible">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M14 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Merchant Name & Offer Hint */}
      <div className="text-center space-y-1">
        <h4 className="font-black text-sm text-[#1A1A1A] group-hover:text-[#800000] transition-colors duration-300 uppercase tracking-tighter">
          {merchant.merchant_name}
        </h4>
        <div className="flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#800000] rounded-full animate-pulse shadow-[0_0_8px_rgba(128,0,0,0,6)]"></span>
          <span className="text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
            Verified Savings
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
