import React from 'react'
import AllProductsLayout from '../../comp/AllProductsLayout'
import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import AllProductsSchema from '@/components/shared/SchemaScripts/AllProductSchema';
import Footer from '../../comp/Footer';

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data;

    return (
        <>
            <AllProductsLayout page='1' companyId={c_data?.unique_id} storeSlug={c_data?.store_slug} slugType={c_data?.slug_type} />
            <Footer />
            <AllProductsSchema company_id={c_data?.unique_id} />
        </>
    )
}

export default page