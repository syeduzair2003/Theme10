import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';

const SearchPage = async ({ slug_type, mer_slug, cat_slug, searchData, query }: any) => {
    const companyDomain = await cookieService.get("domain");

    if (!searchData?.merchants?.length && !searchData?.categories?.length) {
        return (
            <div className="text-center py-20">
                {/* Fixed: "{query}" -> &quot;{query}&quot; */}
                <p className="text-slate-400 text-lg">No results found for &quot;{query}&quot;</p>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {/* Merchant Section */}
            {searchData?.merchants?.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                            {/* Fixed quotes */}
                            Stores matching <span className="text-blue-600">&quot;{query}&quot;</span>
                        </h2>
                        <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {searchData.merchants.map((merchant: any, i: number) => (
                            <Link 
                                key={i} 
                                href={`/${mer_slug}/${merchant[slug_type] || merchant.slug}`}
                                className="no-underline group p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="w-20 h-14 relative flex-shrink-0 bg-white border border-slate-100 rounded-lg overflow-hidden p-1 shadow-sm">
                                    <Image
                                        src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                                        alt={merchant.merchant_name}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-slate-700 truncate group-hover:text-blue-600 uppercase tracking-tight">
                                        {merchant.merchant_name}
                                    </h3>
                                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-500 flex items-center gap-1 transition-colors">
                                        VIEW STORE <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Section */}
            {searchData?.categories?.length > 0 && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                            {/* Fixed quotes */}
                            Categories in <span className="text-indigo-600">&quot;{query}&quot;</span>
                        </h2>
                        <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {searchData.categories.map((category: any) => (
                            <Link 
                                key={category.unique_id}
                                href={category?.url}
                                className="group bg-slate-50 border border-slate-100 rounded-xl p-5 hover:bg-white hover:border-indigo-500 hover:shadow-md transition-all duration-300 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-full border border-slate-100 p-2 shadow-sm group-hover:scale-110 transition-transform">
                                    <Image
                                        src={getBaseImageUrl(companyDomain.domain, category?.category_image, "")}
                                        alt={category?.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600">{category?.name}</h4>
                                    <p className="text-[11px] font-semibold text-indigo-500 bg-indigo-50 inline-block px-2 py-0.5 rounded-full mt-1">
                                        {category?.total_offers || 0} Offers Available
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchPage