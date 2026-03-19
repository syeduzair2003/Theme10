import React from 'react'
import cookieService from "@/services/CookiesService";
import { apiCategoryData, apiCompanyUpdatedData } from '@/apis/user';
import AllCategories from '@theme1/comp/AllCategories';
import { CategoryData } from '@/services/dataTypes';

const CategoryPageComponent = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain)
    const companyData = response.data;
    const categories = await apiCategoryData(companyData.unique_id);
    const mer_slug_type = companyData?.slug_type;
    const cat_slug = companyData?.category_slug;

    return (
        <section className='arrival-product padding-y-120 section-bg position-relative z-index-1'>
            <div className="container container-two">
                <div className="section-heading">
                    <h3 className="section-heading__title">Popular Categories</h3>
                </div>
                <div className="row gy-4 list-grid-wrapper">
                    {categories.data?.map((item: CategoryData, i: number) => {
                        return (
                            <AllCategories key={i} category={item} slug_type={mer_slug_type} cat_slug={cat_slug} />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default CategoryPageComponent
