"use client"
import React, { useEffect, useState } from 'react'
import EventSlider from './EventSlider';
import { EventBannerResponse, PromotionBannerResponse } from '@/services/dataTypes';
import '../../shared/CompanyMainBanner/companybanner.css';

interface Props {
    domain: string;
    banners: EventBannerResponse[] | PromotionBannerResponse[];
    eventName: string;
}

const EventBanner = ({ domain, banners, eventName }: Props) => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => setHydrated(true), [])

    return (
        <div className="banner-sections index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 mt-2 mt-md-4 mt-xl-6 rounded-3 cus-border border">
            <div className="slider-hydration-wrapper" style={{ position: 'relative', maxWidth: "100%" }}>
                <div
                    className="hydrated-slider"
                    style={{ opacity: hydrated ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                    <EventSlider sliders={banners} domain={domain} eventName={eventName}/>
                </div>
            </div>
        </div>
    )
}

export default EventBanner
