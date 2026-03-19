import React, { Suspense } from 'react'
import TripleBanner from '@/components/shared/TripleBanner';
import CompanyBanner from '@/components/shared/CompanyMainBanner';
import StepsToAvail from '@/components/shared/StepsToAvail';
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData } from '@/apis/user';
import HomePageSchema from '@/components/shared/SchemaScripts/HomepageSchema';
// import MerchantsCarousel from '../comp/MerchantsCarousel';
import BannerSection from '../comp/BannerSection'
import FeatureDeals from '../comp/FeatureDeals';
import ExploreCategory from '../comp/ExploreCategory';
import PremimumBrand from '../comp/PremiumBrands';
import Subscribe from '../comp/Subscribe';
import HomepageFAQs from '../comp/HomepageFAQs';
import Footer from '../comp/Footer';
import { apiGetTopMerchants } from "@/apis/page_optimization";
import HomeBlogSection from '../comp/HomeBlogSection';
import HomeEventSection from '../comp/HomeEventSection';
import PopularCoupons from '../comp/PopularCoupons';
import TrendingProducts from '../comp/TrendingProducts';
const Home = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data
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
    const merchantsData = await apiGetTopMerchants(c_data?.unique_id);
    const merchants = merchantsData?.data?.merchants || [];
    return (
        // <Suspense fallback={<Loader />} >
        <div className='theme-8'>
            <BannerSection merchants={merchants} />
            <FeatureDeals companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            <HomeEventSection  companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            {c_data?.popular_offers_status == 1 &&
                <PopularCoupons companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            
            <ExploreCategory companyId={c_data?.unique_id} slug_type={c_data?.slug_type} cat_slug={c_data?.category_slug} />
            <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            <PremimumBrand companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            
            <Subscribe/>
            <HomepageFAQs slug_type={c_data?.slug_type} store_slug={c_data?.store_slug}/>
            {(c_data?.blog_title || c_data?.blog_url) &&
                <HomeBlogSection companyId={c_data?.unique_id} blog_url={c_data?.blog_url} />
            }
            {/* <Footer/> */}
        </div>
        // </Suspense>
    )
}

export default Home
