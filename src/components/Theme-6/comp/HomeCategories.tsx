import React from 'react'
import Link from 'next/link';
import { apiGetTopCategories } from '@/apis/page_optimization';
import { discardHTMLTags, splitHeading } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import TopCategories from './TopCategories';

interface Props {
    companyId: string;
    slug_type: string;
    cat_slug: string;
}

const HomeCategories = async ({ companyId, cat_slug, slug_type }: Props) => {
    const response = (await apiGetTopCategories(companyId));
    const topCategoriesResponse = response.data;
    const [firstHalf, secondHalf] = splitHeading(response?.data?.top_category_widget?.widget_heading);

    const content = response?.data?.top_category_widget?.widget_text;

    if (topCategoriesResponse?.categories?.length > 0) {
        return (
            <section className="cat-set-section" style={{ padding: "5% 8%" }}>
                <div className="container">
                    <div className="row section-head trv-head-title-wrap d-flex align-items-center mb-5">
                        {/* Title Section */}
                        <div className="col-9 col-lg-10 mb-3">
                            <h2 className="trv-head-title">
                                <span className="site-text-yellow">
                                    {firstHalf ? firstHalf : `Top`}
                                </span>{" "}
                                {secondHalf ? secondHalf : `Categories`}
                            </h2>
                        </div>

                        {/* View All Link Section */}
                        <div className="col-3 col-lg-2 text-end mb-3">
                            <Link
                                href={cat_slug}
                                className="d-flex align-items-center gap-1 justify-content-end siteButton-link"
                            >
                                <span className="siteButton">View All</span>
                            </Link>
                        </div>

                        {/* Description Section */}
                        <div className="col-12 trv-head-discription">
                            <p>{discardHTMLTags(content)}</p>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center justify-content-sm-start">
                        {topCategoriesResponse?.categories?.slice(0, 8).map((category, i) => (
                            <div key={i} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                                <TopCategories category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </section >
        )
    }
    return null; // Ensure the component returns null if no categories exist
}

export default HomeCategories