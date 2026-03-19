import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';


const AffiliateDisclosure = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'affiliate-disclosure';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;
    return (
        <>
            <section className="breadcrumb-green">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <ul className="flx-align gap-2 mb-2 justify-content-center">
                                    <li className="font-14 text-body">
                                        <Link href="/" className="text-body hover-text-main">Home</Link>
                                    </li>
                                    <li className="font-14 text-body">
                                        <span className="font-10">
                                            <FontAwesomeIcon
                                                icon={faGreaterThan}
                                                style={{ width: '10px', height: '10px', color: 'white' }}
                                            />
                                        </span>
                                    </li>
                                    <li className="font-14 text-body">
                                        <span className="text-white">Affiliate Disclosure</span>
                                    </li>
                                </ul>
                                <h1 className="mb-0 text-capitalize">{pageData?.page_name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
             <section className="privacy-content page-content">
                <div className="overlay">
                    <div className="container py-5"> 
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div
                                    className="general-content-format" // Applied the new class
                                    dangerouslySetInnerHTML={{
                                        __html: pageData?.page_description || "<h2>Content not available.</h2>"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AffiliateDisclosure
