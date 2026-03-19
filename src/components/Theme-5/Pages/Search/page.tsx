import { apiCompanyUpdatedData, apiSearchResult } from '@/apis/user'
import React from 'react'
import SearchPage from '../../comp/SearchPage'
import cookieService from '@/services/CookiesService'
import Footer from '../../comp/Footer'
import AllTagsSidebar from '../../comp/AllTagsSidebar'
import HorizontalBannerSlider from '../../comp/HorizontalBannerSlider'

interface Props {
    searchParams: Promise<{ [key: string]: string }>
}

const Search = async ({ searchParams }: Props) => {
    try {
        const queryParams: any = await searchParams
        const companyDomain = await cookieService.get("domain")
        const c_data = (await apiCompanyUpdatedData(companyDomain)).data
        
        const searchResult = queryParams.query 
            ? await apiSearchResult(queryParams.query, c_data?.unique_id)
            : { data: { merchants: [], categories: [], offers: [] } }

        return (
            <div className='theme-5'>
                <div className="bg-slate-50 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <HorizontalBannerSlider 
                            companyId={c_data.unique_id} 
                            slug_type={c_data.slug_type} 
                            mer_slug={c_data.store_slug} 
                            domain={companyDomain.domain}
                        />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
                            {/* Sidebar */}
                            <aside className="lg:col-span-1">
                                <AllTagsSidebar company_id={c_data?.unique_id} />
                            </aside>
                            
                            {/* Main Content */}
                            <main className="lg:col-span-3">
                                <SearchPage
                                    slug_type={c_data?.slug_type || 'slug'}
                                    mer_slug={c_data?.store_slug || 'store'}
                                    cat_slug={c_data?.category_slug || 'category'}
                                    searchData={searchResult.data || { merchants: [], categories: [], offers: [] }}
                                    query={queryParams.query || ''}
                                    domain={companyDomain?.domain || ''}
                                />
                            </main>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    } catch (error) {
        console.error('Search page error:', error)
        return (
            <div className='theme-5'>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Search Error</h2>
                        <p className="text-slate-600">Unable to load search results. Please try again.</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Search