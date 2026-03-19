import Link from 'next/link'
// import Image from 'next/image'
import React from 'react'
import { FooterResponse } from '@/services/dataTypes'
import { discardHTMLTags } from '@/constants/hooks'
import Image from 'next/image'
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons'

interface Props {
    data: FooterResponse,
    preloadedImage: string,
}
const BlogCard = ({ data, preloadedImage }: Props) => {
    return (
        // <div className="col-lg-4 col-sm-6">
        //     <div className="post-item">
        //         <div className="post-item__thumb post-item__thumb-custom">
        //             <Image
        //                 src={preloadedImage}
        //                 className="cover-Image cover-image-custom"
        //                 alt={`${data.title} image`}
        //                 height={300}
        //                 width={416}
        //                 objectFit='contain'
        //             />
        //         </div>
        //         <div className="post-item__content">
        //             <div className="post-item__top flx-align">
        //                 <div className="post-item__date font-14 flx-align gap-2 font-14 text-heading fw-500">
        //                     <span className="icon d-flex align-items-center">
        //                         <Image
        //                             src="/themes/Theme_1/images/icons/calendar.svg"
        //                             alt="calender"
        //                             className="white-version"
        //                             height={15}
        //                             width={15}
        //                         />
        //                     </span>
        //                     <span className="text f-13">{data.date}</span>
        //                 </div>
        //             </div>
        //             <h5 className="post-item__title truncate-2-lines f-16 sp-2">
        //                 <Link href={data.link} className="link">
        //                     {discardHTMLTags(data.title)}
        //                 </Link>
        //             </h5>
        //             <Link
        //                 href={data.link}
        //                 className="btn btn-outline-light pill fw-600 f-15"
        //             >
        //                 Read More{" "}
        //             </Link>
        //         </div>
        //     </div>
        // </div>

       <div className="col-lg-4 col-md-6 mb-4">
            <div className="blog-card h-100">
                
                {/* 1. Image Thumbnail (Top) */}
                <div className="blog-card__thumb">
                    <Link href={data.link || "#"}>
                        <Image
                            src={preloadedImage}
                            alt="Blog Thumbnail"
                            className="blog-card__img"
                            height={300}
                            width={416}
                        />
                    </Link>
                </div>

                {/* 2. Content Wrapper (Padding applied here) */}
                <div className="blog-card__content">
                    
                    {/* Date / Meta */}
                    <div className="blog-card__meta">
                        <FontAwesomeIcon icon={faCalendarDays} className="blog-card__icon" />
                        <span className="blog-card__date">{data.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="blog-card__title">
                        <Link href={data.link || "#"}>
                            {discardHTMLTags(data.title)}
                        </Link>
                    </h3>

                    {/* 3. Button (Left Aligned) */}
                    <div className="blog-card__action">
                        <Link href={data.link || "#"} className="blog-card__btn">
                            Read More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
