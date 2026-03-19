import { apiCompanyUpdatedData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import PopularStores from '../comp/PopularStores';
import DealsSectionHome from '../comp/DealsSectionHome';
import TrendingProducts from '../comp/TrendingProducts';
import CouponSectionHome from '../comp/CouponSectionHome';
import HomeCategorySection from '../comp/HomeCategorySection';
import HomeFaqsSection from '../comp/HomeFaqsSection';
import HorizontalBannerSlider from '../comp/HorizontalBannerSlider';
import HomePageSchema from '@/components/shared/SchemaScripts/HomepageSchema';
import HomeBlogSection from '../comp/HomeBlogSection';
// import TripleBanner from '@/components/shared/TripleBanner';
import CompanyBanner from '@/components/shared/CompanyMainBanner';
import TripleBannerSection from '../comp/TripleBannerSection';
import NewsletterSection from '../comp/NewsletterSubmitBtn';
import HomeEventSection from '../comp/HomeEventSection';

const Home = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data
    return (
        <>
            {/* {c_data?.slider_status == 1 &&
                <CompanyBanner domain={companyDomain.domain} companyId={c_data?.unique_id} />
            } */}
            {(c_data?.banner_status == 1 || c_data?.slider_status == 1) &&
                <TripleBannerSection companyId={c_data?.unique_id} sliderStatus={c_data?.slider_status} bannerStatus={c_data?.banner_status}/>
            }
            
            {c_data?.top_merchants_status == 1 &&
                <PopularStores companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            {/* event section */}
            <HomeEventSection companyId={c_data?.unique_id} merSlug={c_data?.store_slug} slugType={c_data?.slug_type} />
            {c_data?.popular_deals_status == 1 &&
                <DealsSectionHome companyId={c_data?.unique_id} slugType={c_data?.slug_type} merSlug={c_data?.store_slug} />
            }
            {c_data?.popular_offers_status == 1 &&
                <CouponSectionHome companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            }
            <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            {/* {c_data.top_categories_status &&
                <HomeCategorySection companyId={c_data?.unique_id} />
            } */}
            <HomeFaqsSection slug_type={c_data?.slug_type} store_slug={c_data?.store_slug} />

            <HorizontalBannerSlider companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} domain={companyDomain.domain} />

            {(c_data?.blog_title || c_data?.blog_url) &&
                <HomeBlogSection companyId={c_data?.unique_id} blog_url={c_data?.blog_url} />
            }
            <NewsletterSection companyId={c_data?.unique_id} />
            <HomePageSchema domain={companyDomain.domain} companyLogo={c_data?.company_logo} companyName={c_data?.company_name} />
        </>
    )
}

export default Home
