import { apiFooter } from '@/apis/user';
// import Image from 'next/image'
import React from 'react'
import BlogCard from './BlogCard';
import Link from 'next/link';
import Image from 'next/image'

interface Props {
    companyId: string;
    blog_url: string;
}

const BlogSection = async ({ companyId, blog_url }: Props) => {
    const blog = await apiFooter(companyId);
    let count = 0;
    if (blog.status) {
        return (
            <section className="blog padding-y-60  position-relative z-index-1 overflow-hidden">
                <Image
                    src="/themes/Theme_1/images/shapes/pattern-five.png"
                    className="position-absolute end-0 top-0 z-index--1"
                    alt="pattern"
                    height={100}
                    width={100}
                />
                <div className="container">
                    <div className="section-heading style-left style-white flx-between max-w-unset gap-4">
                        <div>
                            <h1 className="section-heading__title text-dark">
                                Latest News
                            </h1>
                        </div>
                        <Link
                            href={blog_url}
                            className="btn btn-main btn-lg pill fw-300"
                        >
                            View all Posts
                        </Link>
                    </div>
                    <div className="row gy-4">
                        {blog?.data?.length > 0 && blog?.data?.map((item, i) => {
                            count++;
                            if (count <= 3) {
                                return (
                                    <BlogCard key={i} data={item} preloadedImage={item.featured_image} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

export default BlogSection
