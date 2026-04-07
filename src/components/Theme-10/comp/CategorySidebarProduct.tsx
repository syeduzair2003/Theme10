"use client";

import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
    categories: CategoryData[];
    pageSlug: string;
    categoryName?: string;
}

const CategorySidebarProduct = ({ categories, pageSlug, categoryName }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Initial 5 categories then show more par baki
    const displayedCategories = isExpanded ? categories?.slice(0, 10) : categories?.slice(0, 5);

    return (
        <div className="category-sidebar bg-[#FDFBE7]/50 p-6 rounded-[2rem] border border-[#EADDCA]">
            {/* Heading with Maroon Accent */}
            <h4 className="text-base font-black text-[#1A1A1A] mb-6 flex items-center gap-3 uppercase tracking-wider">
                <div className="w-1 h-6 bg-[#800000] rounded-full shadow-sm shadow-[#800000]/20"></div>
                {categoryName ? `Related to ${categoryName}` : `Suggested Hubs`}
            </h4>

            {/* List Container */}
            <div className="grid gap-2">
                {displayedCategories?.map((category, i) => (
                    <Link
                        key={i}
                        href={`/${pageSlug}/${category.url}`}
                        className="group no-underline flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 border border-transparent hover:border-[#800000]/20 hover:bg-white hover:shadow-md active:scale-[0.98]"
                    >
                        {/* Left Side: Dot and Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#EADDCA] group-hover:bg-[#800000] group-hover:scale-125 transition-all duration-300"></div>
                            <span className="text-sm font-bold text-[#4A4A4A] group-hover:text-[#1A1A1A] transition-colors">
                                {category?.name}
                            </span>
                        </div>
                        
                    </Link>
                ))}
            </div>

            {/* --- Show More / Show Less Button (Clean Version) --- */}
            {categories?.length > 5 && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full mt-4 py-3 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#800000] border-t border-[#EADDCA] hover:text-[#1A1A1A] transition-colors duration-300"
                >
                    {isExpanded ? (
                        <>
                            Show Less <ChevronUp size={14} />
                        </>
                    ) : (
                        <>
                            Show More <ChevronDown size={14} />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}

export default CategorySidebarProduct;