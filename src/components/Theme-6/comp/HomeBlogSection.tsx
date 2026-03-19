import { apiFooter } from '@/apis/user';
// import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import BlogCard from './BlogCard';

interface Props {
    companyId: string;
    blog_url: string;
}

const BlogSection = async ({ companyId, blog_url }: Props) => {
    const blog = await apiFooter(companyId);
    let count = 0;
    if (blog.status) {
        return (
            <section
                className="section-full trv-blog-style3-section p-t120 p-b90"
                style={{ backgroundImage: `url('themes/Theme_6/images/background/patern.png')` }}
            >
                <div className="container">
                    {/* <div className="section-heading style-left style-white flx-between max-w-unset gap-4">
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
                    </div> */}

                    <div className="section-head trv-head-title-wrap d-flex align-items-center justify-content-between gap-4 mb-5 w-100">
                        {/* Left Side: Title */}
                        <div className="flex-grow-1">
                            <h2 className="trv-head-title text-white mb-0">
                                <span className="site-text-yellow">
                                    {"Latest"}
                                </span>{" "}
                                {"News"}
                            </h2>
                        </div>

                        {/* Right Side: Button */}
                        <div className="flex-shrink-0">
                            <Link
                                href={blog_url}
                                className="siteButton"
                            >
                                View All
                            </Link>
                        </div>
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
