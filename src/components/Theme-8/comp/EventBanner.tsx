"use client"
import React, { useEffect, useState } from 'react'
import EventSlider from './EventSlider';
import { EventBannerResponse, PromotionBannerResponse, SubPromotionBanner } from '@/services/dataTypes';

interface Props {
    domain: string;
    banners: EventBannerResponse[] | PromotionBannerResponse[] | SubPromotionBanner[];
    eventName: string;
}

const EventBanner = ({ domain, banners, eventName }: Props) => {
    const [hydrated, setHydrated] = useState(false)
    useEffect(() => setHydrated(true), [])

    return (
        <div className="relative overflow-hidden bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-opacity duration-500" style={{ opacity: hydrated ? 1 : 0 }}>
            <div className="w-full relative">
                <EventSlider sliders={banners} domain={domain} eventName={eventName}/>
            </div>
        </div>
    )
}

export default EventBanner;