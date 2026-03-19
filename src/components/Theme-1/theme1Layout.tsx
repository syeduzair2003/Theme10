import React from 'react'
import { apiCompanyUpdatedData, apiGetAllPromotion, apiGetEvents } from '@/apis/user';
import { apiGetNavMerchants } from '@/apis/merchant';
import NavbarOne from '@theme1/comp/NavbarOne'
import FooterOne from '@theme1/comp/FooterOne';
import { apiGetPromotionalMerchants, apiNavCategory } from '@/apis/page_optimization';
import { ToastContainer } from 'react-toastify';
import cookieService from '@/services/CookiesService';
// import NavBarSection from './comp/NavBarSection';

interface Props {
  children: React.ReactNode;
}

const theme1Layout = async ({ children }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
  const [
    categories,
    merchantData,
    headerPromoMerchantResponse,
    event,
    promotion
  ] = await Promise.all([
    apiNavCategory(c_data?.unique_id).then(res => res.data),
    apiGetNavMerchants(c_data?.unique_id).then(res => res.data),
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
  };
  const minimalMerchantData = merchantData.map(m => ({
    merchant_name: m.merchant_name,
    merchant_logo: m.merchant_logo,
    slug: m.slug,
    unique_id: m.unique_id,
    id: m.id,
  }));

  const headerPromoMerchantData = headerPromoMerchantResponse?.map(m => ({
    merchant_name: m.merchant_name,
    merchant_logo: m.merchant_logo,
    slug: m.slug,
    unique_id: m.unique_id,
    id: m.id,
  }));

  const categoriesMinimalData = categories?.map(m => ({
    name: m.name,
    category_image: m.category_image,
    slug: m.slug,
    unique_id: m.unique_id,
    id: m.id,
    url: m.url,
  }));

  return (
    <>
      <NavbarOne
        merchantData={minimalMerchantData}
        categories={categoriesMinimalData}
        promotionalMerchants={headerPromoMerchantData}
        domain={companyDomain.domain}
        company_id={c_data?.unique_id}
        company_logo={c_data?.company_logo}
        blog_title={c_data?.blog_title}
        blog_url={c_data?.blog_url}
        cat_slug={c_data?.category_slug}
        mer_slug_type={c_data?.slug_type}
        mer_slug={c_data?.store_slug}
        events={event}
        promo_slug={c_data?.promotion_slug}
        promotions={promotion}
      />

      {/* <NavBarSection
        unique_id={c_data.unique_id}
        merchantData={merchantResponse.data}
        headerPromoMerchant={headerPromoMerchantResponse}
        categories={categories}
        companyDomain={companyDomain.domain}
        mer_slug={c_data.store_slug}
        mer_slug_type={c_data.slug_type}
        cat_slug={c_data.category_slug}
        company_logo={c_data?.company_logo}
        blog_title={c_data.blog_title}
        blog_url={c_data.blog_url}
        events={event}
      /> */}

      <ToastContainer
        position="bottom-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {children}
      <FooterOne
        companyId={c_data?.unique_id}
        companyLogo={c_data?.company_logo}
        mer_slug={c_data?.store_slug}
        cat_slug={c_data?.category_slug}
        domain={companyDomain.domain}
        socialLinks={socialLinks}
        slug_type={c_data?.slug_type}
        companyName={c_data?.company_name}
      />
    </>
  )
}

export default theme1Layout
