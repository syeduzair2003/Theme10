import { discardHTMLTags } from '@/constants/hooks'
import { FooterResponse } from '@/services/dataTypes'
import Link from 'next/link'
import React from 'react'
import { Calendar, ChevronRight } from 'lucide-react'

interface Props {
    data: FooterResponse
}

const Blog = ({ data }: Props) => {
    return (
        <div className="group relative bg-gray-50 rounded-[2rem] p-8 border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 flex flex-col h-full">
            
            {/* Date Badge */}
            <div className="flex items-center gap-2 text-gray-400 mb-6 group-hover:text-blue-500 transition-colors">
                <Calendar size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">
                    {data?.date || "Recent Post"}
                </span>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <h4 className="">
                    <Link 
                        href={data?.link} 
                        className='no-underline text-2xl font-bold !text-gray-900 mb-4 leading-snug group-hover:!text-blue-600 transition-colors line-clamp-2'
                        >
                        {discardHTMLTags(data?.title)}
                    </Link>
                </h4>
                
                <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3 text-sm">
                    {discardHTMLTags(data?.text)}
                </p>
            </div>

            {/* Footer / Read More */}
            <div className="pt-6 border-t border-gray-100">
                <Link 
                    href={data?.link} 
                    className=" no-underline inline-flex items-center gap-2 text-xs font-black uppercase tracking-tighter text-black group-hover:gap-4 transition-all"
                >
                    Read Full Story 
                    <ChevronRight size={16} className="text-blue-500" />
                </Link>
            </div>

            {/* Subtle Gradient Glow (on hover) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] pointer-events-none transition-opacity"></div>
        </div>
    )
}

export default Blog;