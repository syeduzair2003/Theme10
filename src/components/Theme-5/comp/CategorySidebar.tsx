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
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
                {parentCategory
                    ? `Explore Related ${parentCategory} Coupon Categories`
                    : 'Popular Coupon Categories'}
            </h4>
            <div className="space-y-3">
                {categories?.slice(0, 10).map((category, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <Link
                            href={`/${category.url}`}
                            className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                            <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                            <span className="text-sm font-medium">{category?.name}</span>
                        </Link>
                        <span className="text-sm text-gray-500 font-medium">{category?.total_offers}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <Link href={`/${cat_slug}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-900 font-medium text-sm">
                    See All
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default CategorySidebar