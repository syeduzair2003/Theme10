import { apiCompanyUpdatedData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import React from 'react'
import CategorySection from '../../comp/CategorySection';

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
            <section className="breadcrumb-green">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className=" text-center">
                            <ul className=" flx-align gap-2 mb-2 justify-content-center">
                                {/* Home */}
                                <li className="font-14 text-body">
                                    <a href={"/"} className="text-body hover-text-main">Home</a>
                                </li>
                                {/* Divider */}
                                <li className="font-14 text-body">
                                    <span className="font-10">
                                        <FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} />
                                    </span>
                                </li>
                                {/* Static: All Products */}
                                <li className="font-14 text-body">
                                    <span className='text-white'>Category</span>
                                </li>

                            </ul>
                            <h1 className=" mb-0 text-capitalize">Our Popular Categories</h1>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <CategorySection company_id={response?.unique_id} />
            </div>
        </>

    )
}

export default page
