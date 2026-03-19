import React from 'react'
import NavbarSec from './comp/NavbarSec'
import LoaderScripts from './comp/LoaderScripts'
import { ToastContainer } from 'react-toastify'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetEvents } from '@/apis/user'
import { apiGetPromotionalMerchants, apiNavCategory } from '@/apis/page_optimization'
import { apiGetNavMerchants } from '@/apis/merchant'

interface Props {
  children: React.ReactNode
}

const theme5Layout = async ({ children }: Props) => {

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
    <div className='bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen'>
      {/* <Loader /> */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      <NavbarSec
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
      />
      {children}
      <LoaderScripts />
    </div>
  )
}

export default theme5Layout