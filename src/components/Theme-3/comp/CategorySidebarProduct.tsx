import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
    categories: CategoryData[];
    pageSlug: string; // this is the current page slug
    categoryName?: string;
}
const CategorySidebarProduct = async ({ categories, pageSlug, categoryName }: Props) => {
    return (
        <div className="single-bar">
            <h4 className="n17-color mb-4 mb-md-6">
                {categoryName
                    ? `Explore Related ${categoryName} Coupon Categories`
                    : `Suggested Categories`}
            </h4>
            <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>

            {/* ✅ Scrollable fixed-height container */}
            <div className="d-grid gap-3 gap-md-5 category-scroll">
                {categories?.map((category, i) => {
                    if (i <= 9) {
                        return (
                            <div key={i} className="suggested-category d-flex justify-content-between">
                                <Link
                                    href={`/${pageSlug}/${category.url}`}  // ✅ updated URL
                                    className="d-center ms-9 justify-content-between"
                                >
                                    <span className="custom-bullet"></span>
                                    <span className="title-area">{category?.name}</span>
                                </Link>
                                <span className="title-area text-end">{category?.total_offers}</span>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default CategorySidebarProduct;
