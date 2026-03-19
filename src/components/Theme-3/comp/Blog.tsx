import React from 'react'
import BlogShow from './BlogShow'
import { apiFooter } from '@/apis/user'
import Link from 'next/link'
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons'

interface Props {
    companyId: string,
    blog_url: string,
}

const Blog = async ({ companyId, blog_url }: Props) => {
    const blog = await apiFooter(companyId);
    let count = 0;
    if (blog.status) {
        return (
            <section className="merchant-carousel-section s1-2nd-bg-color py-10" style={{ padding: "5% 8%" }}>
                <div className="container">
                    <div className="row section-header d-flex align-items-center">
                        <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10">
                            <div className="section-title-center text-center no-before mb-3">
                                <h2 className="top-stores-heading animate-heading">
                                    <span className="top-text">Weekly </span>
                                    <span className="stores-text"> News</span>
                                </h2>
                            </div>
                        </div>
                        <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                            <Link href={blog_url} className="d-center gap-1" target='_blank'>
                                <span className="p2-color fw-bold">Visit Blog</span>
                                <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        {blog?.data?.length > 0 && blog?.data?.map((item, i) => {
                            count++;
                            if (count <= 3) {
                                return (
                                    <BlogShow key={i} data={item} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </section>
        )
    } else {
        return <></>
    }

}

export default Blog
