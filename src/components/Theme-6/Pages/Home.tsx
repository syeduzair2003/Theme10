import React from 'react'
import BannerSection from '../comp/BannerSection';
import PopularStores from '../comp/PopularStores';
import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import HomeEventSection from '../comp/HomeEventSection';
import PopularCoupon from '../comp/PopularCoupon';
import PopularDeals from '../comp/PopularDeals';
import HomeBannerSlider from '../comp/HomeBannerSlider';
import TrendingProducts from '../comp/TrendingProducts';
import HomepageFAQ from '../comp/HomePageFAQ';
import HomeCategories from '../comp/HomeCategories';
import HomeBlogSection from '../comp/HomeBlogSection';

const Home = async () => {
  const companyDomain = (await cookieService.get("domain"));
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
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
  return (
    <div>
      
      <BannerSection />
      {c_data?.top_merchants_status == 1 &&
        <PopularStores companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
      <HomeEventSection companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      
       <HomeBannerSlider domain={companyDomain.domain} companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} />
      {c_data?.popular_offers_status == 1 &&
        <PopularCoupon companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
      <PopularDeals companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      
      
      <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      <HomepageFAQ store_slug={c_data?.store_slug} slug_type={c_data?.slug_type} />
     
      <HomeCategories companyId={c_data?.unique_id} slug_type={c_data?.slug_type} cat_slug={c_data?.category_slug} />
      <HomeBlogSection companyId={c_data?.unique_id} blog_url={c_data?.blog_url} /> 
    </div>
  )
}

export default Home
