import React from 'react'
import Blog from '../comp/Blog';
import HomeCategories from '../comp/HomeCategories';
import Newsletter from '../comp/Newsletter';
import TrendingProducts from '../comp/TrendingProducts';
import PopularStores from '../comp/PopularStores';
import PopularCoupons from '../comp/PopularCoupons';
import HomeEventsSection from '../comp/HomeEventsSection';
import HorizontalBannerSlider from '../comp/HorizontalBannerSlider';
import TripleBanner from '../comp/TripleBanner';
import FAQs from '../comp/FAQs';
import cookieService from '@/services/CookiesService';
import { apiCompanyUpdatedData } from '@/apis/user';
import RecentlyUpdatedStores from '../comp/RecentlyUpdatedStores';
import ProductSection from '../comp/ProductSection';
import Footer from '../comp/Footer';
import BestOffersWrapper from '../comp/BestOffersWrapper';
import DiscountedStoresSection from '../comp/DiscountedStores';

const Home = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const c_data = (await apiCompanyUpdatedData(companyDomain)).data

    return (
        <div className='theme-5'>

            {c_data?.banner_status == 1 && <TripleBanner />}

            <div className="bg-indigo-90">
                <PopularStores companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            </div>

            <div className="bg-white">
                <BestOffersWrapper companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            </div>

            <div className="bg-indigo-90">
                <HomeEventsSection companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
            </div>

            <div className="bg-white">
                <ProductSection companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            </div>

            <div className="bg-indigo-90">
                <DiscountedStoresSection companyId={c_data?.unique_id} mer_slug={c_data?.store_slug} mer_slug_type={c_data?.slug_type} />
            </div>

            <div className="bg-white">
                <PopularCoupons companyId={c_data?.unique_id} />
            </div>

            <div className="bg-indigo-90">
                <TrendingProducts companyId={c_data?.unique_id} mer_slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} />
            </div>

            <div className="bg-white">
                <HomeCategories companyId={c_data?.unique_id} slug_type={c_data?.slug_type} cat_slug={c_data?.category_slug} />
            </div>

            <div className="bg-indigo-90">
                <FAQs companyId={c_data?.unique_id} />
            </div>

            <div className="bg-white">
                <RecentlyUpdatedStores companyId={c_data?.unique_id} merSlug={c_data?.store_slug} slugType={c_data?.slug_type} />
            </div>

            <div className="bg-indigo-90">
                <Newsletter companyId={c_data?.unique_id} />
            </div>

            <div className="bg-white">
                <HorizontalBannerSlider companyId={c_data?.unique_id} slug_type={c_data?.slug_type} mer_slug={c_data?.store_slug} domain={companyDomain.domain} />
            </div>

            <div className="bg-indigo-90">
                <Blog companyId={c_data?.unique_id} blog_url={c_data?.blog_url} />
            </div>
            <Footer />
        </div>
    )
}

export default Home

