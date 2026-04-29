import { Merchant, SearchCategories, SearchResponse } from '@/services/dataTypes'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl } from '@/constants/hooks';
import { ArrowRight } from 'lucide-react';

interface Props {
    slug_type: string,
    mer_slug: string,
    cat_slug: string,
    searchData: SearchResponse,
    query: string
}

const SearchPage = async ({ slug_type, mer_slug, cat_slug, searchData, query }: Props) => {
    const getHref = (store: Merchant) => `/${mer_slug}/${store[slug_type as keyof Merchant] || store.slug}`;
    const getCatHref = (category: SearchCategories) => `/${cat_slug}/${category[slug_type as keyof SearchCategories] || category.slug}`;
    const companyDomain = await cookieService.get("domain");

    if (!searchData?.merchants?.length && !searchData?.categories?.length) {
        return (
            <div className="bg-white border border-slate-100 rounded-[2rem] p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden group">
                <div className="flex flex-col items-center text-center gap-6 relative z-10">
                    <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">No Results Found</h3>
                        <p className="text-slate-500 max-w-sm text-base">
                            We couldn&apos;t find any stores or categories matching <span className="text-[#ff912f] font-bold">&quot;{query}&quot;</span>.
                        </p>
                    </div>
                    <Link href="/" className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-200">
                        Back to Home
                    </Link>
                </div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#ff912f03] blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#8bc94a10] blur-[120px] rounded-full" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-12 sm:gap-16">
            {/* Stores Section */}
            {searchData?.merchants?.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                            <span className="w-2 h-10 bg-gradient-to-b from-[#ff912f] to-[#ffb36b] rounded-full shadow-[0_4px_15px_-4px_#ff912f70]"></span>
                            &ldquo;{query}&rdquo; in Stores
                        </h2>
                        <span className="text-sm font-bold text-slate-400 bg-slate-100/50 px-4 py-1.5 rounded-full">
                            {searchData.merchants.length} Found
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {searchData.merchants.map((merchant: any, i: number) => (
                            <Link 
                                key={i} 
                                href={getHref(merchant)}
                                className="group bg-white border border-slate-100 rounded-[2rem] p-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:border-slate-200/60 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#ff912f08] to-transparent rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-700" />
                                
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className="w-24 h-24 bg-white border border-slate-100 rounded-2xl flex items-center justify-center p-4 overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:-translate-y-1">
                                        <Image
                                            src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                                            alt={merchant.merchant_name}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 group-hover:text-[#ff912f] transition-colors duration-300">
                                            {merchant.merchant_name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[#8bc94a] font-bold text-[12px] uppercase tracking-[0.05em]">
                                            <span>View Store</span>
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Categories Section */}
            {searchData?.categories?.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                            <span className="w-2 h-10 bg-gradient-to-b from-[#8bc94a] to-[#a8e063] rounded-full shadow-[0_4px_15px_-4px_#8bc94a70]"></span>
                            &ldquo;{query}&rdquo; in Categories
                        </h2>
                        <span className="text-sm font-bold text-slate-400 bg-slate-100/50 px-4 py-1.5 rounded-full">
                            {searchData.categories.length} Found
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {searchData.categories.map((category: any) => (
                            <Link 
                                key={category.unique_id} 
                                href={category?.url || getCatHref(category)}
                                className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-500 flex items-center gap-6 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8bc94a08] to-transparent rounded-bl-[6rem] opacity-50 group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                                
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-3 shadow-sm group-hover:bg-white group-hover:scale-110 transition-all duration-500 z-10">
                                    <Image
                                        src={getBaseImageUrl(companyDomain.domain, category?.category_image, "")}
                                        alt={category?.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                
                                <div className="flex-1 z-10">
                                    <h4 className="font-bold text-slate-800 text-lg leading-tight mb-1 group-hover:text-[#ff912f] transition-colors duration-300">
                                        {category?.name}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

export default SearchPage
