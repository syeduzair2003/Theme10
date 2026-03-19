import React from 'react'
import Link from 'next/link';
import TopCategories from './TopCategories';
import { apiGetTopCategories } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    companyId: string;
    slug_type: string;
    cat_slug: string;
}

const HomeCategories = async ({ companyId, cat_slug, slug_type }: Props) => {
    const response = (await apiGetTopCategories(companyId));
    const topCategoriesResponse = response.data;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.top_category_widget?.widget_heading);

    const content = response?.data?.top_category_widget?.widget_text
    if (topCategoriesResponse?.categories?.length > 0) {
        return (
            <section className="merchant-carousel-section" style={{ padding: "5% 8%" }}>
                <div className="container">
                    <div className="row section-header d-flex align-items-center">
                        <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10 section-title-center no-before mb-3">
                            <h2 className="top-stores-heading animate-heading">
                                <span className="top-text">{firstHalf ? firstHalf : `Top`} </span>
                                <span className="stores-text"> {secondHalf ? secondHalf : `Categories`}</span>
                            </h2>
                        </div>
                        <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                            <Link href={cat_slug} className="d-center gap-1" target='_blank'>
                                <span className="p2-color fw-bold">View All</span>
                                <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                            </Link>
                        </div>
                        <div className='col-lg-12 col-xl-12'>
                            <p>
                                {content}
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-sm-start">
                        {topCategoriesResponse?.categories?.length > 0 && topCategoriesResponse?.categories?.map((category, i) => {
                            if (i > 7) return null;
                            return (
                                <div key={i} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                                    <TopCategories category={category} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default HomeCategories
