import { apiGetTopCategories } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import React from 'react'
import CategoryCardTwo from './CategoryCardTwo';

interface Props {
    companyId: string;
}
const HomeCategorySection = async ({ companyId }: Props) => {
    const topCategoriesResponse = (await apiGetTopCategories(companyId)).data;
    const [firstHalf, secondHalf] = splitHeading(topCategoriesResponse?.top_category_widget?.widget_heading);
    const content = topCategoriesResponse?.top_category_widget?.widget_text
    const heading = topCategoriesResponse?.top_category_widget?.widget_heading ? topCategoriesResponse?.top_category_widget?.widget_heading : "Popular Categories"
    return (
        <div className="couponnav padTB60">
            <div className="container">
                <div className="row g-3">
                    <div className="col-md-12 col-sm-12 col-xs-12 marB30">
                        <div className="section-box">
                            <div className="row">
                                <div className="col-12 col-md-10 col-sm-9 col-xs-9">
                                    <div className="boxbg p-2 w-100">
                                        <h2 className='f-25'>{heading}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-3 col-xs-3">
                                    <div className="symbol">
                                        <Link href={`/category`}>
                                            <h5 className='f-13 m-0'>view all
                                                <i className="flaticon-external-link-symbol" style={{ height: "20px", width: "20px" }}></i>
                                            </h5>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 pt-2">
                                    <p>
                                        {content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {topCategoriesResponse?.categories?.map((category, i) => {
                        return (
                            <div
                                key={i}
                                className="col-md-12 col-sm-12 col-xs-12 col-lg-3 col-xl-3"
                            >
                                <CategoryCardTwo category={category} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HomeCategorySection
