import { apiGetKeywords } from '@/apis/user';
import Link from 'next/link'
import React from 'react'

type Props = {
    company_id: string,
    merchant_id: string,
}

const TagsSidebar = async ({ company_id, merchant_id }: Props) => {
    const tags = await apiGetKeywords(merchant_id, company_id);
    const merchantTags: string[] = tags.data.merchant.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim()) || [];

    if (merchantTags.length > 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {merchantTags.map((tag: string, i: number) => (
                        <Link
                            key={i}
                            href={`/search?query=${tag}`}
                            className="inline-block bg-slate-900 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 hover:text-indigo-300 transition-all border border-slate-800"
                        >
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
    return null;
}

export default TagsSidebar