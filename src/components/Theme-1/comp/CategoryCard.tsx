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
const CategoryCard = ({ category, cat_slug, slug_type, preloadedImage }: Props) => {
    return (
         <div className="col-lg-3">
            <Link href={getCategoryHref(category, cat_slug, slug_type)} className='w-100'>
                <div className="service-item-custom service-item-custom-card-hover hover-bg-main d-flex justify-content-center align-items-center">
                    <Image
                        src="/themes/Theme_1/images/gradients/service-hover-bg.png"
                        alt="gradient"
                        className="hover-bg white-version"
                        height={100}
                        width={100}
                    />
                    <div className="align-items-center justify-content-center d-flex flex-column">
                        {preloadedImage &&
                            <span className="custom-cat-img">
                                <Image src={preloadedImage} alt={getRandomStoreSeoTitle(category?.name)}
                                    height={80}
                                    width={80}
                                />
                            </span>
                        }
                        <h5 className="service-item__title custom-heading-animation my-3 text-center f-14">
                            {category?.name}
                        </h5>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default CategoryCard
