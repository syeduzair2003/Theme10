import { apiGetMultiProductOffers } from '@/apis/user';
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import { HomeMultiProductData, OffersOffer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import TrendingProductsSlider from './TrendingProductsSlider';
import TrendingProductsCard from './TrendingProductsCard';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const count = 8;
    const responseData = (await apiGetMultiProductOffers(companyId)).data;
    const companyDomain = await cookieService.get("domain");

    const renderSection = (sectionData: HomeMultiProductData) => {
        if (!sectionData?.offers?.length) {
            return null;
        }

        const [headingFirst, headingSecond] = splitHeading(sectionData?.home_page_widget?.widget_heading);
        return (
            <div className="mb-12 last:mb-0 w-full" key={sectionData?.merchant?.unique_id}>
                {/* ── Section header row ── */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Merchant Logo */}
                        {sectionData?.merchant?.merchant_logo && (
                            <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-2xl p-2 border border-gray-100 shadow-sm relative overflow-hidden group/logo">
                                <Image
                                    src={getBaseImageUrl(companyDomain.domain, sectionData.merchant.merchant_logo, "")}
                                    alt="Merchant Logo"
                                    fill
                                    className="object-contain p-2 transition-transform duration-300 group-hover/logo:scale-110"
                                />
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="flex flex-col">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className="w-1 h-3.5 sm:h-4 rounded-full inline-block"
                                    style={{ background: '#8bc94a' }}
                                    aria-hidden="true"
                                />
                                <span
                                    className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
                                    style={{ color: '#ff912f' }}
                                >
                                    Trending Products
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 leading-tight m-0">
                                {headingFirst && (
                                    <span style={{ color: '#8bc94a' }}>{headingFirst} </span>
                                )}
                                <span className="text-gray-800">{headingSecond || "Products"}</span>
                            </h2>

                            {/* SubText */}
                            {sectionData?.home_page_widget?.widget_text && (
                                <p className="mt-1 text-[11px] sm:text-[13px] text-gray-400 leading-relaxed m-0 max-w-md line-clamp-1 sm:line-clamp-none">
                                    {sectionData.home_page_widget.widget_text}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* View All Button */}
                    <div className="flex items-center md:pt-1 shrink-0">
                        <Link
                            href={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-bold no-underline px-5 py-2.5 rounded-full border transition-all duration-300 group shadow-sm hover:shadow-md"
                            style={{
                                borderColor: '#f0f0f0',
                                color: '#ff912f',
                                background: '#ffffff',
                            }}
                        >
                            View More Deals
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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
                    className="w-full h-[2px] mb-8"
                    style={{
                        background:
                            'linear-gradient(90deg, #8bc94a40 0%, #ff912f40 50%, #8bc94a40 100%)',
                    }}
                    aria-hidden="true"
                />

                <div className="w-full max-w-[1300px] mx-auto">
                    <TrendingProductsSlider>
                        {sectionData.offers.slice(0, count).map((item, i) => (
                            <TrendingProductsCard
                                key={i}
                                item={item}
                                merchantHref={getMerchantHref(sectionData?.merchant, mer_slug, mer_slug_type)}
                                merchant_logo={item?.merchant?.merchant_logo || sectionData?.merchant?.merchant_logo}
                                productDetailUrl={item?.offer?.slug ? getProductDetailHref(sectionData?.merchant, mer_slug_type, item?.offer?.slug) : null}
                            />
                        ))}
                    </TrendingProductsSlider>
                </div>
            </div>
        );
    };

    if (!responseData?.first && !responseData?.second) return null;

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-[#fafafa]">
            <div className="container mx-auto px-4">
                <div className="w-full">
                    {responseData?.first && renderSection(responseData?.first)}
                    {responseData?.second && renderSection(responseData?.second)}
                </div>
            </div>
        </section>
    );
}

export default TrendingProducts;