import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'
import CategoryPage from '../../comp/CategoryPage';
import CategoryPageSchema from '@/components/shared/SchemaScripts/CategoryPageSchema';
import BreadcrumbSection from '../../comp/BreadcrumbSection';

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await apiCompanyUpdatedData(companyDomain)).data;
    const breadcrumbs = [
        { label: "Home", href: "/" },
        { label: "Category" },
    ];
    return (
        <>
            <BreadcrumbSection
                title="Our Popular Categories"
                breadcrumbs={breadcrumbs}
                imageSrc="/themes/Theme_3/img/website.png"
            />
            <div className="contact-section bg padTB60">
                <div className="container">
                    <CategoryPage companyId={response?.unique_id} />
                </div>
            </div>
            <CategoryPageSchema company_name={response?.company_name} company_logo={response?.company_logo} company_id={response?.unique_id} />
        </>
    )
}

export default page
