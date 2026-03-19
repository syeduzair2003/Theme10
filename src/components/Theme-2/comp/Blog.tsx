import { discardHTMLTags } from '@/constants/hooks'
import { FooterResponse } from '@/services/dataTypes'
import Link from 'next/link'
import React from 'react'
interface Props {
    data: FooterResponse
}
const Blog = async ({ data }: Props) => {
    return (
        <div className="col-md-6 col-sm-12 col-xs-12 col-lg-4 col-xl-4">
            <div className="box-a h-100 card rounded-3 shadow-sm">
                <div className="box-detail h-100 rounded-4">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            <h4 className="hover marB10 f-18"><Link href={data?.link}>{discardHTMLTags(data?.title)}</Link></h4>
                            <ul className="marB10 fonts">
                                <li><i className="fa fa-calendar-o" aria-hidden="true"></i>{data?.date}</li>
                            </ul>
                            <p className='truncate-2-lines'>{discardHTMLTags(data?.text)}</p>
                            <span><Link href={data?.link} className="hover">read more</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog
