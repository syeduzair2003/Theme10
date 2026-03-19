import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '../../comp/ContactForm'
import cookieService from '@/services/CookiesService'
import { apiContactPage } from '@/apis/user'
import { faAt, faFacebook, faFlipboard, faInstagram, faLinkedin, faPinterest, faTiktok, faYoutube, faGreaterThan, FontAwesomeIcon, faMapPin, faEnvelopeOpen, faPhone, faEarth, faXTwitter } from '@/constants/icons';

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const fullPageData = (await apiContactPage(companyDomain))?.data;
    const pageData = fullPageData?.CompanyContactUs;

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 mt-2 mt-md-4 mt-xl-6 s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-38">Contact Us</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">Contact Us</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <div className="text-left">
                                <p className="fs-seven f5-color n17-color mt-3 mb-0"
                                    dangerouslySetInnerHTML={{ __html: pageData?.details || '' }}
                                />
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
                            <div className="single-item rounded-4 p1-2nd-bg-color transition cus-border d-flex gap-2 flex-column border b-eighth px-3 px-md-8 py-5 py-md-8">
                                <div className="d-flex gap-3 gap-md-5 align-items-center">
                                    <span className="fs-three f5-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faEarth} style={{ width: '20px', height: '20px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid gap-2 gap-md-3">
                                        <h5 className="fw-mid transition n17-color">Socials</h5>
                                    </div>
                                </div>
                                <ul className="d-center flex-wrap justify-content-start gap-1 social-area second p-0">
                                    {fullPageData?.company_data?.facebook &&
                                        <li className='social-item-list'>
                                            <Link href={fullPageData?.company_data?.facebook} aria-label="Facebook" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faFacebook} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.twitter &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.twitter} aria-label="Twitter" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faXTwitter} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.pinterest &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.pinterest} aria-label="pinterest" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faPinterest} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.youtube &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.youtube} aria-label="youtube" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faYoutube} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.linkedin &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.linkedin} aria-label="transition" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faLinkedin} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.instagram &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.instagram} aria-label="transition" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faInstagram} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.tiktok &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.tiktok} aria-label="transition" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faTiktok} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.flipboard &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.flipboard} aria-label="transition" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faFlipboard} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
                                    {fullPageData?.company_data?.threads &&
                                        <li className="social-item-list">
                                            <Link href={fullPageData?.company_data?.threads} aria-label="transition" className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                                <FontAwesomeIcon icon={faAt} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </Link>
                                        </li>
                                    }
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
