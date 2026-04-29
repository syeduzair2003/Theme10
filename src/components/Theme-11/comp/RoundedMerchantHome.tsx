import { apiGetTopCashbackMerchants } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { splitHeading, getBaseImageUrl, getMerchantHref } from '@/constants/hooks';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

const RoundedMerchantHome = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomainObj = await cookieService.get("domain");
    const companyDomain = companyDomainObj?.domain || '';

    const merchants = await apiGetTopCashbackMerchants(companyId);

    // Using widget heading or fallback
    const heading = merchants?.data?.cashback_merchants_widget?.widget_heading || "Cash Back At Stores";
    const subText = merchants?.data?.cashback_merchants_widget?.widget_text;
    const [firstWord, restWords] = splitHeading(heading);

    const getRandomCashback = () => {
        const amount = Math.floor(Math.random() * 15) + 1;
        return `${amount}%`;
    };

    const displayMerchants = merchants.data?.merchants?.slice(0, 7) || [];

    if (displayMerchants?.length > 0) {
        return (
            <section
                aria-label="Cashback Merchants Section"
                className="relative w-full py-12 md:py-16 lg:py-20"
                style={{
                    background: '#ffffff',
                }}
            >
                <div className="container mx-auto px-4">
                    {/* ── Section header row (Matching Category Section style) ── */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div className="flex-1 min-w-0">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-2 mb-1.5">
                                <span
                                    className="w-[3px] h-4 rounded-full inline-block"
                                    style={{ background: '#8bc94a' }}
                                    aria-hidden="true"
                                />
                                <span
                                    className="text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: '#ff912f' }}
                                >
                                    Top Cashback
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                                {firstWord && (
                                    <span style={{ color: '#8bc94a' }}>{firstWord} </span>
                                )}
                                <span className="text-gray-800">{restWords || heading}</span>
                            </h2>

                            {/* Sub-text */}
                            {subText && (
                                <p className="mt-1.5 text-[13px] text-gray-400 leading-relaxed m-0 max-w-2xl">
                                    {subText}
                                </p>
                            )}
                        </div>

                        {/* Right: View All button */}
                        <div className="flex items-start pt-1 shrink-0">
                            <Link
                                href={`/${mer_slug}`}
                                className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-5 py-2.5 rounded-full border transition-all duration-200 group"
                                style={{
                                    borderColor: '#e8e8e8',
                                    color: '#ff912f',
                                    background: '#ffffff',
                                }}
                            >
                                All Cash Back
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* ── Thin gradient divider ── */}
                    <div
                        className="w-full h-px mb-8 md:mb-10"
                        style={{
                            background:
                                'linear-gradient(90deg, #ff912f30, #8bc94a30, #ff912f30)',
                        }}
                        aria-hidden="true"
                    />

                    {/* ── Merchants Flex Layout ── */}
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
                        {displayMerchants.map((merchant, i) => {
                            const merchantName = merchant.merchant_name;
                            const merchantLogo = merchant.merchant_logo;
                            const cashbackAmount = merchant?.discount_tag;
                            const href = getMerchantHref(merchant, mer_slug, mer_slug_type);

                            return (
                                <Link
                                    key={i}
                                    href={href}
                                    className="group flex flex-col items-center w-[100px] sm:w-[110px] md:w-[130px] no-underline"
                                >
                                    {/* Circle Container */}
                                    <div className="w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] rounded-full border border-gray-200 bg-white flex items-center justify-center p-5 mb-4 group-hover:border-[#8bc94a] group-hover:shadow-[0_0_20px_rgba(139,201,74,0.25)] transition-all duration-300 relative overflow-hidden">
                                        {merchantLogo ? (
                                            <Image
                                                src={getBaseImageUrl(companyDomain, merchantLogo, '')}
                                                alt={merchantName}
                                                fill
                                                className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100px, 130px"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#8bc94a] font-bold text-2xl uppercase">
                                                {merchantName?.[0]}
                                            </div>
                                        )}
                                    </div>

                                    {/* Cashback Amount */}
                                    {/*<div className="flex items-center justify-center gap-1 mb-1">
                                         <span className="flex items-center text-[#111827] group-hover:text-[#8bc94a] transition-colors duration-300 font-black text-lg md:text-xl">
                                            
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8bc94a" className="w-4 h-4 md:w-5 md:h-5 mr-1">
                                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                                            </svg>
                                            {cashbackAmount ? `${cashbackAmount}%` : getRandomCashback()}
                                        </span> 
                                    </div>*/}
                                    <span className="text-gray-500 font-medium text-xs sm:text-sm whitespace-nowrap group-hover:text-gray-900 transition-colors duration-300">
                                        {merchantName}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>
        );
    }
    return null;
}

export default RoundedMerchantHome;