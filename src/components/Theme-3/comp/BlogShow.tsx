import { FooterResponse } from '@/services/dataTypes';
import React from 'react'
// import Image from "next/image";
import Link from 'next/link';
import { discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import Image from 'next/image'

interface Props {
    data: FooterResponse;
}
const BlogShow = async ({ data }: Props) => {
    const companyDomain = await cookieService.get("domain");

    return (
        <div className="col-md-4 d-flex mb-4">
            <div className='blog-container'>
                {/* <div className="blog-image-container">
                    <Image src={getBaseImageUrl(companyDomain.domain,data.featured_image, "")}
                        height={200}
                        width={300}
                        alt={data.title}
                        objectFit='cover'
                        layout='responsive'
                        style={{ borderRadius: "10px" }}
                    >
                    </Image>
                </div> */}
                <div className='mt-3 d-flex flex-column p-3 h-100 justify-content-between'>
                        <Link href={data.link} target='_blank' style={{ color: "#222e48 !important" }}>
                        <h4 className='n17-color fw-bold mb-2 f-16'>
                            {discardHTMLTags(data?.title)}
                        </h4>
                        </Link>
                    <div className='mt-2 n17-color truncate-2-lines fs-five f-14 highlight-cursor-para'>
                        {discardHTMLTags(data.text)}
                    </div>
                    <div className='w-50 my-3' style={{ padding: "0px !important"}}>
                        <Link className="d-center justify-content-start gap-2 gap-md-3" href={data.link} target='_blank'>
                            <span className='p2-color fw-bold'>READ MORE</span>
                            <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogShow
