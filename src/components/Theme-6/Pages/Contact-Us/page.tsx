import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService'
import { apiContactPage } from '@/apis/user'
import { faAt, faFacebook, faFlipboard, faInstagram, faLinkedin, faPinterest, faTiktok, faYoutube, faGreaterThan, FontAwesomeIcon, faMapPin, faEnvelopeOpen, faPhone, faEarth, faXTwitter } from '@/constants/icons';
import ContactForm from '../../comp/ContactForm'

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const fullPageData = (await apiContactPage(companyDomain))?.data;
    const pageData = fullPageData?.CompanyContactUs;

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
                                        <span className="text-white">Contact Us</span>
                                    </li>
                                </ul>
                                <h1 className="mb-0 text-capitalize">Contact Us</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="privacy-content page-content">
                <div className="container">
                    <div className="row gy-7 gy-md-0 justify-content-center">
                        <div className="col-md-6 col-xl-6 col-xxl-6">
                            <ContactForm domain={companyDomain} />
                        </div>
                        <div className="col-md-6 col-xl-5 col-xxl-4 hover-active d-flex flex-column gap-2 gap-md-3 order-1 order-md-0">
                            {pageData?.address && (
                                <div className="single-item rounded-4 p1-2nd-bg-color transition cus-border border b-eighth d-flex align-items-center gap-3 gap-md-5 px-3 px-md-8 py-5 py-md-8 active">
                                    <span className="fs-three f5-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faMapPin} style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid gap-2 gap-md-3">
                                        <h5 className="fw-mid transition n17-color">Main Office</h5>
                                        <span className="fs-seven transition n17-color">{pageData?.address}</span>
                                    </div>
                                </div>
                            )}
                            {pageData?.email && (
                                <div className="single-item rounded-4 p1-2nd-bg-color transition cus-border border b-eighth d-flex align-items-center gap-3 gap-md-5 px-3 px-md-8 py-5 py-md-8">
                                    <span className="fs-three f5-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faEnvelopeOpen} style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid gap-2 gap-md-3">
                                        <h5 className="fw-mid transition n17-color">Email Address</h5>
                                        <div className="d-grid">
                                            <span className="fs-seven transition n17-color">{pageData?.email}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {pageData?.phone_no && (
                                <div className="single-item rounded-4 p1-2nd-bg-color transition cus-border border b-eighth d-flex align-items-center gap-3 gap-md-5 px-3 px-md-8 py-5 py-md-8">
                                    <span className="fs-three f5-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faPhone} style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid gap-2 gap-md-3">
                                        <h5 className="fw-mid transition n17-color">Phone Number</h5>
                                        <div className="d-grid">
                                            <span className="fs-seven transition n17-color">{pageData?.phone_no}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="single-item rounded-4 p1-2nd-bg-color transition cus-border d-flex gap-3 flex-column border b-eighth px-3 px-md-4 py-4">
                                <div className="d-flex gap-3 align-items-center mb-2">
                                    <span className="icon-area rounded-circle shadow-sm">
                                        <FontAwesomeIcon icon={faEarth} style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid">
                                        <h5 className="fw-mid n17-color mb-0">Socials</h5>
                                    </div>
                                </div>

                                {/* Fixed UL: Removed bullets and added flex wrapping */}
                                <ul className="social-area d-flex flex-wrap gap-2 p-0 m-0 list-unstyled">
                                    {fullPageData?.company_data?.facebook && (
                                        <li className='social-item-list'>
                                            <Link href={fullPageData?.company_data?.facebook} aria-label="Facebook" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.twitter && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.twitter} aria-label="Twitter" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faXTwitter} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.pinterest && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.pinterest} aria-label="pinterest" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faPinterest} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.youtube && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.youtube} aria-label="youtube" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faYoutube} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.linkedin && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.linkedin} aria-label="linkedin" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faLinkedin} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.instagram && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.instagram} aria-label="instagram" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faInstagram} />
                                            </Link>
                                        </li>
                                    )}
                                    {fullPageData?.company_data?.tiktok && (
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.tiktok} aria-label="tiktok" className="social-link" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faTiktok} />
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page
