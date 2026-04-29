import { apiGetTopCategories } from '@/apis/page_optimization';
import { splitHeading, getBaseImageUrl } from '@/constants/hooks';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';

interface Props {
    companyId: string;
    slug_type: string;
    cat_slug: string;
}

const HomeCategories = async ({ companyId, cat_slug, slug_type }: Props) => {
    const response = await apiGetTopCategories(companyId);
    const topCategoriesResponse = response.data;
    const companyDomain = (await cookieService.get('domain')).domain;

    const heading = response?.data?.top_category_widget?.widget_heading || 'Top Categories';
    const subText = response?.data?.top_category_widget?.widget_text;
    const [firstWord, restWords] = splitHeading(heading);

    if (topCategoriesResponse?.categories?.length > 0) {
        return (
            <section
                aria-label="Categories Section"
                className="relative w-full py-12 md:py-16 lg:py-20"
                style={{
                    background: '#ffffff',
                }}
            >
                <div className="container mx-auto px-4">
                    {/* ── Section header row (Matching RecentEvents style) ── */}
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
                                    Popular Categories
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
                                href={`/${cat_slug}`}
                                className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-5 py-2.5 rounded-full border transition-all duration-200 group"
                                style={{
                                    borderColor: '#e8e8e8',
                                    color: '#ff912f',
                                    background: '#ffffff',
                                }}
                            >
                                View All Categories
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
                        className="w-full h-px mb-6 md:mb-8"
                        style={{
                            background:
                                'linear-gradient(90deg, #ff912f30, #8bc94a30, #ff912f30)',
                        }}
                        aria-hidden="true"
                    />

                    {/* ── Categories Flex Layout (Compact & Centered with tighter gaps) ── */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-5">
                        {topCategoriesResponse.categories.slice(0, 15).map((category, i) => (
                            <Link
                                key={i}
                                href={`/${category.url}`}
                                className="group flex flex-col items-center justify-center w-full max-w-[140px] sm:max-w-[150px] md:max-w-[160px] lg:max-w-[180px] aspect-[0.85/1] p-4 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#8bc94a] transition-all duration-500 no-underline text-center"
                            >
                                {/* Category Image - Integrated Primary Color for Fallback */}
                                <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
                                    {category.category_image ? (
                                        <Image
                                            src={getBaseImageUrl(companyDomain, category.category_image, '')}
                                            alt={category.name}
                                            width={48}
                                            height={48}
                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#8bc94a] font-bold text-lg transition-transform duration-500 group-hover:scale-110">
                                            {category.name?.[0]}
                                        </div>
                                    )}
                                </div>

                                {/* Category Name - Integrated Secondary Color for Hover */}
                                <span className="oswald text-[13px] font-bold text-[#011430] group-hover:text-[#ff912f] transition-colors duration-300 uppercase tracking-wider leading-tight px-1">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>


                </div>
            </section>
        );
    }
    return null;
};



export default HomeCategories;
