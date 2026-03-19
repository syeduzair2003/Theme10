import { apiCompanyUpdatedData, apiSearchResult } from '@/apis/user';
import React from 'react'
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
        <div className="min-h-screen bg-slate-50">
            {/* Top Banner Area */}
            <div className="w-full px-4 md:px-8 py-6">
                <div className="max-w-[1440px] mx-auto rounded-3xl overflow-hidden shadow-sm border border-slate-200">
                    <HorizontalBannerSlider 
                        companyId={c_data.unique_id} 
                        slug_type={c_data.slug_type} 
                        mer_slug={c_data.store_slug} 
                        domain={companyDomain.domain}
                    />
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 pb-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Sidebar Section */}
                    <aside className="w-full lg:w-[300px] flex-shrink-0">
                        <div className="sticky top-6 flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <MostSearchSidebar company_id={c_data?.unique_id} />
                                <div className="my-6 h-px bg-slate-100 w-full" />
                                <AllTagsSidebar company_id={c_data?.unique_id} />
                            </div>
                        </div>
                    </aside>

                    {/* Results Section */}
                    <main className="flex-1">
                        <div className="bg-white min-h-[600px] rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
                            <SearchPage
                                slug_type={c_data.slug_type}
                                mer_slug={c_data.store_slug}
                                cat_slug={c_data.category_slug}
                                searchData={searchResult.data}
                                query={queryParams.query} 
                            />
                        </div>
                    </main>
                    
                </div>
            </div>
        </div>
    )
}

export default page