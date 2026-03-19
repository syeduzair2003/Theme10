import { apiGetKeywords } from '@/apis/user';
import Link from 'next/link'
import React from 'react'
import { Tag } from 'lucide-react'; // Optional: icon ke liye

type Props = {
    company_id: string,
    merchant_id: string,
}

const TagsSidebar = async ({ company_id, merchant_id }: Props) => {
    const tags = await apiGetKeywords(merchant_id, company_id);
    const merchantTags: string[] = tags.data.merchant.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim()) || [];

    if (merchantTags.length === 0) return null;

    return (
        <div className="pt-6">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6">
                <Tag size={20} className="text-blue-600" />
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                    Popular Tags
                </h4>
            </div>

            {/* Tags Container */}
            <ul className="flex flex-wrap gap-2 md:gap-3 list-none p-0">
                {merchantTags.map((tag: string, i: number) => {
                    const isLongTag = tag.split(' ').length > 5;
                    
                    return (
                        <li key={i} className="inline-block">
                            <Link 
                                href={`/search?query=${tag}`} 
                                className={`
                                    group no-underline inline-flex items-center justify-center
                                    px-4 py-2 rounded-full border border-slate-200 
                                    bg-slate-50 text-slate-600 
                                    transition-all duration-300 ease-in-out
                                    hover:bg-blue-600 hover:border-blue-600 hover:text-white
                                    hover:shadow-md hover:shadow-blue-100 active:scale-95
                                `}
                            >
                                <span className={`
                                    text-sm font-semibold 
                                    ${isLongTag ? 'whitespace-normal text-left max-w-[200px]' : 'whitespace-nowrap'}
                                `}>
                                    {tag}
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TagsSidebar