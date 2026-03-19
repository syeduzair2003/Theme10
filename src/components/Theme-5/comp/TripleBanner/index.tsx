import { apiGetTrippleBannersCarousel } from '@/apis/page_optimization';
import cookieService from "@/services/CookiesService";
import TrippleBannerWrapper from './TrippleSliderWrapper';

const TripleBanner = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const bannerResponse = (await apiGetTrippleBannersCarousel(companyDomain)).data;
    if (bannerResponse?.length > 0) {
        return (
            <div className='relative overflow-hidden'>
                <section className="overflow-hidden py-4 md:py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center">
                            <TrippleBannerWrapper domain={companyDomain} companySliders={bannerResponse} />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default TripleBanner;
