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
        <div className="relative overflow-hidden mx-2 md:mx-4 xl:mx-6 mt-2 md:mt-4 xl:mt-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="relative max-w-full" style={{ position: 'relative', maxWidth: "100%" }}>
                <div
                    className="transition-opacity duration-300"
                    style={{ opacity: hydrated ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                    <EventSlider sliders={banners} domain={domain} eventName={eventName} />
                </div>
            </div>
        </div>
    )
}

export default EventBanner