import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
    categories: CategoryData[];
    pageSlug: string;
    categoryName?: string;
}

const CategorySidebarProduct = async ({ categories, pageSlug, categoryName }: Props) => {
    return (
        <div className="w-full">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.3)]"></div>
                <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none">
                    {categoryName ? `Related to ${categoryName}` : `Suggested Category`}
                </h4>
            </div>

            <div className="flex flex-col gap-1.5">
                {categories?.slice(0, 12).map((category, i) => {
                    const isActive = categoryName?.toLowerCase() === category.name.toLowerCase();

                    return (
                        <Link
                            key={i}
                            href={`/${pageSlug}/${category.url}`}
                            className={`group no-underline flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 border ${
                                isActive 
                                ? 'bg-blue-50 border-blue-100 shadow-sm' 
                                : 'bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100'
                            }`}
                        >
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-blue-600 scale-125' 
                                    : 'bg-slate-200 group-hover:bg-blue-400 group-hover:scale-110'
                                }`}></div>
                                
                                <span className={`text-sm font-bold truncate transition-colors duration-300 ${
                                    isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900'
                                }`}>
                                    {category?.name}
                                </span>
                            </div>

                            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-[10px] font-black transition-all duration-300 ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white'
                            }`}>
                                {category?.total_offers}
                                {isActive && <FontAwesomeIcon icon={faArrowRight} className="text-[8px]" />}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {categories?.length > 12 && (
                <div className="mt-4 pt-4 border-t border-slate-50">
                    <Link 
                        href="/all-categories" 
                        className="text-xs font-bold text-blue-600 hover:text-slate-900 transition-colors no-underline flex items-center gap-1"
                    >
                        View all categories
                        <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default CategorySidebarProduct;