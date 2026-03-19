import Image from 'next/image'
import React from 'react'
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData } from '@/apis/user';
import CategorySection from '../../comp/CategorySection';
import CategoryPageSchema from '@/components/shared/SchemaScripts/CategoryPageSchema';


const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await apiCompanyUpdatedData(companyDomain)).data;

    const socialLinks = {
        facebook: response?.facebook,
        twitter: response?.twitter,
        instagram: response?.instagram,
        linkedin: response?.linkedin,
        pinterest: response?.pinterest,
        youtube: response?.youtube,
        flipboard: response?.flipboard,
        tiktok: response?.tiktok,
        threads: response?.threads,
    };

    return (
        <>
            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">

                <div className="breadcrumb-two">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern" className="bg-pattern"
                        width={1000} height={400}
                    />
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">

                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href="index.html" className="breadcrumb-list__link text-body hover-text-main">Home</a>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text">Category</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">Our Popular Categories</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <CategorySection company_id={response?.unique_id} />
            </div>
            <CategoryPageSchema company_name={response?.company_name} company_logo={response?.company_logo} socialLinks={socialLinks} company_id={response?.unique_id} />
        </>
    )
}

export default page
