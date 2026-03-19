'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useRef, useState } from 'react'
import { getBaseImageUrl } from '@/constants/hooks'
import { EventBannerResponse, PromotionBannerResponse, SubPromotionBanner } from '@/services/dataTypes'
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from '@/constants/icons'
import Image from 'next/image'

interface Props {
    sliders: EventBannerResponse[] | PromotionBannerResponse[] | SubPromotionBanner[];
    domain: string;
    eventName: string;
}

const EventSlider = ({ sliders, domain, eventName }: Props) => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
        },
    })

    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!slider.current || sliders.length <= 1) return

        const startAutoSlide = () => {
            timeoutRef.current = setInterval(() => {
                slider.current?.next()
            }, 4000)
        }

        const stopAutoSlide = () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current)
        }

        startAutoSlide()
        return () => stopAutoSlide()
    }, [slider, sliders.length])

    const BannerImage = ({ src, alt, loading, priority = false }: { src: string; alt: string; loading?: 'eager' | 'lazy'; priority?: boolean }) => {
        const [loaded, setLoaded] = useState(false)

        return (
            <div className="relative w-full">
                {!loaded && <div className="absolute inset-0 w-full h-64 bg-slate-200 animate-pulse rounded-xl" />}
                <Image
                    src={getBaseImageUrl(domain, src, "")}
                    height={500}
                    width={1400}
                    alt={alt}
                    onLoad={() => setLoaded(true)}
                    className={`w-full h-auto rounded-xl transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    priority={priority}
                    fetchPriority={priority ? "high" : "auto"}
                    loading={loading}
                />
            </div>
        )
    }

    if (sliders?.length <= 1) {
        const slide = sliders[0]
        return (
            <div className="relative">
                {slide && (
                    <BannerImage
                        src={slide?.banner}
                        alt={eventName + "Banner"}
                        priority
                        loading="eager"
                    />
                )}
            </div>
        )
    }
    return (
        <div
            className="relative"
            onMouseEnter={() => timeoutRef.current && clearInterval(timeoutRef.current)}
            onMouseLeave={() => {
                timeoutRef.current = setInterval(() => {
                    slider.current?.next()
                }, 4000)
            }}
        >
            <div ref={sliderRef} className="keen-slider">
                {sliders.map((slide: EventBannerResponse | PromotionBannerResponse, i: number) => (
                    <div className="keen-slider__slide" key={i}>
                        <BannerImage
                            src={slide?.banner}
                            alt={eventName + " Banner " + (i + 1)}
                            priority={i === 0}
                            loading={i === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                onClick={() => slider.current?.prev()}
            >
                <FontAwesomeIcon icon={faAngleLeft} className="w-4 h-4 text-slate-700" />
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                onClick={() => slider.current?.next()}
            >
                <FontAwesomeIcon icon={faAngleRight} className="w-4 h-4 text-slate-700" />
            </button>
        </div>
    )
}

export default EventSlider 