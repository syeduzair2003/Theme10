import { apiGetTopCategories, apiGetTrippleBannersCarousel } from '@/apis/page_optimization';
import cookieService from '@/services/CookiesService';
import CategorySidebar from './CategorySidebar';
import TripleBannerSlider from './TripleBannerSlider';
import CompanyBanner from '@/components/shared/CompanyMainBanner';

interface Props {
    companyId: string;
    sliderStatus: number;
    bannerStatus: number;
}
const TripleBannerSection = async ({ companyId, sliderStatus, bannerStatus }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const bannerResponse = (await apiGetTrippleBannersCarousel(companyDomain)).data;
    const topCategoriesResponse = (await apiGetTopCategories(companyId)).data;

    if (!bannerResponse?.length) return null;

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12 col-md-5 col-lg-3">
                    <CategorySidebar categories={topCategoriesResponse?.categories} limit={8} />
                </div>
                <div className="col-12 col-md-7 col-lg-9">
                    {sliderStatus === 1 && (
                        <CompanyBanner domain={companyDomain} companyId={companyId} />
                    )}
                    {bannerStatus === 1 && (
                        <TripleBannerSlider banners={bannerResponse} domain={companyDomain} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TripleBannerSection;
