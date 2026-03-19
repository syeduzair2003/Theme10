import { FooterResponse } from '@/services/dataTypes'
import React from 'react'
import Link from 'next/link'
import { discardHTMLTags } from '@/constants/hooks'

interface Props {
    data: FooterResponse
}

const BlogCard = async ({ data }: Props) => {
    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
            {/* Card Body */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <Link href={data.link} target='_blank'>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                        {discardHTMLTags(data?.title)}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                    {discardHTMLTags(data.text)}
                </p>

                {/* Read More Link */}
                <Link
                    href={data.link}
                    target='_blank'
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm transition-colors mt-auto"
                >
                    <span className="uppercase tracking-wider">Read More</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default BlogCard
