import { apiCompanyUpdatedData, apiSearchResult, apiMostSearch, apiGetAllKeywords } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import HorizontalBannerSlider from '../../comp/HorizontalBannerSlider';
import Link from 'next/link';
import SearchPage from '../../comp/SearchPage';

interface Props {
    searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
    const queryParams: any = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
    const searchResult = await apiSearchResult(queryParams.query, c_data?.unique_id);
    const most_search = (await apiMostSearch(c_data?.unique_id))?.data;
    const all_tags = (await apiGetAllKeywords(c_data?.unique_id))?.data;

    return (
        <div className="bg-slate-50/30 min-h-screen pb-20 pt-20 lg:pt-28">
            {/* Header: Banner & Context */}
            <div className="bg-white border-b border-slate-100 shadow-sm relative overflow-hidden">
                {/* Banner Section */}
                <div className="pt-4 sm:pt-8">
                    <HorizontalBannerSlider 
                        companyId={c_data?.unique_id} 
                        slug_type={c_data?.slug_type} 
                        mer_slug={c_data?.store_slug} 
                        domain={companyDomain.domain}
                    />
                </div>
                
                {/* Search Context / Breadcrumb Container */}
                <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
                    <div className="flex flex-col gap-2">
                        <nav className="flex items-center gap-2 text-[10px] sm:text-[11px] font-extrabold tracking-[0.2em] uppercase text-slate-400">
                            <Link href="/" className="hover:text-[#8bc94a] transition-colors duration-300">Home</Link>
                            <span className="w-1.5 h-1.5 bg-[#ff912f]/40 rounded-full"></span>
                            <span className="text-slate-500">Search Results</span>
                        </nav>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                            Results for <span className="text-[#ff912f]">&quot;{queryParams.query}&quot;</span>
                        </h1>
                    </div>
                </div>

                {/* Subtle Decorative Background Element */}
                <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#8bc94a05] to-transparent pointer-events-none -skew-x-12 transform translate-x-1/2" />
            </div>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-4 mt-8 sm:mt-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Sidebar: Frequently Searched (Left) */}
                    <aside className="lg:w-1/4 w-full">
                        <div className="bg-white border border-slate-100/80 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] sticky top-28 overflow-hidden relative group">
                            {/* Decorative background effects */}
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-[#ff912f05] blur-[80px] rounded-full group-hover:bg-[#ff912f10] transition-colors duration-700" />
                            <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-[#8bc94a05] blur-[80px] rounded-full group-hover:bg-[#8bc94a10] transition-colors duration-700" />

                            <h2 className="text-xl font-black text-slate-800 mb-8 tracking-tight flex items-center gap-3">
                                <span className="w-1.5 h-8 bg-gradient-to-b from-[#ff912f] to-[#ffb36b] rounded-full shadow-[0_4px_15px_-4px_#ff912f70]"></span>
                                Popular Picks
                            </h2>
                            
                            {most_search?.length > 0 ? (
                                <ul className="flex flex-wrap gap-3">
                                    {most_search.map((tag: string, i: number) => (
                                        <li key={i} className="w-full">
                                            <Link 
                                                href={`/search?query=${tag}`}
                                                className="flex items-center justify-between w-full px-6 py-4 rounded-2xl text-[15px] font-bold text-slate-600 transition-all duration-500 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 group/item"
                                            >
                                                <span>{tag}</span>
                                                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white opacity-0 group-hover/item:opacity-100 transition-all duration-300 text-[#ff912f] shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 text-slate-400 text-center italic text-base">
                                    No recent searches found.
                                </div>
                            )}

                            {/* Divider */}
                            {all_tags?.length > 0 && <div className="my-10 h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />}

                            {/* Popular Tags Section */}
                            {all_tags?.length > 0 && (
                                <div className="relative">
                                    <h2 className="text-xl font-black text-slate-800 mb-6 tracking-tight flex items-center gap-3">
                                        <span className="w-1.5 h-8 bg-gradient-to-b from-[#8bc94a] to-[#a8e063] rounded-full shadow-[0_4px_15px_-4px_#8bc94a70]"></span>
                                        Popular Tags
                                    </h2>
                                    <ul className="flex flex-wrap gap-2.5">
                                        {all_tags.map((tag: string, i: number) => (
                                            <li key={i}>
                                                <Link 
                                                    href={`/search?query=${tag}`}
                                                    className="inline-flex items-center px-5 py-2.5 rounded-xl text-[14px] font-bold text-slate-600 transition-all duration-300 bg-slate-50/80 hover:bg-white border border-transparent hover:border-slate-100 shadow-sm hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
                                                >
                                                    {tag}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content (Right) */}
                    <main className="lg:w-3/4 w-full flex flex-col gap-10">
                        <SearchPage 
                            slug_type={c_data?.slug_type}
                            mer_slug={c_data?.store_slug}
                            cat_slug={c_data?.category_slug}
                            searchData={searchResult?.data}
                            query={queryParams.query}
                        />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default page