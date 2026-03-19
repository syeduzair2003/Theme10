import React from 'react'
import AllProductPage from '../../comp/AllProductPage'
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData } from '@/apis/user';
import AllProductsSchema from '@/components/shared/SchemaScripts/AllProductSchema';

const page = async () => {
  const companyDomain = await cookieService.get("domain");
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
  return (
    <>
      <AllProductPage page='1' companyId={c_data?.unique_id} storeSlug={c_data?.store_slug} slugType={c_data?.slug_type} />
      <AllProductsSchema company_id={c_data?.unique_id} />
    </>
  )
}

export default page
