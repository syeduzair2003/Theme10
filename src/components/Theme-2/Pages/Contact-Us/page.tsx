import React from 'react'
import ContactForm from '../../comp/ContactForm'
import cookieService from '@/services/CookiesService';
import { apiContactPage } from '@/apis/user';
import Link from 'next/link';

const page = async () => {
     const companyDomain = (await cookieService.get("domain")).domain;
    const fullPageData = (await apiContactPage(companyDomain))?.data;
    const pageData = fullPageData?.CompanyContactUs;

    return (
        <div className='company-pages'>
            <div className="breadcrumb-section">
                <div className="breadcrumb-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12">
                                <div className="breadcrumb-text padTB50">
                                    <h3><span>Contact Us</span></h3>
                                    <ul className="breadcrumb-list">
                                        <li><Link href="/" className='text-capitalize'>Home</Link></li>
                                        <li>Contact us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section bg padTB60">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="row">
                                <div className="comments-form">
                                    <div className="coments col-md-12 col-sm-12 col-xs-12 marB30">
                                        <h1 className='fw-bold'>contact us</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ContactForm domain={companyDomain}/>
                </div>
            </div>
        </div>
    )
}

export default page
