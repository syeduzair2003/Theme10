import { CategoryData } from '@/services/dataTypes'
import React from 'react'
import Link from 'next/link'
import { getCategoryHref } from '@/constants/hooks'
import Image from "next/image";

interface Props {
    category: CategoryData;
    slug_type: string;
    cat_slug: string;
}
const HomeCategoriesRender = ({ category, cat_slug, slug_type }: Props) => {
    return (
        <div className="category-grid gap-2">
            <div className="category-inner">
                <div className="category-front">
                    <div className="category-header mb-2">
                        <Image src={category?.category_image ?? ''} height={120} width={120} alt={category.name} className='category-image'/>
                    </div>
                    <div id="category-detail-3" className='mb-3'>
                        <div className="category-price text-center">
                            <h4 className="category-details-title">{category.name}</h4>
                        </div>
                    </div>
                </div>

                <div className="category-back">
                    <h4 className='text-center'>{category.name}</h4>
                    <Link className="btn view-btn" href={getCategoryHref<any>(category, cat_slug, slug_type)}>
                        View Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeCategoriesRender
