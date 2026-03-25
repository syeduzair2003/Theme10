import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, splitHeadingFromDetails } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { ArrowUpRight } from 'lucide-react';

const StoreCardHorizontal = async ({ merchant, mer_slug, mer_slug_type }: any) => {
    const companyDomain = await cookieService.get("domain");
    const [heading] = splitHeadingFromDetails(merchant?.details);
    const logoSrc = getBaseImageUrl(companyDomain.domain, merchant?.merchant_logo, "");

    return (
        <Link href={getMerchantHref(merchant, mer_slug, mer_slug_type)} className="no-underline block group">
            <div className="flex items-center gap-5 p-4 rounded-2xl bg-transparent hover:bg-[#F5F2E8]/80 transition-all border border-transparent hover:border-[#800000]/10 group shadow-none hover:shadow-md hover:shadow-[#800000]/5">
                
                {/* Logo Box */}
                <div className="relative w-16 h-16 bg-[#ececec] border border-[#E0DBCF] rounded-xl flex-shrink-0 p-2 shadow-sm group-hover:shadow-md group-hover:border-[#800000]/20 transition-all duration-300 overflow-hidden">
                    <Image
                        src={logoSrc}
                        alt={merchant?.merchant_name}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h4 className="font-extrabold text-[#1A1A1A] text-base group-hover:text-[#800000] transition-colors duration-300 line-clamp-1">
                        {discardHTMLTags(heading ? heading : merchant?.merchant_name)}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-[#800000] uppercase">Verified</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-[10px] font-medium text-gray-400">Just updated</span>
                    </div>
                </div>

                {/* Arrow Icon */}
                <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#800000] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
        </Link>
    )
}

export default StoreCardHorizontal