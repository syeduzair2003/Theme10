import { faAngleRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes'
import Link from 'next/link';
import React from 'react'

interface Props {
    categories: CategoryData[];
    pageSlug?: string;
    parentCategory?: string;
}

const CategorySidebar = async ({ categories, pageSlug = "category", parentCategory }: Props) => {
    return (
        <div className="relative group/sidebar">
            {/* Elegant Background Layer */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#8bc94a20] to-[#ff912f10] rounded-[2.5rem] blur opacity-50 group-hover/sidebar:opacity-100 transition duration-1000 -z-10" />

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/50 overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8bc94a08] rounded-full blur-3xl -mr-16 -mt-16" />

                {/* Header section with refined typography */}
                <h4 className="text-xl font-black text-[#222e48] mb-8 pb-4 border-b border-gray-50 flex items-center justify-between">
                    {parentCategory
                        ? `Related Categories`
                        : 'Explore Categories'}
                    <Link href={`/category`} className="text-[10px] uppercase tracking-widest text-[#8bc94a] hover:opacity-70 transition-opacity">See All</Link>
                </h4>

                {/* Categories List */}
                <div className="flex flex-col gap-1">
                    {categories?.slice(0, 10).map((category, i) => (
                        <Link
                            key={i}
                            href={`/${pageSlug}/${category.url.replace(/^category\//, '')}`}
                            className="group flex items-center justify-between py-3.5 px-2 rounded-xl hover:bg-white hover:shadow-[0_4px_15px_rgba(0,0,0,0.02)] transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Hover Indicator Bar */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-[#8bc94a] group-hover:h-3 transition-all duration-300 rounded-full" />

                            <div className="flex items-center gap-4 pl-0 group-hover:pl-2 transition-all duration-300">
                                {/* Minimalist Bullet */}
                                <div className="w-1.5 h-1.5 rounded-full bg-[#222e4815] group-hover:bg-[#ff912f] transition-colors duration-300" />

                                <span className="text-sm font-bold text-[#222e4870] group-hover:text-[#222e48] transition-colors duration-300">
                                    {category?.name}
                                </span>
                            </div>

                            {/* Offer Count - Elegant minimal design */}
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] font-black text-[#ff912f] opacity-40 group-hover:opacity-100 transition-opacity">
                                    {category?.total_offers}
                                </span>
                                <FontAwesomeIcon
                                    icon={faAngleRight}
                                    className="text-[10px] text-[#222e4810] group-hover:text-[#8bc94a] group-hover:translate-x-0.5 transition-all duration-300"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategorySidebar