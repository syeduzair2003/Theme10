"use client"
import React, { useRef, useState, useEffect } from 'react'
import { apiGetAllKeywords, apiSearchResult } from '@/apis/user'
import { ellipse, getBaseImageUrl, getCategoryHref, getMerchantHref } from '@/constants/hooks'
import { MetaKeywordsResponse, SearchCategories, SearchMerchant } from '@/services/dataTypes'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
    companyId: string
    mer_slug: string
    slug_type: string
    cat_slug: string
    domain: string
}

const SearchBar = ({ companyId, mer_slug, slug_type, cat_slug, domain }: Props) => {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const [search, setSearch] = useState<string>(params.get('query') || "")
    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [tagsData, setTagsData] = useState<any>([])
    const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([])
    const [merchantData, setMerchantData] = useState<SearchMerchant[]>([])
    const [errMsg, setErrMessage] = useState({ show: false, err: false, msg: '' })
    const pathName = usePathname()
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeywords = async () => {
        const response = await apiGetAllKeywords(companyId)
        if (response.data) {
            setTagsData(response.data)
        }
    }

    const handleSearch = async () => {
        try {
            if (search.trim().length >= 3) {
                const response = await apiSearchResult(search, companyId)
                if (response.data?.merchants?.length > 0 || response.data?.categories?.length > 0) {
                    setCategoriesData(response.data?.categories || [])
                    setMerchantData(response.data?.merchants || [])
                    setErrMessage({ show: false, err: false, msg: '' })
                } else {
                    setCategoriesData([])
                    setMerchantData([])
                    setErrMessage({ show: true, err: true, msg: 'No result found.' })
                    setTimeout(() => setErrMessage({ show: false, err: false, msg: '' }), 5000)
                }
            } else {
                setCategoriesData([])
                setMerchantData([])
                setErrMessage({ show: true, err: true, msg: 'Input should be at least three characters long.' })
                setTimeout(() => setErrMessage({ show: false, err: false, msg: '' }), 5000)
            }
        } catch (err) {
            console.error('Search error:', err)
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim() === "") {
                setMerchantData([])
                setCategoriesData([])
                setErrMessage({ show: false, err: false, msg: '' })
            } else {
                handleSearch()
            }
        }, 1000)
        return () => clearTimeout(timeoutId)
    }, [search])

    useEffect(() => {
        const query = params.get('query') || ""
        if (query !== search && document.activeElement !== inputRef.current) {
            setSearch(query)
        }
    }, [params])

    useEffect(() => {
        if (pathName === '/search') setIsDropdownVisible(false)
    }, [pathName])

    useEffect(() => {
        handleKeywords()
    }, [companyId])

    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search.trim()) {
            e.preventDefault()
            router.push(`/search?query=${encodeURIComponent(search.trim())}`)
            setIsDropdownVisible(false)
        }
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <div className="relative text-slate-900">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-slate-100 border border-slate-200 focus:bg-gray-100 focus:shadow-md focus:shadow-indigo-300 px-12 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 placeholder:text-black outline-none"
                    ref={inputRef}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
                    onFocus={() => setIsDropdownVisible(pathName !== '/search')}
                />
                <svg className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {isDropdownVisible && (
                <div className="absolute top-full right-0 left-auto mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50 max-h-[500px] overflow-y-auto w-full min-w-[800px]">
                    {/* Popular Tags - Always show when dropdown is visible */}
                    {tagsData.length > 0 && (
                        <div className="mb-6">
                            <h5 className="text-xs font-black left-auto text-slate-900 uppercase tracking-widest mb-3">Popular Tags</h5>
                            <div className="flex flex-wrap gap-2">
                                {tagsData.map((item: string, i: number) => (
                                    <Link
                                        key={i}
                                        href={`/search?query=${item}`}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {errMsg.show && (
                        <p className="text-sm text-red-600 font-medium mb-4">{errMsg.msg}</p>
                    )}

                    {/* Stores */}
                    {merchantData.length > 0 && (
                        <div className="mb-6">
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Stores</h5>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {merchantData.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={getMerchantHref<SearchMerchant>(item, mer_slug, slug_type)}
                                        className="group flex flex-col items-center p-3 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-2 group-hover:border-indigo-200 transition-colors">
                                            <Image
                                                src={getBaseImageUrl(domain, item.merchant_logo, "")}
                                                alt={item.merchant_name}
                                                width={48}
                                                height={48}
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700 text-center line-clamp-2">
                                            {ellipse(item.merchant_name, 28)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Categories */}
                    {categoriesData.length > 0 && (
                        <div>
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3">Categories</h5>
                            <div className="flex flex-wrap gap-2">
                                {categoriesData.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={getCategoryHref(item, cat_slug, slug_type)}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchBar