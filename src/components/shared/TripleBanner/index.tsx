import './triplebanner.css';
import { apiGetTrippleBannersCarousel } from '@/apis/page_optimization';
import cookieService from "@/services/CookiesService";
import TrippleBannerWrapper from './TrippleSliderWrapper';

const TripleBanner = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const bannerResponse = (await apiGetTrippleBannersCarousel(companyDomain)).data;
    if (bannerResponse?.length > 0) {
        return (
            <div className='deal-coupon-slider-wrapper-custom'>
                <section className="banner-section index-three overflow-hidden">
                    <div className="container">
                        <div className="row g-3 d-flex align-items-center justify-content-center">
                            <TrippleBannerWrapper domain={companyDomain} companySliders={bannerResponse} />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default TripleBanner;