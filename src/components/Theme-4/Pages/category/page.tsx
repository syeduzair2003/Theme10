import React from 'react'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import CategoriesPage from '../../comp/CategoriesPage'

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await apiCompanyUpdatedData(companyDomain))?.data;

    return (
        <>
            <CategoriesPage company_id={response?.unique_id} />
        </>
    )
}

export default page
