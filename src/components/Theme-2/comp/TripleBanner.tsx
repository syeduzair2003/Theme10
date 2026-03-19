import { apiGetTrippleBannersCarousel } from '@/apis/page_optimization';
import TrippleBannerWrapper from '@/components/shared/TripleBanner/TrippleSliderWrapper';
import cookieService from '@/services/CookiesService';
import React from 'react'

const TripleBanner = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const bannerResponse = (await apiGetTrippleBannersCarousel(companyDomain)).data;
    if (bannerResponse?.length > 0) {
        return (
            <div className="popular-stores py-3">
                {/* <div className='triple-bann-container'> */}
                    <section className="banner-section index-three overflow-hidden">
                        <div className="container">
                            <div className="row g-3 d-flex align-items-center justify-content-center">
                                <TrippleBannerWrapper domain={companyDomain} companySliders={bannerResponse} />
                            </div>
                        </div>
                    </section>
                {/* </div> */}
            </div>
        )
    }
}

export default TripleBanner
