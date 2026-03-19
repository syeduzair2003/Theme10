import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoryCard from './CategoryCard'
import { getBaseImageUrl, splitHeading } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
// import Image from '@/components/shared/Image';
import { apiGetTopCategories } from '@/apis/page_optimization'
import ScrollButtonLeft from './ScrollButtonLeft'
import ScrollButtonRight from './ScrollButtonRight'
import TopCategoryCard from './TopCategoryCard'

interface Props {
    companyId: string;
    slug_type: string;
    cat_slug: string;
}
const TopCategoriesHome = async ({ companyId, slug_type, cat_slug }: Props) => {
    const categories = (await apiGetTopCategories(companyId)).data;
    const categoriesToShow = categories?.categories?.length >= 8 ? 8 : categories?.categories?.length >= 4 ? 4 : categories?.categories?.length;
    const domain = (await cookieService.get("domain")).domain;
    const [firstHalf, secondHalf] = splitHeading(categories?.top_category_widget?.widget_heading);
    const cleanedText = categories?.top_category_widget?.widget_heading?.trim();
    const wordCount = cleanedText?.split(/\s+/)?.filter(Boolean).length;
    if (categories?.categories?.length > 0) {
        return (
            <section className="padding-y-60 position-relative z-index-1 overflow-hidden">
                <div className="container">
                    <Image src="/themes/Theme_1/images/shapes/pattern.png" alt="pattern" className="bg-pattern"
                        width={1000} height={400}
                    />
                    <div className="section-heading style-left style-flex flx-between align-items-end gap-3 mb-2">
                        <div className="section-heading__inner w-lg">
                            <h2 className="section-heading__title">
                                {firstHalf ? firstHalf : "Our Top"} {secondHalf ? secondHalf : "Categories"}
                            </h2>
                        </div>
                        <Link href={`/${cat_slug}`} className="btn btn-main btn-lg pill">
                            View All
                        </Link>
                    </div>
                    <div className="row gy-4 list-grid-wrapper ">
                        <div className='col-lg-12 col-xl-12'>
                            <p className="text-dark f-14">
                                {categories?.top_category_widget?.widget_text ? categories?.top_category_widget?.widget_text : "Explore our most popular categories to find the best deals, coupons, and discounts tailored to your shopping interests."}
                            </p>
                        </div>
                        <div>
                            <div className="Top-Category d-flex flex-wrap justify-content-center">
                                {categories?.categories?.slice(0, categoriesToShow).map((category, i) => (
                                    <div key={i} className="top-category-home">
                                        <TopCategoryCard
                                            category={category}
                                            cat_slug={cat_slug}
                                            slug_type={slug_type}
                                            preloadedImage={getBaseImageUrl(domain, category.category_image, "")}
                                        />
                                    </div>
                                ))}
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default TopCategoriesHome
