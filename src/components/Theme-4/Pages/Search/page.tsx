import { apiCompanyUpdatedData, apiSearchResult } from '@/apis/user';
import React from 'react'
import { CompanyData } from '@/services/dataTypes';
import cookieService from '@/services/CookiesService';
import SearchPage from '../../comp/SearchPage';
import AllTagsSidebar from '../../comp/AllTagsSidebar';

interface Props {
    searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
    const queryParams: any = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain))?.data;
    const searchResult = await apiSearchResult(queryParams.query, c_data?.unique_id);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 max-w-[1200px] mx-auto px-4 md:py-10">
                <div className="md:block md:w-72 shrink-0">
                    <AllTagsSidebar company_id={c_data?.unique_id} />
                </div>

                <SearchPage
                    slug_type={c_data?.slug_type}
                    mer_slug={c_data?.store_slug}
                    cat_slug={c_data?.category_slug}
                    searchData={searchResult?.data}
                    query={queryParams?.query}
                />
            </div>

        </>

    )
}

export default page
