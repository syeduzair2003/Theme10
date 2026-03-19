import { getBaseImageUrl } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import { CategoryData, SearchCategories } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryCard = async ({ category }: { category: CategoryData | SearchCategories }) => {
    const domain = (await cookieService.get("domain")).domain;
    return (
        <div className="unique-cat-col">
            <Link href={category?.url} className="unique-cat-img-link">
                <div className="card unique-cat-card rounded-3 d-center flex-column p-3">
                    {/* Image wrapper */}
                    <div className="unique-cat-img-wrapper">
                        <Image
                            src={getBaseImageUrl(domain, category?.category_image, "")}
                            width={70}
                            height={70}
                            alt={category?.name}
                            layout='responsive'
                            className="unique-cat-img"
                        />
                    </div>

                    {/* Text Section */}
                    <div className="unique-cat-text text-center">
                        <h4 className="unique-cat-name f-14">{category?.name}</h4>
                        <span className="unique-cat-offers">
                            {category?.total_offers ? (
                                <>
                                    {category?.total_offers} Offers Available
                                </>
                            ) : (
                                <></>
                            )}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CategoryCard
