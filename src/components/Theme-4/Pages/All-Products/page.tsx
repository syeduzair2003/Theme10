import React from 'react'
import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import AllProductsPage from '../../comp/AllProductsPage';

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const c_data = (await apiCompanyUpdatedData(companyDomain))?.data;

    return (
        <div className='mt-2 md:mt-6'>
            <AllProductsPage company_id={c_data?.unique_id} page={"1"} storeSlug={c_data?.store_slug} slugType={c_data?.slug_type} domain={companyDomain?.domain} />
        </div>
    )
}

export default page
