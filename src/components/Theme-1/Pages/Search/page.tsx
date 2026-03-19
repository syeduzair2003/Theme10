import { apiCompanyUpdatedData, apiSearchResult } from '@/apis/user';
import AllTagsSidebar from '@theme1/comp/AllTagsSidebar';
import BannerSlider from '@theme1/comp/BannerSlider'
import MostSearchSidebar from '@theme1/comp/MostSearchSidebar';
import SearchPage from '@theme1/comp/SearchPage';
import cookieService from '@/services/CookiesService';
import React from 'react'
import { CompanyData } from '@/services/dataTypes';
interface Props {
    searchParams: Promise<{ [key: string]: string }>;
    c_data: CompanyData;
}

const page = async ({ searchParams }: Props) => {
    const queryParams: any = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
    const searchResult = await apiSearchResult(queryParams.query, c_data?.unique_id)

    return (
        <>
            <BannerSlider domain={companyDomain.domain} companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type}/>
            <section className={`all-product custom-bg-color-one padding-y-60 `}>
                <div className="container container-two">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3" style={{ marginTop: 62 }}>
                            <MostSearchSidebar company_id={c_data?.unique_id} />
                            <AllTagsSidebar company_id={c_data?.unique_id}/>
                        </div>
                        <div className="col-xl-9 col-lg-8">
                            <div className="tab-content" id="pills-tabContent">
                                <SearchPage
                                    slug_type={c_data?.slug_type}
                                    mer_slug={c_data?.store_slug}
                                    cat_slug={c_data?.category_slug}
                                    searchData={searchResult.data}
                                    queryParams={queryParams.query}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
