import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CompanyWiseMerchant, Merchant } from "@/services/dataTypes";
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

interface Props {
  merchant: Merchant | CompanyWiseMerchant;
  mer_slug: string;
  mer_slug_type: string;
  className?: string;
}

const StoreCard = async ({ merchant, mer_slug, mer_slug_type, className }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const [heading, details] = splitHeadingFromDetails(merchant?.merchant_detail);
  const headingToShow = heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(merchant?.merchant_name);

  return (
    <Link
      href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
      className={`group block w-full shrink-0 snap-start py-2 ${className}`}
    >
      <div className="relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-3 flex items-center gap-4 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-100/50 hover:border-indigo-200">
        {/* Brand Container */}
        <div className="relative z-10 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center p-2 border border-slate-50 group-hover:bg-white group-hover:rotate-3 transition-all duration-500">
          <Image
            src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
            alt={merchant?.merchant_name || "Merchant"}
            width={56}
            height={56}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Information Section */}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-tighter mb-0.5 opacity-80">
            {merchant?.merchant_name}
          </p>
          <h4 className={`
            font-extrabold text-slate-900 leading-[1.2]
            ${headingToShow.length > 30 ? 'text-[11px]' : 'text-[13px]'}
            line-clamp-2
          `}>
            {headingToShow}
          </h4>
        </div>

        {/* Minimal Arrow Action */}
        <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;