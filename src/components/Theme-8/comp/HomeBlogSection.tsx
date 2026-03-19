import { apiFooter } from '@/apis/user';
import Link from 'next/link';
import React from 'react';
import Blog from './Blog';
import { ArrowRight } from 'lucide-react';

const HomeBlogSection = async ({ companyId, blog_url }: { companyId: string, blog_url: string }) => {
    const blog = await apiFooter(companyId);

    if (blog.status && blog?.data?.length > 0) {
        return (
            <section className="bg-white py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header Area */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div className="max-w-2xl">
                            <p className="text-blue-500 font-bold text-xs mb-3 uppercase tracking-[0.2em]">
                                Stay Updated
                            </p>
                            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter">
                                Weekly <span className="text-gray-400">News & Insights</span>
                            </h2>
                        </div>
                        
                        <Link 
                            href={blog_url}
                            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-all"
                        >
                            View All News 
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blog.data.slice(0, 3).map((item: any, i: number) => (
                            <Blog key={i} data={item} />
                        ))}
                    </div>

                </div>
            </section>
        );
    }
    return null;
}

export default HomeBlogSection;