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
        <div className="category-sidebar">
            <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                {categoryName ? `Related to ${categoryName}` : `Suggested Hubs`}
            </h4>

            <div className="d-grid gap-2">
                {categories?.slice(0, 10).map((category, i) => (
                    <Link
                        key={i}
                        href={`/${pageSlug}/${category.url}`}
                        className="group no-underline d-flex align-items-center justify-content-between p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                    >
                        <div className="d-flex align-items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors"></div>
                            <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">
                                {category?.name}
                            </span>
                        </div>
                        <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-md group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {category?.total_offers}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CategorySidebarProduct;