import { apiGetTopCashbackMerchants } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { splitHeading, getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const RoundedMerchantHome = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomainObj = await cookieService.get("domain");
    const companyDomain = companyDomainObj?.domain || '';

    const merchants = await apiGetTopCashbackMerchants(companyId);

    // Logic remains identical
    const heading = merchants?.data?.cashback_merchants_widget?.widget_heading || "Cash Back At Stores";
    const subText = merchants?.data?.cashback_merchants_widget?.widget_text;
    const [firstWord, restWords] = splitHeading(heading);

    const displayMerchants = merchants.data?.merchants?.slice(0, 7) || [];

    if (displayMerchants?.length > 0) {
        return (
            <section
                aria-label="Cashback Merchants Section"
                className="relative w-full py-16 md:py-24 bg-[#020617] overflow-hidden"
            >
                {/* --- Consistent Top Divider --- */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />

                <div className="container relative z-10 mx-auto px-4">
                    {/* ── Section header row ── */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="flex-1 min-w-0">
                            {/* Eyebrow - Consistent with theme */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                    <Sparkles size={12} />
                                    Top Cashback
                                </div>
                                <div className="h-px w-10 bg-slate-800" />
                            </div>

                            {/* Heading - Indigo & White */}
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none m-0 uppercase">
                                {firstWord && (
                                    <span className="text-indigo-500">{firstWord} </span>
                                )}
                                <span className="text-slate-200">{restWords || heading}</span>
                            </h2>

                            {/* Sub-text */}
                            {subText && (
                                <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-2xl">
                                    {subText}
                                </p>
                            )}
                        </div>

                        {/* Right: View All button - Consistent style */}
                        <div className="shrink-0">
                            <Link
                                href={`/${mer_slug}`}
                                className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-6 py-3.5 rounded-xl border border-white/10 text-slate-300 bg-white/5 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 shadow-2xl"
                            >
                                <span>All Cash Back</span>
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* ── Subtle Divider ── */}
                    <div className="w-full h-px bg-slate-900 mb-16" />

                    {/* ── Merchants Circular Layout ── */}
                    <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-14">
                        {displayMerchants.map((merchant, i) => {
                            const merchantName = merchant.merchant_name;
                            const merchantLogo = merchant.merchant_logo;
                            const href = getMerchantHref(merchant, mer_slug, mer_slug_type);

                            return (
                                <Link
                                    key={i}
                                    href={href}
                                    className="group flex flex-col items-center w-[90px] sm:w-[110px] md:w-[130px] no-underline"
                                >
                                    {/* Elevated Circle Container */}
                                    <div className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] mb-6">
                                        {/* Outer Glow Ring on Hover */}
                                        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className="relative w-full h-full rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center p-5 group-hover:border-indigo-500/50 group-hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-2xl">
                                            {merchantLogo ? (
                                                <Image
                                                    src={getBaseImageUrl(companyDomain, merchantLogo, '')}
                                                    alt={merchantName}
                                                    fill
                                                    className="object-contain p-6 sm:p-7 md:p-8 brightness-110 contrast-125 group-hover:scale-110 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 110px, 130px"
                                                    unoptimized
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-indigo-400 font-black text-2xl uppercase">
                                                    {merchantName?.[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Merchant Name */}
                                    <span className="text-slate-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-widest text-center group-hover:text-indigo-400 transition-colors duration-300 px-2 line-clamp-1">
                                        {merchantName}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Bottom Glow Decoration */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
            </section>
        );
    }
    return null;
}

export default RoundedMerchantHome;