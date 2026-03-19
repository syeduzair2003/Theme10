import React from 'react'
import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import NavBar from './comp/NavBar';
import Footer from './comp/Footer';
// import LoaderScripts from './comp/LoaderScripts';
// import Loader from './comp/Loader';

interface Props {
    children: React.ReactNode;
}

const theme2Layout = async ({ children }: Props) => {
    const companyDomain = (await cookieService.get("domain"));
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data
    const socialLinks = {
        facebook: c_data?.facebook,
        twitter: c_data?.twitter,
        instagram: c_data?.instagram,
        linkedin: c_data?.linkedin,
        pinterest: c_data?.pinterest,
        youtube: c_data?.youtube,
        flipboard: c_data?.flipboard,
        tiktok: c_data?.tiktok,
        threads: c_data?.threads,
        trust_pilot: c_data?.trust_pilot,
    };

    return (
        <div>
            <NavBar
                unique_id={c_data.unique_id}
                companyDomain={companyDomain.domain}
                mer_slug={c_data.store_slug}
                mer_slug_type={c_data.slug_type}
                cat_slug={c_data.category_slug}
                company_logo={c_data?.company_logo}
                blog_title={c_data.blog_title}
                blog_url={c_data.blog_url}
                headerPromoMerchant={c_data?.header_merchants_status}
            />
            <div className="theme-2">
                {children}
            </div>
            <Footer
                companyFooterLogo={c_data?.company_footer_logo}
                mer_slug={c_data?.store_slug}
                slug_type={c_data?.slug_type}
                cat_slug={c_data?.category_slug}
                company_id={c_data?.unique_id}
                company_name={c_data?.company_name}
                blog_title={c_data.blog_title}
                blog_url={c_data.blog_url}
                socialLinks={socialLinks}
            />
        </div>
    )
}

export default theme2Layout
