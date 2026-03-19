import { apiCompanyUpdatedData, apiSearchResult } from '@/apis/user';
import React from 'react'
import { CompanyData } from '@/services/dataTypes';
import HorizontalBannerSlider from '../../comp/HorizontalBannerSlider';
import MostSearchSidebar from '../../comp/MostSearchSidebar';
import AllTagsSidebar from '../../comp/AllTagsSidebar';
import SearchPage from '../../comp/SearchPage';
import cookieService from '@/services/CookiesService';

interface Props {
    searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
    const queryParams: any = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
    const searchResult = await apiSearchResult(queryParams.query, c_data?.unique_id);

    return (
        <>
            <div className="container-fluid px-15 box-border" style={{ padding: "20px", borderRadius: "8px", height: 'fit-content' }}>
                <HorizontalBannerSlider companyId={c_data.unique_id} slug_type={c_data.slug_type} mer_slug={c_data.store_slug} domain={companyDomain.domain}/>
                <div className="row">
                    <div className="col-lg-3 d-flex flex-column gap-5 gap-md-8">
                        <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                            <MostSearchSidebar company_id={c_data?.unique_id} />
                            <AllTagsSidebar company_id={c_data?.unique_id} />
                        </div>
                    </div>
                    <div className="col-lg-9 pb-2 merchant-main-page box-border">
                        <section className="product-shop-full-grid box-border">
                            <div className="container box-border">
                                <div className="row box-border">
                                    <SearchPage
                                        slug_type={c_data.slug_type}
                                        mer_slug={c_data.store_slug}
                                        cat_slug={c_data.category_slug}
                                        searchData={searchResult.data}
                                        query={queryParams.query} />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
