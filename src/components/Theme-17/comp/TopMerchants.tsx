import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    discardHTMLTags,
    getBaseImageUrl,
    getMerchantHref,
    getRandomStoreSeoTitle,
    splitHeadingFromDetails,
} from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Merchant } from '@/services/dataTypes';
import { Zap } from 'lucide-react';

interface Props {
    merchantData: Merchant[];
    mer_slug: string;
    mer_slug_type: string;
}

const TopMerchants = async ({ merchantData, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = await cookieService.get('domain');

    // Cap at 12 merchants
    const displayMerchants = merchantData?.slice(0, 12) ?? [];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
            {displayMerchants.map((merchant, index) => {
                const [heading] = splitHeadingFromDetails(merchant?.merchant_detail);
                const displayTitle = heading
                    ? discardHTMLTags(heading)
                    : getRandomStoreSeoTitle(merchant?.merchant_name);
                const logoSrc = getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, '');
                const href = getMerchantHref(merchant, mer_slug, mer_slug_type);
                const offerCount = merchant.total_offers ?? 0;
                const offerLabel =
                    offerCount > 0 ? `${offerCount}+ DEALS` : 'VIEW DEALS';

                return (
                    <Link
                        key={merchant.unique_id ?? index}
                        href={href}
                        className="group relative flex flex-col items-center rounded-2xl bg-white/5 border border-white/5 no-underline transition-all duration-500 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:-translate-y-2 overflow-hidden"
                        style={{
                            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
                        }}
                    >
                        {/* --- Indigo Hover Glow --- */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* --- Discount Badge (Floating Style) --- */}
                        {merchant.discount_tag && (
                            <div className="absolute top-2 right-2 z-20">
                                <span className="flex items-center gap-1 bg-indigo-600 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-lg">
                                    <Zap size={8} className="fill-white" />
                                    {merchant.discount_tag}
                                </span>
                            </div>
                        )}

                        {/* --- Logo Container --- */}
                        <div className="w-full aspect-[4/3] flex items-center justify-center p-6 relative">
                            <div className="relative w-full h-full transition-all duration-500 group-hover:scale-110">
                                <Image
                                    src={logoSrc}
                                    alt={`${merchant.merchant_name} coupons and deals`}
                                    fill
                                    sizes="(max-width: 768px) 100px, 150px"
                                    className="object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* --- Content Area --- */}
                        <div className="w-full p-4 pt-0 text-center relative z-10">
                            {/* Merchant Name */}
                            <p className="text-[11px] font-black text-slate-400 group-hover:text-white uppercase tracking-wider line-clamp-1 mb-2 transition-colors duration-300">
                                {merchant.merchant_name}
                            </p>

                            {/* Offer Label - Pill Style */}
                            <div className="inline-block px-3 py-1 bg-white/5 group-hover:bg-indigo-600/20 border border-white/5 group-hover:border-indigo-500/30 rounded-md transition-all duration-300">
                                <span className="text-[9px] font-black tracking-[0.1em] text-indigo-400 group-hover:text-indigo-300 uppercase">
                                    {offerLabel}
                                </span>
                            </div>
                        </div>

                        {/* --- Animated Bottom Border --- */}
                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-500" />
                    </Link>
                );
            })}
        </div>
    );
};

export default TopMerchants;