import React from 'react'
import Footer from './comp/Footer';
import LoaderScripts from './comp/LoaderScripts';
import Header from './comp/Header';
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData } from '@/apis/user';
import { ToastContainer } from 'react-toastify';


interface Props {
  children: React.ReactNode;
}

const theme4Layout = async ({ children }: Props) => {
  const companyDomain = (await cookieService.get("domain"));
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data

  return (
    <div className='p1-2nd-bg-color'>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Header company_id={c_data?.unique_id} domain={companyDomain.domain} mer_slug={c_data.store_slug} slug_type={c_data.slug_type} cat_slug={c_data.category_slug} logo={c_data.company_logo} promotion_slug={c_data?.promotion_slug}/>
      {children}
      <Footer company_id={c_data?.unique_id} domain={companyDomain.domain} social_links={c_data} logo={c_data.company_footer_logo}/>
        <LoaderScripts/>
    </div>
  )
}

export default theme4Layout
