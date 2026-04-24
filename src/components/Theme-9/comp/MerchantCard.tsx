import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getBaseImageUrl } from "@/constants/hooks";

interface Props {
  merchant_name: string;
  merchant_logo: string;
  companyDomain: string;
  merchant_href: string;
}

const MerchantCard = ({
  merchant_name,
  merchant_logo,
  companyDomain,
  merchant_href,
}: Props) => {
  const nameParts = merchant_name.trim().split(" ");

  return (
    <Link
      href={merchant_href}
      className="no-underline group block h-full max-w-[320px] mx-auto"
    >
      <div className="relative h-full transition-all duration-500 flex flex-col items-center">
        <div className="relative w-full h-full bg-white rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl p-7 pt-12 border border-[#EADDCA]/60 transition-all duration-500 group-hover:shadow-[20px_20px_60px_-15px_rgba(128,0,0,0.12)] group-hover:-translate-y-2 group-hover:border-[#800000]/20 flex flex-col items-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#fdf2e7] to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative z-10 mb-6">
            <div className="absolute -inset-2 bg-[#FDFBE7] rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
            <div className="relative w-24 h-24 bg-white rounded-2xl shadow-sm border border-[#EADDCA]/40 p-4 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-xl group-hover:shadow-black/5">
              <Image
                src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                alt={`${merchant_name} logo`}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col flex-grow items-center text-center z-10 px-2">
            <h3 className="group-hover:text-[#800000] transition-colors duration-300">
              <span className="block text-xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-none">
                {nameParts[0]}
              </span>
              {nameParts.length > 1 && (
                <span className="inline-block mt-3 px-3 py-1 bg-[#800000]/5 text-[#800000] text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-300 group-hover:bg-[#800000] group-hover:text-white">
                  {nameParts.slice(1).join(" ")}
                </span>
              )}
            </h3>
          </div>

          <div className="mt-8 w-full group/btn relative">
            <button className="w-full relative group/btn overflow-hidden border-2 border-[#800000] rounded-xl py-3 px-6 transition-all duration-500">
              <div className="absolute inset-0 bg-[#800000] translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>

              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-[12px] font-black uppercase tracking-[0.2em] text-[#800000] group-hover/btn:text-white transition-colors duration-500">
                  Get Offer
                </span>
              </div>
            </button>

            <div className="absolute inset-0 bg-[#800000]/10 rounded-xl translate-y-1 translate-x-1 -z-10 group-hover/btn:translate-y-0 group-hover/btn:translate-x-0 transition-transform duration-300"></div>
          </div>

          <div className="absolute top-10 left-0">
            <div className="bg-black text-white text-[8px] font-black py-3 px-1.5 rounded-r-lg uppercase [writing-mode:vertical-lr] tracking-[0.2em] opacity-80 group-hover:opacity-100 group-hover:bg-[#800000] transition-all">
              VERIFIED
            </div>
          </div>
        </div>

        <div className="absolute -z-10 inset-4 bg-[#EADDCA]/20 blur-2xl rounded-[4rem] group-hover:bg-[#800000]/5 transition-colors duration-500"></div>
      </div>
    </Link>
  );
};

export default MerchantCard;
