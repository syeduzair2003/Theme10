import React from 'react'
import BlogCard from './BlogCard'
import { apiFooter } from '@/apis/user'
import Link from 'next/link'
import { splitHeading } from '@/constants/hooks'

interface Props {
    companyId: string
    blog_url: string
}

const Blog = async ({ companyId, blog_url }: Props) => {
    const blog = await apiFooter(companyId)
    const [firstHalf, secondHalf] = splitHeading("Weekly News")
    // const [firstHalf, secondHalf] = splitHeading(blog?.data?.[0]?.title || "Weekly News")

    if (blog.status && blog?.data?.length > 0) {
        return (
            <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12 border-l-4 border-indigo-600 pl-6">
                        <div>
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                                <span className="text-slate-900">{firstHalf} </span>
                                <span className="text-indigo-600">{secondHalf}</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium">
                                Stay updated with the latest deals and shopping tips
                            </p>
                        </div>
                        <Link
                            href={blog_url}
                            target='_blank'
                            className="w-max group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all mt-2 whitespace-nowrap">
                            View Blog
                            <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blog.data.slice(0, 3).map((item, i) => (
                            <BlogCard key={i} data={item} />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return null
}

export default Blog
