import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getMerchantHref,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { ArrowUpRight } from "lucide-react";

const StoreCardHorizontal = async ({
  merchant,
  mer_slug,
  mer_slug_type,
}: any) => {
  const companyDomain = await cookieService.get("domain");
  const [heading] = splitHeadingFromDetails(merchant?.details);
  const logoSrc = getBaseImageUrl(
    companyDomain.domain,
    merchant?.merchant_logo,
    "",
  );

  return (
    <Link
      href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
      className="no-underline block group"
    >
      <div className="flex flex-col gap-4 p-4 rounded-[2.5rem] bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all border border-white/10 hover:border-[#800000]/40 group shadow-none hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-w-[260px] w-[260px] h-full flex-shrink-0 relative overflow-hidden">
        {/* Logo Box - Isko bada aur center kar diya portrait look ke liye */}
        <div className="relative w-full aspect-square bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-[2rem] flex-shrink-0 p-4 shadow-sm group-hover:bg-white/[0.07] group-hover:border-[#800000]/30 transition-all duration-500 overflow-hidden flex items-center justify-center">
          <Image
            src={logoSrc}
            alt={merchant?.merchant_name}
            fill
            className="object-contain p-6" // Padding barha di taaki logo chota aur clean lage
          />
        </div>

        {/* Info Section - Ab ye niche aayegi */}
        <div className="flex-1 text-center pt-2">
          <h4 className="font-black text-[#FFFDF5] text-lg group-hover:text-[#800000] transition-colors duration-300 line-clamp-1 mb-2 tracking-tight">
            {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
          </h4>

          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-black text-[#A50000] group-hover:text-[#FF3D3D] uppercase tracking-[0.25em] drop-shadow-[0_0_8px_rgba(165,0,0,0.4)] transition-colors duration-300">
              Verified
            </span>
            <span className="text-[10px] font-medium text-gray-400">
              Just updated
            </span>
          </div>
        </div>

        {/* Arrow Icon - Isko top right par absolute position kar diya professional look ke liye */}
        <div className="absolute top-6 right-6 opacity-0 translate-x-4 -translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <div className="bg-[#800000]/20 p-2 rounded-full backdrop-blur-md border border-[#800000]/30 shadow-[0_0_20px_rgba(128,0,0,0.2)]">
            <ArrowUpRight
              size={18}
              className="text-[#FF3D3D] drop-shadow-[0_0_5px_rgba(255,61,61,0.5)]"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCardHorizontal;
