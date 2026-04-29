import { apiCategoryWithSub } from '@/apis/user';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
    company_id: string;
}

const CatPage = async ({ company_id }: Props) => {
    const categoryData = (await apiCategoryWithSub(company_id)).data;

    if (!categoryData || categoryData?.length === 0) {
        return (
            <section className="py-24 flex justify-center items-center min-h-[50vh] bg-white">
                <div className="text-center p-12 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100 max-w-md w-full relative overflow-hidden group">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center border border-gray-100 transition-colors duration-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Categories Found</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">
                        It looks like there are no categories available right now. Please check back later.
                    </p>
                </div>
            </section>
        );
    }

    // Sort parent categories by name
    categoryData?.sort((a, b) =>
        a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
    );

    const sortChildren = (children: CategoryChild[]) => {
        if (!children) return [];
        return [...children].sort((a, b) => {
            const nameA = typeof a === "string" ? a : a?.name;
            const nameB = typeof b === "string" ? b : b?.name;
            return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
        });
    };

    const renderChildren = (children: CategoryChild[], depth = 0) => {
        if (!children || children.length === 0) return null;

        // Sort before rendering
        const sortedChildren = sortChildren(children);

        return (
            <ul className={`flex flex-col gap-1.5 ${depth > 0 ? "ml-4 mt-1.5 pl-4 border-l border-gray-100" : "mt-1"}`}>
                {sortedChildren?.map((child, idx) => {
                    if (typeof child === 'string') {
                        return (
                            <li key={idx} className="group/link flex items-center text-[14px] text-gray-500 hover:text-[#ff912f] transition-all duration-300 py-1">
                                <span className="relative flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                                    <span className="absolute w-1 h-1 rounded-full bg-gray-300 transition-all duration-200 group-hover/link:scale-0"></span>
                                    <svg className="absolute w-3.5 h-3.5 text-[#ff912f] opacity-0 scale-50 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                                <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">{child}</span>
                            </li>
                        );
                    }

                    return (
                        <li key={idx} className="flex flex-col">
                            <Link href={child?.url || '#'} className="group/link flex items-center text-[14px] text-gray-500 hover:text-[#ff912f] transition-all duration-300 py-1">
                                <span className="relative flex items-center justify-center w-4 h-4 mr-2 shrink-0">
                                    <span className="absolute w-1 h-1 rounded-full bg-gray-300 transition-all duration-200 group-hover/link:scale-0"></span>
                                    <svg className="absolute w-3.5 h-3.5 text-[#ff912f] opacity-0 scale-50 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                                <span className="group-hover/link:translate-x-0.5 transition-transform duration-300">{child?.name}</span>
                            </Link>
                            {/* If children exist, render them sorted too */}
                            {(child?.child?.length ?? 0) > 0 && renderChildren(child.child!, depth + 1)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <section className="py-12 lg:py-16 bg-gray-50/50 min-h-screen">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
                    {categoryData?.map((cat, idx) => {
                        const firstLetter = cat?.category?.name?.charAt(0).toUpperCase() || '?';

                        return (
                            <div className="break-inside-avoid" key={idx}>
                                <div className="relative group bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] border border-gray-100 hover:border-[#8bc94a]/30 pt-7 p-6 sm:px-7 sm:pb-7 transition-all duration-400 overflow-hidden transform hover:-translate-y-1">
                                    {/* Persistent Top Line that turns Green on Hover */}
                                    <div className="absolute top-0 left-0 w-full h-[4px] bg-gray-100 group-hover:bg-[#8bc94a] transition-colors duration-400 ease-in-out"></div>

                                    <div className="relative z-10">
                                        <Link href={cat?.category?.url || '#'}>
                                            <div className="flex items-center gap-4 mb-5 pb-4 border-b border-gray-50 group/title cursor-pointer">
                                                <div className="w-12 h-12 shrink-0 rounded-xl bg-gray-50 text-gray-500 border border-gray-100/80 group-hover/title:bg-[#8bc94a]/10 group-hover/title:text-[#8bc94a] group-hover/title:border-[#8bc94a]/20 transition-all duration-300 flex items-center justify-center">
                                                    <span className="text-xl font-bold">{firstLetter}</span>
                                                </div>
                                                <h4 className="text-[17px] font-bold text-gray-800 capitalize group-hover/title:text-[#8bc94a] transition-colors duration-300 leading-tight">
                                                    {cat?.category?.name}
                                                </h4>
                                            </div>
                                        </Link>

                                        <div className="pl-1">
                                            {renderChildren(cat?.category?.child ?? [])}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CatPage;
