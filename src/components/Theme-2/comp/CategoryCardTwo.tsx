import { getBaseImageUrl, getRandomCategorySeoTitle } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { CategoryData, SearchCategories } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryCardTwo = async ({ category }: { category: CategoryData | SearchCategories }) => {
    const domain = (await cookieService.get("domain")).domain;
    return (
        <Link href={category?.url} className="unique-tile-link">
            <div className="unique-tile-card h-100">
                {/* Image */}
                <div className="unique-tile-img-wrapper">
                    <Image
                        src={getBaseImageUrl(domain, category?.category_image, "")}
                        alt={getRandomCategorySeoTitle(category?.name)}
                        height={140}
                        width={140}
                        className="unique-tile-img"
                    />
                </div>

                {/* Title */}
                <h3 className="unique-tile-title">
                    {getRandomCategorySeoTitle(category?.name)}
                </h3>
            </div>
        </Link>
    )
}

export default CategoryCardTwo
