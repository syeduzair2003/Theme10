import { apiGetAllKeywords } from '@/apis/user'
import React from 'react'
import Link from 'next/link'

interface Props {
  company_id: string
}

const AllTagsSidebar = async ({ company_id }: Props) => {
  const all_tags = (await apiGetAllKeywords(company_id)).data
  if (all_tags?.length > 0) {

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {all_tags.map((tag: string, i: number) => (
            <Link
              key={i}
              href={`/search?query=${tag}`}
              className="px-3 py-1.5 bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 rounded-lg text-xs font-bold transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export default AllTagsSidebar