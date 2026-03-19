import React, { Suspense } from 'react'
import MerchantsCarousel from '../comp/MerchantsCarousel';
import Blog from '../comp/Blog';
import HorizontalBannerSlider from '../comp/HorizontalBannerSlider';
import HomeCategories from '../comp/HomeCategories';
import BestOffersSSR from '../comp/BestOffersSSR';
import PopularCoupons from '../comp/PopularCoupons';
import Newsletter from '../comp/Newsletter';
import TripleBanner from '@/components/shared/TripleBanner';
import CompanyBanner from '@/components/shared/CompanyMainBanner';
import StepsToAvail from '@/components/shared/StepsToAvail';
import cookieService from '@/services/CookiesService';
import Loader from '../comp/Loader';
import { apiCompanyUpdatedData } from '@/apis/user';
import HomepageFAQs from '../comp/HomepageFAQs';
import HomePageSchema from '@/components/shared/SchemaScripts/HomepageSchema';
import TrendingProducts from '../comp/TrendingProducts';
import HomeEventSection from '../comp/HomeEventSection';
import RoundedMerchantHome from '../comp/RoundedMerchantHome';

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
    return (
        // <Suspense fallback={<Loader />} >
        <div className='theme-3'>
            {c_data?.slider_status == 1 &&
                <CompanyBanner domain={companyDomain.domain} companyId={c_data?.unique_id} />
            }
            {c_data?.banner_status == 1 &&
                <TripleBanner />
            }
            {c_data?.center_text_status == 1 &&
                <StepsToAvail color='#ff943d26' companyId={c_data?.unique_id} theme={c_data?.template?.name} />
            }
            {c_data?.top_merchants_status == 1 &&
                <MerchantsCarousel companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            <HomeEventSection  companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            {c_data?.popular_deals_status == 1 &&
                <BestOffersSSR companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            <RoundedMerchantHome companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
            {c_data?.popular_offers_status == 1 &&
                <PopularCoupons companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            <Newsletter companyId={c_data?.unique_id} />
            
            {c_data.top_categories_status &&
                <HomeCategories companyId={c_data?.unique_id} slug_type={c_data?.slug_type} cat_slug={c_data?.category_slug} />
            }
            <HomepageFAQs slug_type={c_data?.slug_type} store_slug={c_data?.store_slug}/>
            <HorizontalBannerSlider companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} domain={companyDomain.domain} />
            {(c_data?.blog_title || c_data?.blog_url) &&
                <Blog
                    companyId={c_data?.unique_id}
                    blog_url={c_data?.blog_url}
                />
            }
            <HomePageSchema domain={companyDomain.domain} socialLinks={socialLinks} companyLogo={c_data?.company_logo} companyName={c_data?.company_name} />
        </div>
        // </Suspense>
    )
}

export default Home
