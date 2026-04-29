import React from 'react';
import { apiFooter } from '@/apis/user';
import Link from 'next/link';
import { FooterResponse } from '@/services/dataTypes';
import { discardHTMLTags } from '@/constants/hooks';

interface Props {
    companyId: string;
    blog_url: string;
}

const BlogShow = ({ data }: { data: FooterResponse }) => {
    return (
        <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-[#8bc94a] overflow-hidden group">
            <div className="p-5 md:p-6 flex flex-col h-full">
                {/* Title */}
                <div className="mb-3">
                    <Link href={data.link} target="_blank" className="no-underline">
                        <h4 className="text-[16px] md:text-[17px] font-bold text-[#011430] group-hover:text-[#ff912f] transition-colors duration-300 line-clamp-2 leading-snug m-0">
                            {discardHTMLTags(data?.title)}
                        </h4>
                    </Link>
                </div>

                {/* Excerpt */}
                <div className="text-[13px] md:text-[14px] text-gray-500 line-clamp-3 leading-relaxed flex-grow">
                    {discardHTMLTags(data.text)}
                </div>

                {/* Action Link */}
                <div className="mt-5 md:mt-6">
                    <Link
                        href={data.link}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-[13px] md:text-[14px] font-bold no-underline transition-colors group/link"
                        style={{ color: '#011430' }}
                    >
                        <span className="group-hover/link:text-[#8bc94a] transition-colors uppercase tracking-wider">READ MORE</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 text-[#011430] group-hover/link:text-[#8bc94a] transition-all group-hover/link:translate-x-1 duration-200"
                        >
                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Blog = async ({ companyId, blog_url }: Props) => {
    const blog = await apiFooter(companyId);

    if (!blog?.status || !blog?.data?.length) {
        return null;
    }

    return (
        <section aria-label="Blog Section" className="relative w-full pb-12 md:pb-16 lg:pb-20">
            <div className="container mx-auto px-4">
                {/* ── Section header row ── */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 mb-1.5">
                            <span
                                className="w-[3px] h-4 rounded-full inline-block"
                                style={{ background: '#8bc94a' }}
                                aria-hidden="true"
                            />
                            <span
                                className="text-[10px] font-bold uppercase tracking-widest"
                                style={{ color: '#ff912f' }}
                            >
                                Latest Updates
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                            <span style={{ color: '#8bc94a' }}>Weekly </span>
                            <span className="text-gray-800">News</span>
                        </h2>
                    </div>

                    {/* Right: Visit Blog button */}
                    <div className="flex items-start shrink-0">
                        <Link
                            href={blog_url}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-5 py-2.5 rounded-full border transition-all duration-200 group"
                            style={{
                                borderColor: '#e8e8e8',
                                color: '#ff912f',
                                background: '#ffffff',
                            }}
                        >
                            <span className="group-hover:text-[#8bc94a] transition-colors">Visit Blog</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* ── Thin gradient divider ── */}
                <div
                    className="w-full h-px mb-6 md:mb-8"
                    style={{
                        background: 'linear-gradient(90deg, #ff912f30, #8bc94a30, #ff912f30)',
                    }}
                    aria-hidden="true"
                />

                {/* ── Blog Grid Layout ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
                    {blog.data.slice(0, 3).map((item: FooterResponse, i: number) => (
                        <BlogShow key={i} data={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
