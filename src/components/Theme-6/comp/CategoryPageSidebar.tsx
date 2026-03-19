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

const CategoryPageSidebar = async ({ categories, cat_slug, slug_type, parentCategory }: Props) => {
    return (
        <div className="">
            <h4 className="cat-title mb-3">
                {/* To match image text exactly, you can change this to just "Suggested Categories" */}
                {parentCategory
                    ? `Explore Related ${parentCategory} Coupon Categories`
                    : 'Suggested Categories'}
            </h4>
            
            {/* Dashed Separator */}
            <div className="cat-divider my-3"></div>

            {/* Scrollable List */}
            <div className="category-scroll-container">
                <div className="d-grid gap-2">
                    {categories?.map((category, i) => (
                        <div key={i} className="suggested-category d-flex justify-content-between align-items-center p-2 rounded-3">
                            <Link
                                href={`/${category.url}`}
                                className="d-flex align-items-center gap-3 text-decoration-none flex-grow-1"
                            >
                                <span className="custom-bullet"></span>
                                <span className="category-name">{category?.name}</span>
                            </Link>
                            <span className="text-muted small">{category?.total_offers}</span>
                        </div>
                    ))}
                </div>
            </div>

           
            <div className="btn-area mt-4">
                <Link href={`/${cat_slug}`} className="d-flex align-items-center gap-2">
                    <span className="siteButton">See All</span>
                </Link>
            </div>
        </div>
    )
}

export default CategoryPageSidebar