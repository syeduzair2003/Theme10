import { getCategoryHref } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes'
import Link from 'next/link';
import React from 'react'

interface Props {
    categories: CategoryData[];
    cat_slug: string;
    slug_type: string;
    parentCategory?: string;
}

const CategorySidebar = async ({ categories, cat_slug, slug_type, parentCategory }: Props) => {
    return (
        <div className="space-y-6">
            <h4 className="text-xl font-black text-slate-800 border-b border-slate-100 pb-4 leading-tight">
                {parentCategory ? `${parentCategory} Deals` : 'Popular Categories'}
            </h4>
            
            <div className="space-y-1">
                {categories?.slice(0, 10).map((category, i) => (
                    <Link
                        key={i}
                        href={`/${category.url}`}
                        className="no-underline group flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 transition-all duration-200"
                    >
                        <div className="flex items-center gap-3 overflow-hidden">
                            <span className="w-1.5 h-1.5 bg-slate-300 group-hover:bg-blue-600 rounded-full transition-colors flex-shrink-0"></span>
                            <span className="text-slate-600 group-hover:text-blue-700 font-medium truncate">
                                {category?.name}
                            </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {category?.total_offers}
                        </span>
                    </Link>
                ))}
            </div>

            <Link href={`/${cat_slug}`} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-50 text-blue-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all group">
                <span>View All Categories</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    )
}

export default CategorySidebar
