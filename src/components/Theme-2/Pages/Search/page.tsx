import React from 'react'
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData, apiGetAllKeywords, apiMostSearch, apiSearchResult } from '@/apis/user';
import Link from 'next/link';
import TagsSidebar from '../../comp/TagsSidebar';
import HorizontalBannerSlider from '../../comp/HorizontalBannerSlider';
import StoreCardTwo from '../../comp/StoreCardTwo';
import CategoryCard from '../../comp/CategoryCard';

interface Props {
    searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
    const queryParams: any = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
    const [searchResult, most_search, all_tags] = await Promise.all([
        apiSearchResult(queryParams.query, c_data?.unique_id).then(res => res.data),
        apiMostSearch(c_data?.unique_id).then(res => res.data),
        apiGetAllKeywords(c_data?.unique_id).then(res => res.data),
    ]);

    return (
        <>
            <div className="breadcrumb-section">
                <div className="breadcrumb-text">
                    <div className="container">
                        <div className="row align-items-center">
                            {/* Left (Breadcrumb text) */}
                            <div className="col-md-12 col-sm-12 col-lg-12">
                                <div className="breadcrumb-text padTB50">
                                    <h1 className='page-heading'>Showing Results for {queryParams.query}</h1>
                                    <ul className="breadcrumb-list">
                                        <li><Link href="/" className='text-capitalize'>Home</Link></li>
                                        <li><span className="text-capitalize">Search</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section bg pb-5">
                <div className="container">
                    <HorizontalBannerSlider companyId={c_data.unique_id} slug_type={c_data.slug_type} mer_slug={c_data.store_slug} domain={companyDomain.domain} />
                    <div className="row g-3">
                        <div className="col-lg-3 gap-3 d-flex flex-column">
                            {most_search?.length > 0 && (
                                <TagsSidebar heading='Most Searched Keywords' tags={most_search} />
                            )}
                            {all_tags?.length > 0 && (
                                <TagsSidebar heading='Popular Tags' tags={all_tags} />
                            )}
                        </div>
                        <div className="col-lg-9 pb-2 merchant-main-page box-border">
                            {searchResult?.merchants?.length > 0 && (
                                <>
                                    <div className="section-title-center text-left p-4">
                                        <h2 className="title pl-0 n15-color">&ldquo;{queryParams.query}&rdquo; in Stores</h2>
                                    </div>
                                    <div className='custom-search-result px-3 py-3 box-border'>
                                        <div className="row d-flex flex-wrap gy-2 gy-md-3 gx-2 gx-md-4 box-border">
                                            {searchResult?.merchants?.map((merchant, i) => {
                                                return (
                                                    <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 box-border">
                                                        <StoreCardTwo merchant={merchant} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}
                            {searchResult?.categories?.length > 0 && (
                                <>
                                    <div className="section-title-center text-left p-4">
                                        <h2 className="title pl-0 n15-color">&ldquo;{queryParams.query}&rdquo; in Categories</h2>
                                    </div>
                                    <div className='custom-search-result px-3 py-3 box-border'>
                                        <div className="row d-flex flex-wrap gy-2 gy-md-3 gx-2 gx-md-4 box-border">
                                            {searchResult?.categories?.map((cat, i) => {
                                                return (
                                                    <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 box-border">
                                                        <CategoryCard category={cat} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
