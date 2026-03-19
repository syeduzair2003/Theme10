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
            <div className="v-line w-100 position-relative my-3"></div>
            <div className="d-grid gap-2 category-scroll">
                {categories?.map((category, i) => (
                    <div key={i} className="suggested-category d-flex justify-content-between align-items-center p-2 rounded-3 hover-card">
                        <Link
                            href={`/${category.url}`}
                            className="d-flex align-items-center gap-2 text-decoration-none flex-grow-1"
                        >
                            <span className="custom-bullet"></span>
                            <span className="title-area text-dark">{category?.name}</span>
                        </Link>

                        <span className="text-muted small">{category?.total_offers}</span>
                    </div>
                ))}
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
