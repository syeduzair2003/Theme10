import { getCategoryHref, getRandomStoreSeoTitle } from '@/constants/hooks';
import { CategoryData, SearchCategories } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props {
    category: CategoryData | SearchCategories;
    cat_slug: string;
    slug_type: string;
    preloadedImage: string | null;
}
const TopCategoryCard = ({ category, cat_slug, slug_type, preloadedImage }: Props) => {
    return (
        <div  className="top-category-card d-flex flex-column align-items-center justify-content-center text-center w-100 h-100 p-1 rounded-4">
            <Link
                href={getCategoryHref(category, cat_slug, slug_type)}
                className='d-block w-100'
            >
                <div className="top-category-icon mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle">
                    {preloadedImage ? (
                        <Image
                            src={preloadedImage}
                            alt={getRandomStoreSeoTitle(category?.name)}
                            width={60}
                            height={60}
                            className="img-fluid"
                        />
                    ) : (
                        <Image
                            src="/themes/Theme_1/images/placeholder.svg"
                            alt="Category"
                            width={60}
                            height={60}
                            className="img-fluid"
                        />
                    )}
                </div>
                <div className="category-info text-center py-1 ">
                    <h6 className="mb-0 text-dark">{category?.name}</h6>
                </div>
                {/* Hover overlay */}
                {/*<div className="top-category-overlay d-flex align-items-center justify-content-center">
                    <span className="f5-color rounded-2 s1-4th-bg-color cus-border border b-sixth px-1 px-md-2 py-1 d-flex gap-2 gap-md-3"style={{ background: 'linear-gradient(90deg, #0284c7 0%, #0369a1 100%' }}>
                         <span className="f11-color" style={{ fontSize: '12px', background: 'linear-gradient(90deg, #0284c7 0%, #0369a1 100%' }}>
                            {/* ({category?.total_offers || "123"})  View
                        </span> 
                    </span>
                </div>*/}
            </Link>
        </div>
    )
}

export default TopCategoryCard
