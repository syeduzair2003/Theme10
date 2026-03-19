import { CategoryData } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
    categories: CategoryData[];
    pageSlug: string;
    categoryName?: string;
}

const CategorySidebar = ({ categories, pageSlug, categoryName }: Props) => {
    return (
        <div >
            <h4 className="n17-color mb-4 mb-md-6">
                {categoryName
                    ? `Explore Related ${categoryName} Coupon Categories`
                    : `Suggested Categories`}
            </h4>

            {/* The dashed separator from the image */}
            <div className="cat-sidebar-divider"></div>

            <div className="cat-sidebar-scroll-area">
                <ul className="cat-sidebar-list">
                    {categories?.map((category, i) => (
                        <li key={i} className="cat-sidebar-item">
                            <Link
                                href={`/${pageSlug}/${category.url}`}
                                className="cat-sidebar-link"
                            >
                                {/* This span now contains the text AND the bullet (via CSS) */}
                                <span className="cat-sidebar-name">
                                    {category?.name}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategorySidebar;