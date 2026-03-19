import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const AboutUs = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'about-us';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;
    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 mt-2 mt-md-4 mt-xl-6 s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-38 text-capitalize">{pageData?.page_name}</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">About Us</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-15.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="privacy-content page-content">
                <div className="overlay">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-10 d-grid gap-5 gap-md-7">
                                <div
                                    className="d-grid gap-3 gap-md-4"
                                    dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs
