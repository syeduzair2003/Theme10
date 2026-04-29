import { apiCompanyUpdatedData } from '@/apis/user';
import { keywordsAction } from '@/app/actions/index';
import CompanyBanner from '@/components/shared/CompanyMainBanner';
import cookieService from '@/services/CookiesService';
import React from 'react'
import HeroSection from '../comp/HeroSection';
import MerchantsCarousel from '../comp/MerchantsCarousel';
import RecentEvents from '../comp/RecentEvents';
import BestOffers from '../comp/BestOffers';
import Newsletter from '../comp/Newsletter';
import HomeCategories from '../comp/HomeCategories';
import PopularCoupons from '../comp/PopularCoupons';
import TrendingProducts from '../comp/TrendingProducts';
import RoundedMerchantHome from '../comp/RoundedMerchantHome';
import HomepageFAQs from '../comp/HomePageFaqs';
import Blog from '../comp/Blog';




const Home = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data

    const keywordsRes = await keywordsAction(c_data?.unique_id);
    const keywords: string[] = keywordsRes?.data ?? [];

    return (
        // <Suspense fallback={<Loader />} >
        <div className='theme-11'>
            {/* {c_data?.slider_status == 1 &&
                <CompanyBanner domain={companyDomain.domain} companyId={c_data?.unique_id} />
            } */}
            <HeroSection
                keywords={keywords}
                mer_slug={c_data?.store_slug}
                cat_slug={c_data?.category_slug}
            />

            {c_data?.top_merchants_status == 1 &&
                <MerchantsCarousel
                    companyId={c_data?.unique_id}
                    mer_slug_type={c_data?.slug_type}
                    mer_slug={c_data?.store_slug}
                />
            }

            <RecentEvents
                companyId={c_data?.unique_id}
                mer_slug_type={c_data?.slug_type}
                mer_slug={c_data?.store_slug}
            />

            <RoundedMerchantHome companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />

            {c_data?.popular_deals_status == 1 &&
                <BestOffers
                    companyId={c_data?.unique_id}
                    mer_slug_type={c_data?.slug_type}
                    mer_slug={c_data?.store_slug}
                />
            }
            {c_data?.popular_offers_status == 1 &&
                <PopularCoupons companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />


            {c_data?.top_categories_status == 1 &&
                <HomeCategories
                    companyId={c_data?.unique_id}
                    slug_type={c_data?.slug_type}
                    cat_slug={c_data?.category_slug}
                />
            }
            <HomepageFAQs slug_type={c_data?.slug_type} store_slug={c_data?.store_slug} />

            <Newsletter companyId={c_data?.unique_id} />

            {(c_data?.blog_title || c_data?.blog_url) &&
                <Blog
                    companyId={c_data?.unique_id}
                    blog_url={c_data?.blog_url}
                />
            }

            {/*
            
            <HorizontalBannerSlider companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} domain={companyDomain.domain} />
           
            <HomePageSchema domain={companyDomain.domain} socialLinks={socialLinks} companyLogo={c_data?.company_logo} companyName={c_data?.company_name} /> */}
        </div>
        // </Suspense>
    )
}

export default Home
