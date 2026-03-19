import React from 'react'
import PopularStores from '../comp/PopularStores'
import BannerSlider from '../comp/BannerSlider'
import TopCategoriesHome from '../comp/TopCategoriesHome'
import PopularCoupons from '../comp/PopularCoupons'
import PopularDeals from '../comp/PopularDeals'
import BlogSection from '../comp/BlogSection'
import CompanyBanner from '@/components/shared/CompanyMainBanner'
import Newsletter from '../comp/Newsletter'
import StepsToAvail from '../comp/StepsToAvail'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import TripleBanner from '@/components/shared/TripleBanner'
import HomepageFAQs from '../comp/HomepageFAQs'
import HomePageSchema from '@/components/shared/SchemaScripts/HomepageSchema'
import TrendingProducts from '../comp/TrendingProducts'
import HomeEventSection from '../comp/HomeEventSection'

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
    <div className='theme-1'>
      {c_data?.slider_status == 1 &&
        <CompanyBanner domain={companyDomain.domain} companyId={c_data?.unique_id} />
      }
      {c_data?.banner_status == 1 &&
        <TripleBanner />
      }
      {c_data?.top_merchants_status == 1 &&
        <PopularStores companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
      {c_data?.center_text_status == 1 &&
        <StepsToAvail companyId={c_data?.unique_id} />
      }
     
      {c_data?.popular_offers_status == 1 &&
        <PopularCoupons companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
       <HomeEventSection companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      {c_data?.popular_deals_status == 1 &&
        <PopularDeals companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
      {c_data?.popular_offers_status == 1 &&
        <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
      }
      {c_data?.top_categories_status == 1 &&
        <TopCategoriesHome companyId={c_data?.unique_id} slug_type={c_data?.slug_type} cat_slug={c_data?.category_slug} />
      }
      <Newsletter companyId={c_data?.unique_id} />
      {/* homepage faqs remaining */}
      <HomepageFAQs store_slug={c_data?.store_slug} slug_type={c_data?.slug_type} />
      <BannerSlider domain={companyDomain.domain} companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} slug_type={c_data?.slug_type} />
      {(c_data?.blog_title || c_data?.blog_url) &&
        <BlogSection companyId={c_data?.unique_id} blog_url={c_data?.blog_url} />
      }
      <HomePageSchema domain={companyDomain.domain} socialLinks={socialLinks} companyLogo={c_data?.company_logo} companyName={c_data?.company_name} />
    </div>
  )
}

export default Home
