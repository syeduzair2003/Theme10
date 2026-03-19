import { apiFooter } from '@/apis/user';
import Link from 'next/link';
import React from 'react'
import Blog from './Blog';

const HomeBlogSection = async ({ companyId, blog_url }: { companyId: string, blog_url: string }) => {
    const blog = await apiFooter(companyId);
    let count = 0;
    if (blog.status) {
        return (
            <div className="popular-stores bg padTB60">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-md-12 col-sm-12 col-xs-12 mb-3">
                            <div className="section-box rounded-3 shadow-sm">
                                <div className="row">
                                    <div className="col-9 col-md-10 col-sm-9 col-xs-9">
                                        <div className="boxbg p-2 w-100">
                                            <h2 className='opacity-80 f-25'>Weekly News</h2>
                                        </div>
                                    </div>
                                    <div className="col-3 col-md-2 col-sm-3 col-xs-3">
                                        <div className="symbol">
                                            <Link href={blog_url}>
                                                <h5 className='f-13 m-0'>View All
                                                    <i className="flaticon-external-link-symbol" style={{ height: "20px", width: "20px" }}></i>
                                                </h5>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {blog?.data?.length > 0 && blog?.data?.slice(0,3)?.map((item, i) => {
                            count++;
                            if (count <= 3) {
                                return (
                                    <Blog key={i} data={item} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeBlogSection
