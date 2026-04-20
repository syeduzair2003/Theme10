import { getBaseImageUrl, parseDiscountTag } from "@/constants/hooks";
import { faArrowRight, FontAwesomeIcon } from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  merchant_name: string;
  merchant_logo: string;
  companyDomain: string;
  merchant_href: string;
  discountTag?: string | null;
}

const MerchantForProduct = ({
  merchant_name,
  merchant_logo,
  companyDomain,
  merchant_href,
  discountTag,
}: Props) => {
  const parsedDiscount = parseDiscountTag(discountTag);

  return (
    <Link href={merchant_href} className="group block h-full">
      <div className="relative bg-[#FDFCF0] border border-[#800000]/10 rounded-[2rem] p-6 transition-all duration-500 flex flex-col h-full overflow-hidden hover:bg-white hover:shadow-[20px_20px_60px_-15px_rgba(128,0,0,0.1)] hover:-translate-y-2">
        <div className="flex justify-between items-start mb-8">
          {/* Brand Logo */}
          <div className="w-16 h-16 bg-white rounded-2xl p-3 flex items-center justify-center border border-slate-100 shadow-sm group-hover:rotate-[-4deg] transition-transform duration-500">
            <div className="relative w-full h-full">
              <Image
                src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                alt={`${merchant_name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {parsedDiscount && (
            <div className="bg-[#800000] text-[#FDFCF0] px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-tighter shadow-lg shadow-[#800000]/20">
              {parsedDiscount.value} {parsedDiscount.middle}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#800000]"></span>
            <span className="text-[#800000] text-[9px] font-black uppercase tracking-[0.2em]">
              Official Store
            </span>
          </div>

          <h3 className="text-2xl font-black text-[#0f172a] leading-tight mb-3 tracking-tighter group-hover:text-[#800000] transition-colors duration-300">
            {merchant_name}
          </h3>

          <p className="text-slate-500 text-xs font-medium leading-relaxed opacity-80">
            Premium collections curated for excellence. Explore verified deals
            and seasonal offers.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-[#800000]/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
              Status
            </span>
            <span className="text-emerald-600 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Verified
            </span>
          </div>

          <div className="flex items-center gap-2 group/btn">
            <span className="text-black font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              View Store
            </span>
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center group-hover:bg-[#800000] transition-all duration-500 shadow-md">
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-[#800000]/5 blur-[60px] rounded-full pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default MerchantForProduct;
