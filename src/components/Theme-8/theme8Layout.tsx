import React from 'react';
import cookieService from '@/services/CookiesService';
// import { apiCompanyUpdatedData } from '@/apis/user';
import { ToastContainer } from 'react-toastify';
import LoaderScripts from './comp/LoaderScripts';
import Navbar from './comp/navbar';
import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetEvents } from '@/apis/user';
import { CompanyData } from '@/services/dataTypes';
import { apiGetPromotionalMerchants, apiNavCategory } from '@/apis/page_optimization';
import { apiGetNavMerchants } from '@/apis/merchant';
import Footer from './comp/Footer';
import Header from './comp/Header';
interface Props {
  children: React.ReactNode;
  c_data: CompanyData;
}

const Theme8Layout = async ({ children }: Props) => {
    const companyDomain = (await cookieService.get("domain"));
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data
  const [
    categories,
    merchantResponse,
    headerPromoMerchantResponse,
    events, 
    promotions
  ] = await Promise.all([
    apiNavCategory(c_data?.unique_id),
    apiGetNavMerchants(c_data?.unique_id),
    c_data.header_merchants_status == 1
      ? apiGetPromotionalMerchants(c_data?.unique_id).then(res => res.data)
      : Promise.resolve(null),
    apiGetEvents(c_data?.unique_id).then(res => res.data),
    apiGetAllPromotion(companyDomain.domain).then(res => res.data)
  ]);

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
    <>
    <div className='p1-2nd-bg-color'>
      {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> */}
      {/* <Navbar company_id={c_data?.unique_id} domain={companyDomain.domain} mer_slug={c_data.store_slug} slug_type={c_data.slug_type} cat_slug={c_data.category_slug} logo={c_data.company_logo} promotion_slug={c_data?.promotion_slug}/> */}
      {/* <Navbar
        unique_id={c_data.unique_id}
        merchantData={merchantResponse.data}
        headerPromoMerchant={headerPromoMerchantResponse}
        categories={categories?.data}
        companyDomain={companyDomain.domain}
        mer_slug={c_data.store_slug}
        mer_slug_type={c_data.slug_type}
        cat_slug={c_data.category_slug}
        promo_slug={c_data.promotion_slug}
        company_logo={c_data?.company_logo}
        blog_title={c_data.blog_title}
        blog_url={c_data.blog_url}
        events={events}
        promotions={promotions}
      /> */}
      <Header company_id={c_data?.unique_id} domain={companyDomain.domain} mer_slug={c_data.store_slug} slug_type={c_data.slug_type} cat_slug={c_data.category_slug} logo={c_data.company_logo} promotion_slug={c_data?.promotion_slug}/>
      {children} 
      {/* <Footer company_id={c_data?.unique_id} domain={companyDomain.domain} social_links={c_data} logo={c_data.company_footer_logo}/>  */}
         {/* <Footer/> */}
         <Footer
        companyFooterLogo={c_data?.company_footer_logo}
        companyName={c_data?.company_legal_name || c_data?.company_name}
        company_id={c_data?.unique_id}
        blog_title={c_data.blog_title}
        blog_url={c_data.blog_url}
        socialLinks={socialLinks}
      />
         <LoaderScripts/>
    </div>
    </>
  )
}

export default Theme8Layout
