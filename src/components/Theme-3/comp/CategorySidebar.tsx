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
        <div className="single-bar">
            <h4 className="n17-color mb-4 mb-md-6">
                {parentCategory
                    ? `Explore Related ${parentCategory} Coupon Categories`
                    : 'Popular Coupon Categories'}
            </h4>            
            <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
            <div className="d-grid gap-3 gap-md-5">
                {categories?.map((category, i) => {
                    if (i <= 9) {
                        return (
                            <div key={i} className="suggested-category d-flex justify-content-between">
                                <Link
                                    href={`/${category.url}`}
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
            <div className="btn-area mt-4 mt-md-6">
                <Link href={`/${cat_slug}`} className="d-center justify-content-start gap-2 gap-md-3">
                    <span className="p2-color fw-bold">See All</span>
                    <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                </Link>
            </div>
        </div>
    )
}

export default CategorySidebar
