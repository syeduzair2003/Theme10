import { getCategoryHref } from '@/constants/hooks';
import { CategoryData, SearchCategories } from '@/services/dataTypes'
import Link from 'next/link'
import React from 'react'

interface Props {
    category: CategoryData | SearchCategories;
    cat_slug: string;
    slug_type: string;
}

const CategoryCard = ({ category, cat_slug, slug_type }: Props) => {
    return (
        <Link
            href={getCategoryHref(category, cat_slug, slug_type)}
            className="category-pill-link"
        >
            <div className="category-pill-item">
                <span className="category-pill-text">
                    {category?.name}
                </span>
            </div>
        </Link>
    )
}

export default CategoryCard