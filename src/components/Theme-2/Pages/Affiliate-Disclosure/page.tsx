import { apiFooterPagesData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'affiliate-disclosure';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;
    return (
        <>
            <div className="breadcrumb-section">
                <div className="breadcrumb-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcrumb-text padTB50">
                                    <h3><span className='text-capitalize'>{pageData?.page_name}</span></h3>
                                    <ul className="breadcrumb-list">
                                        <li><Link href="/" className='text-capitalize'>Home</Link></li>
                                        <li>{pageData?.page_name}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section bg padTB60">
                <div className="container">
                    <div
                        className="d-grid gap-3 gap-md-4 company-pages"
                        dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                    />
                </div>
            </div>
        </>
    )
}

export default page